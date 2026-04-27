#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path
from typing import Any


META_FILES = {"index.md", "log.md", "health-report.md", "lint-report.md"}
STUB_THRESHOLD_CHARS = 100


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def strip_frontmatter(text: str) -> str:
    if not text.startswith("---"):
        return text.strip()
    match = re.match(r"^---\n.*?\n---\n?", text, flags=re.DOTALL)
    return text[match.end() :].strip() if match else text.strip()


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}
    match = re.match(r"^---\n(.*?)\n---", text, flags=re.DOTALL)
    if not match:
        return {}
    data: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip("\"'")
    return data


def all_wiki_pages(root: Path) -> list[Path]:
    wiki_dir = root / "wiki"
    return sorted(p for p in wiki_dir.rglob("*.md") if p.name not in META_FILES)


def page_ids(root: Path, pages: list[Path]) -> set[str]:
    ids = set()
    wiki_dir = root / "wiki"
    for page in pages:
        ids.add(page.stem.lower())
        ids.add(page.relative_to(wiki_dir).with_suffix("").as_posix().lower())
    return ids


def normalize_wikilink(raw: str) -> str:
    target = raw.split("|", 1)[0].split("#", 1)[0].strip()
    return target.lower()


def check_broken_wikilinks(root: Path, pages: list[Path]) -> list[dict[str, str]]:
    ids = page_ids(root, pages)
    broken = []
    for page in pages:
        text = read_text(page)
        for raw in re.findall(r"\[\[([^\]]+)\]\]", text):
            target = normalize_wikilink(raw)
            if target and target not in ids and Path(target).stem.lower() not in ids:
                broken.append(
                    {
                        "page": page.relative_to(root).as_posix(),
                        "target": target,
                    }
                )
    return broken


def check_empty_files(root: Path, pages: list[Path]) -> list[dict[str, Any]]:
    empty = []
    for page in pages:
        raw = read_text(page)
        body = strip_frontmatter(raw)
        if len(body) < STUB_THRESHOLD_CHARS:
            empty.append(
                {
                    "path": page.relative_to(root).as_posix(),
                    "total_bytes": len(raw),
                    "body_bytes": len(body),
                    "status": "empty" if not body else "stub",
                }
            )
    return empty


def parse_index_links(index_text: str) -> set[str]:
    return set(re.findall(r"\]\(([^)]+\.md)\)", index_text))


def check_index_sync(root: Path, pages: list[Path]) -> dict[str, list[str]]:
    wiki_dir = root / "wiki"
    index_links = parse_index_links(read_text(wiki_dir / "index.md"))
    index_paths = {(wiki_dir / link).resolve() for link in index_links}
    disk_paths = {page.resolve() for page in pages if page.name != "overview.md"}
    optional_index_paths = {
        (wiki_dir / "overview.md").resolve(),
        (wiki_dir / "log.md").resolve(),
    }
    return {
        "in_index_not_on_disk": sorted(
            str(path.relative_to(root))
            for path in index_paths - disk_paths - optional_index_paths
            if root.resolve() in path.parents
        ),
        "on_disk_not_in_index": sorted(
            str(path.relative_to(root)) for path in disk_paths - index_paths
        ),
    }


def check_log_coverage(root: Path) -> list[dict[str, str]]:
    wiki_dir = root / "wiki"
    log_text = read_text(wiki_dir / "log.md").lower()
    missing = []
    for page in sorted((wiki_dir / "sources").glob("*.md")):
        text = read_text(page)
        fm = parse_frontmatter(text)
        title = fm.get("title", page.stem)
        slug_words = page.stem.replace("-", " ").replace("_", " ").lower()
        if title.lower() not in log_text and slug_words not in log_text:
            missing.append({"path": page.relative_to(root).as_posix(), "title": title})
    return missing


def check_source_files(root: Path) -> dict[str, list[dict[str, str]]]:
    missing = []
    for page in sorted((root / "wiki/sources").glob("*.md")):
        fm = parse_frontmatter(read_text(page))
        for field in ("source_file", "extracted_text"):
            value = fm.get(field)
            if not value:
                continue
            target = root / value
            if not target.exists():
                missing.append(
                    {
                        "page": page.relative_to(root).as_posix(),
                        "field": field,
                        "path": value,
                    }
                )
    return {"missing": missing}


def run(root: Path) -> dict[str, Any]:
    pages = all_wiki_pages(root)
    return {
        "date": date.today().isoformat(),
        "total_pages": len(pages),
        "empty_files": check_empty_files(root, pages),
        "broken_wikilinks": check_broken_wikilinks(root, pages),
        "index_sync": check_index_sync(root, pages),
        "log_coverage": check_log_coverage(root),
        "source_files": check_source_files(root),
    }


def format_report(results: dict[str, Any]) -> str:
    lines = [
        f"# Wiki Health Report - {results['date']}",
        "",
        f"Scanned {results['total_pages']} wiki pages. Checks are deterministic and use no LLM calls.",
        "",
    ]
    sections = [
        ("Empty / Stub Files", results["empty_files"]),
        ("Broken Wikilinks", results["broken_wikilinks"]),
        ("Log Coverage", results["log_coverage"]),
        ("Missing Source Artifacts", results["source_files"]["missing"]),
    ]
    for title, items in sections:
        lines.extend([f"## {title} ({len(items)})", ""])
        if items:
            for item in items:
                lines.append(f"- `{json.dumps(item, ensure_ascii=False)}`")
        else:
            lines.append("No issues found.")
        lines.append("")

    sync = results["index_sync"]
    sync_count = len(sync["in_index_not_on_disk"]) + len(sync["on_disk_not_in_index"])
    lines.extend([f"## Index Sync ({sync_count})", ""])
    if sync_count:
        for path in sync["in_index_not_on_disk"]:
            lines.append(f"- stale index entry: `{path}`")
        for path in sync["on_disk_not_in_index"]:
            lines.append(f"- missing from index: `{path}`")
    else:
        lines.append("No issues found.")
    lines.append("")
    return "\n".join(lines)


def has_failures(results: dict[str, Any]) -> bool:
    return bool(
        results["broken_wikilinks"]
        or results["index_sync"]["in_index_not_on_disk"]
        or results["index_sync"]["on_disk_not_in_index"]
        or results["log_coverage"]
        or results["source_files"]["missing"]
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Structural checks for the LLM wiki.")
    parser.add_argument("--root", default=".", help="Repository root.")
    parser.add_argument("--json", action="store_true", help="Print machine-readable JSON.")
    parser.add_argument("--save", action="store_true", help="Save markdown report to wiki/health-report.md.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    results = run(root)
    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
    else:
        report = format_report(results)
        print(report)
        if args.save:
            out = root / "wiki/health-report.md"
            out.write_text(report, encoding="utf-8")
            print(f"Saved: {out.relative_to(root)}")
    return 1 if has_failures(results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
