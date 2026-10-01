#!/usr/bin/env python3
"""Archive canonical bytes without overwriting evidence; no research or synthesis."""
from __future__ import annotations

import argparse
import hashlib
import json
import mimetypes
import os
import re
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen


def canonical_url(url: str) -> str:
    parts = urlsplit(url)
    if parts.scheme not in {"http", "https"} or not parts.hostname or parts.username:
        raise ValueError("source URL must be an HTTP(S) URL without credentials")
    hostname = parts.hostname.lower()
    if ":" in hostname:
        hostname = f"[{hostname}]"
    port = parts.port
    authority = hostname if port in {None, 80 if parts.scheme == "http" else 443} else f"{hostname}:{port}"
    return urlunsplit((parts.scheme.lower(), authority, parts.path or "/", parts.query, ""))


def fetch(url: str, max_bytes: int, timeout: float) -> tuple[bytes, str, str]:
    request = Request(url, headers={"User-Agent": "LLM-Wiki-Source-Archive/1.0"})
    with urlopen(request, timeout=timeout) as response:
        content = bytearray()
        while chunk := response.read(min(1024 * 1024, max_bytes + 1 - len(content))):
            content.extend(chunk)
            if len(content) > max_bytes:
                raise ValueError(f"source exceeds {max_bytes} bytes")
        expected_length = response.headers.get("Content-Length")
        if expected_length is not None and len(content) != int(expected_length):
            raise ValueError("incomplete response: Content-Length does not match")
        return bytes(content), response.geturl(), response.headers.get("Content-Type", "")


def archive(
    root: Path,
    content: bytes,
    *,
    url: str,
    slug: str,
    snapshot_date: str,
    extension: str,
    version: str | None = None,
    canonical: str | None = None,
    resolved_url: str | None = None,
    content_type: str = "",
    previous: Path | None = None,
) -> dict[str, object]:
    if not content:
        raise ValueError("cannot archive an empty source")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise ValueError("slug must be kebab-case")
    date.fromisoformat(snapshot_date)
    extension = extension.removeprefix(".")
    if not re.fullmatch(r"[a-zA-Z0-9]{1,10}", extension):
        raise ValueError("extension must contain only letters or digits")
    root = root.resolve()
    raw_dir = (root / "raw").resolve()
    if not raw_dir.is_relative_to(root) or not (root / "graph").resolve().is_relative_to(root):
        raise ValueError("archive directories must be inside the repository")
    requested_url = canonical_url(url)
    final_url = canonical_url(resolved_url or url)
    source_url = canonical_url(canonical or url)
    sha256 = hashlib.sha256(content).hexdigest()
    ledger = root / "graph/acquisitions.jsonl"
    records = [json.loads(line) for line in ledger.read_text(encoding="utf-8").splitlines() if line] if ledger.exists() else []
    candidates = [root / str(record["source_file"]) for record in records if record.get("canonical_url") == source_url and record.get("sha256") == sha256]
    if previous is not None:
        previous = previous if previous.is_absolute() else root / previous
        if not previous.resolve().is_relative_to(raw_dir):
            raise ValueError("snapshot must be inside raw/")
        if not previous.is_file():
            raise ValueError(f"previous snapshot not found: {previous}")
        if hashlib.sha256(previous.read_bytes()).hexdigest() == sha256:
            candidates.insert(0, previous)

    status = "created"
    snapshot = raw_dir / f"{slug}-{snapshot_date}-{sha256[:12]}.{extension.lower()}"
    for candidate in candidates:
        if not candidate.resolve().is_relative_to(raw_dir):
            raise ValueError("snapshot must be inside raw/")
        if not candidate.is_file() or hashlib.sha256(candidate.read_bytes()).hexdigest() != sha256:
            raise ValueError(f"archived evidence is missing or modified: {candidate}")
        snapshot = candidate
        status = "reused"
        break

    if not snapshot.resolve().is_relative_to(raw_dir):
        raise ValueError("snapshot must be inside raw/")
    snapshot.parent.mkdir(parents=True, exist_ok=True)
    if status == "created":
        try:
            with snapshot.open("xb") as output:
                output.write(content)
        except FileExistsError:
            if snapshot.read_bytes() != content:
                raise ValueError(f"refusing to overwrite existing snapshot: {snapshot}") from None
            status = "reused"

    record: dict[str, object] = {
        "status": status,
        "source_file": snapshot.resolve().relative_to(root).as_posix(),
        "canonical_url": source_url,
        "requested_url": requested_url,
        "resolved_url": final_url,
        "source_version": version,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "snapshot_date": snapshot_date,
        "content_type": content_type,
        "sha256": sha256,
        "bytes": len(content),
    }
    ledger.parent.mkdir(parents=True, exist_ok=True)
    encoded = (json.dumps(record, ensure_ascii=False) + "\n").encode("utf-8")
    descriptor = os.open(ledger, os.O_APPEND | os.O_CREAT | os.O_WRONLY, 0o644)
    try:
        os.write(descriptor, encoded)
    finally:
        os.close(descriptor)
    return record


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True, help="Original source URL; also required when importing a downloaded file.")
    parser.add_argument("--canonical-url", help="Stable identity URL, if different from download URL.")
    parser.add_argument("--slug", required=True, help="Kebab-case source name.")
    parser.add_argument("--date", required=True, help="Snapshot date (YYYY-MM-DD) in the user's timezone.")
    parser.add_argument("--version", help="Paper revision, documentation release, or repository commit.")
    parser.add_argument("--file", type=Path, help="Import already downloaded canonical bytes instead of fetching.")
    parser.add_argument("--previous", type=Path, help="Existing raw/ snapshot to compare when first adopting this ledger.")
    parser.add_argument("--extension", help="File extension; otherwise inferred from path or Content-Type.")
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--max-mb", type=int, default=64)
    parser.add_argument("--timeout", type=float, default=30)
    args = parser.parse_args()
    try:
        if args.max_mb <= 0 or args.timeout <= 0:
            raise ValueError("size limit and timeout must be positive")
        url = canonical_url(args.url)
        max_bytes = args.max_mb * 1024 * 1024
        if args.file:
            with args.file.open("rb") as input_file:
                content = input_file.read(max_bytes + 1)
            if len(content) > max_bytes:
                raise ValueError(f"source exceeds {max_bytes} bytes")
            resolved, content_type = url, mimetypes.guess_type(args.file.name)[0] or ""
        else:
            content, resolved, content_type = fetch(url, max_bytes, args.timeout)
        path_extension = Path(args.file.name if args.file else urlsplit(resolved).path).suffix
        extension = args.extension or path_extension or mimetypes.guess_extension(content_type.split(";", 1)[0]) or ".bin"
        record = archive(args.root, content, url=url, slug=args.slug, snapshot_date=args.date,
                         extension=extension, version=args.version, canonical=args.canonical_url,
                         resolved_url=resolved, content_type=content_type, previous=args.previous)
    except (ValueError, OSError) as error:
        parser.exit(1, f"archive failed: {error}\n")
    print(json.dumps(record, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
