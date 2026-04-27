#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
from pathlib import Path


def read_source_text(path: Path) -> str:
    data = path.read_bytes()
    if data.startswith(b"\xff\xfe") or data.startswith(b"\xfe\xff"):
        return data.decode("utf-16")
    if data.startswith(b"\xef\xbb\xbf"):
        return data.decode("utf-8-sig")
    return data.decode("utf-8", errors="replace")


def output_path(root: Path, source: Path, suffix: str = ".md") -> Path:
    return root / "graph" / "extracts" / f"{source.stem}{suffix}"


def write_output(path: Path, text: str, force: bool) -> str:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not force:
        return f"exists: {path}"
    path.write_text(text.rstrip() + "\n", encoding="utf-8")
    return f"wrote: {path}"


def build_markitdown(args: argparse.Namespace):
    try:
        from markitdown import MarkItDown
    except ImportError:
        return None

    options: dict[str, object] = {
        "enable_plugins": args.use_plugins,
    }
    if args.docintel_endpoint:
        options["docintel_endpoint"] = args.docintel_endpoint
    if args.llm_model:
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise SystemExit("openai is required when --llm-model is set") from exc
        options["llm_client"] = OpenAI()
        options["llm_model"] = args.llm_model
    if args.llm_prompt:
        options["llm_prompt"] = args.llm_prompt
    return MarkItDown(**options)


def convert_with_markitdown(source: Path, args: argparse.Namespace) -> str | None:
    converter = build_markitdown(args)
    if converter is None:
        return None
    result = converter.convert(str(source))
    return result.text_content


def fallback_convert(source: Path) -> str:
    suffix = source.suffix.lower()
    if suffix in {".md", ".txt", ".html", ".htm", ".json", ".csv", ".xml"}:
        return read_source_text(source)
    raise SystemExit(
        "markitdown is required for this source type. Run `uv sync` or use `uv run python tools/extract_source.py ...`."
    )


def extract_source(root: Path, source: Path, args: argparse.Namespace) -> str:
    out = output_path(root, source)
    if out.exists() and not args.force:
        return f"exists: {out}"
    text = convert_with_markitdown(source, args)
    if text is None:
        text = fallback_convert(source)
    return write_output(out, text, args.force)


def main() -> int:
    parser = argparse.ArgumentParser(description="Convert source files into graph/extracts/ Markdown artifacts.")
    parser.add_argument("source", help="Source file path, relative to repo root or absolute.")
    parser.add_argument("--root", default=".", help="Repository root.")
    parser.add_argument("--force", action="store_true", help="Overwrite existing extract.")
    parser.add_argument("--use-plugins", action="store_true", help="Enable installed MarkItDown plugins such as OCR.")
    parser.add_argument("--llm-model", default=os.environ.get("MARKITDOWN_LLM_MODEL"), help="Vision-capable model for image descriptions/OCR.")
    parser.add_argument("--llm-prompt", default=None, help="Optional prompt for MarkItDown LLM image handling.")
    parser.add_argument("--docintel-endpoint", default=os.environ.get("DOCUMENT_INTELLIGENCE_ENDPOINT"), help="Azure Document Intelligence endpoint.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    source = Path(args.source)
    if not source.is_absolute():
        source = root / source
    source = source.resolve()
    if not source.exists():
        raise SystemExit(f"source not found: {source}")

    message = extract_source(root, source, args)
    print(message)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
