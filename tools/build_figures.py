#!/usr/bin/env python3
"""Render reviewed source crops; validate local figure evidence without image dependencies."""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import tarfile
from pathlib import Path


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def figure_references(text: str) -> set[str]:
    """Explicit Chinese figure numbers, including decimal book numbers and ranges."""
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    found = set()
    for group in re.findall(r"图\s*(\d+(?:\.\d+)?(?:\s*[–—、,，\-]\s*\d+(?:\.\d+)?)*)", text):
        for part in re.split("[、,，]", group):
            bounds = re.split("[–—-]", part.strip())
            if len(bounds) == 2:
                start, end = (value.strip().split(".") for value in bounds)
                if start[:-1] == end[:-1] and 0 <= int(end[-1]) - int(start[-1]) < 100:
                    prefix = ".".join(start[:-1])
                    found.update((prefix + "." if prefix else "") + str(i)
                                 for i in range(int(start[-1]), int(end[-1]) + 1))
                    continue
            found.update(value.strip() for value in bounds)
    return found


def check(root: Path, entries: list[dict]) -> list[str]:
    errors = []
    hashes = {}
    covered = {}
    for entry in entries:
        for key, expected in (("source_file", "source_sha256"), ("image", "image_sha256")):
            path = (root / entry[key]).resolve()
            if not path.is_relative_to(root.resolve()) or not path.is_file():
                errors.append(f"missing or outside repository: {entry[key]}")
                continue
            if path not in hashes:
                hashes[path] = digest(path)
            if entry.get(expected) != hashes[path]:
                errors.append(f"hash mismatch: {entry[key]}")
        note = root / entry["note"]
        if not note.is_file():
            errors.append(f"missing source note: {entry['note']}")
            continue
        covered.setdefault(entry["note"], set()).update(entry["figures"])
        relative = Path(os.path.relpath(root / entry["image"], note.parent)).as_posix()
        if f"]({relative})" not in note.read_text(encoding="utf-8"):
            errors.append(f"figure not embedded in source note: {entry['image']}")
    for note in (root / "wiki/sources").glob("*.md"):
        missing = figure_references(note.read_text(encoding="utf-8")) - covered.get(note.relative_to(root).as_posix(), set())
        if missing:
            errors.append(f"figure references without registered images: {note}: {', '.join(sorted(missing))}")
    return errors


def render(root: Path, entry: dict) -> None:
    # Rendering uses the repository's uv environment. CI checks need only stdlib.
    import fitz
    from PIL import Image, ImageSequence

    source = root / entry["source_file"]
    if digest(source) != entry["source_sha256"]:
        raise ValueError(f"source evidence changed: {source}")
    output = root / entry["image"]
    output.parent.mkdir(parents=True, exist_ok=True)
    data = source.read_bytes()
    if "source_member" in entry:
        with tarfile.open(source) as archive:
            member = archive.extractfile(entry["source_member"])
            if member is None:
                raise ValueError(f"missing archive member: {entry['source_member']}")
            data = member.read()
    suffix = Path(entry.get("source_member", str(source))).suffix.lower()
    if "page" in entry:
        with fitz.open(stream=data, filetype="pdf") as document:
            page = document[entry["page"] - 1]
            x0, y0, x1, y1 = entry["crop"]
            clip = fitz.Rect(x0 * page.rect.width, y0 * page.rect.height,
                             x1 * page.rect.width, y1 * page.rect.height)
            scale = min(3, 2200 / clip.width, 2800 / clip.height)
            pixels = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip, alpha=False)
            image = Image.frombytes("RGB", (pixels.width, pixels.height), pixels.samples)
            entry["scale"] = scale
    else:
        if suffix == ".svg":
            # Preserve vector geometry; a white canvas keeps black labels legible in dark themes.
            svg = data.decode("utf-8")
            svg = re.sub(r"(<svg\b[^>]*>)", r'\1<rect width="100%" height="100%" fill="white"/>', svg, count=1)
            output.write_text(svg, encoding="utf-8")
            entry["bytes"] = output.stat().st_size
            entry["image_sha256"] = digest(output)
            return
        image = Image.open(io.BytesIO(data))
        if getattr(image, "is_animated", False):
            frames, durations = [], []
            for frame in ImageSequence.Iterator(image):
                converted = frame.convert("RGBA")
                converted.thumbnail((640, 640))
                frames.append(converted)
                durations.append(frame.info.get("duration", 100))
            frames[0].save(output, "WEBP", save_all=True, append_images=frames[1:],
                           duration=durations, loop=image.info.get("loop", 0),
                           quality=80, method=4)
            entry.update(width=frames[0].width, height=frames[0].height,
                         frames=len(frames), animation_quality=80, bytes=output.stat().st_size,
                         image_sha256=digest(output))
            return
        image.thumbnail((2200, 2800))
        if "A" in image.getbands() or "transparency" in image.info:
            rgba = image.convert("RGBA")
            canvas = Image.new("RGBA", rgba.size, "white")
            canvas.alpha_composite(rgba)
            image = canvas.convert("RGB")
        else:
            image = image.convert("RGB")
    image.save(output, "WEBP", quality=entry.get("quality", 92), method=6)
    png = io.BytesIO()
    image.save(png, "PNG", optimize=True)
    entry.update(width=image.width, height=image.height, bytes=output.stat().st_size,
                 png_bytes=len(png.getvalue()), image_sha256=digest(output))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--render", action="store_true", help="Rebuild derivatives, never original evidence.")
    parser.add_argument("--only", help="Render images whose path contains this substring.")
    args = parser.parse_args()
    manifest = args.root / "graph/figures.json"
    data = json.loads(manifest.read_text(encoding="utf-8"))
    if args.render:
        for entry in data["figures"]:
            if args.only is None or args.only in entry["image"]:
                render(args.root, entry)
        manifest.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    errors = check(args.root, data["figures"])
    for error in errors:
        print(error)
    print(f"Figures: {len(data['figures'])}; errors: {len(errors)}")
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
