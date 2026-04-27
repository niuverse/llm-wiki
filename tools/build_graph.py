#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from datetime import date
from pathlib import Path
from typing import Any


EXCLUDE = {"index.md", "log.md", "health-report.md", "lint-report.md"}
TYPE_COLORS = {
    "source": "#4CAF50",
    "entity": "#2196F3",
    "concept": "#FF9800",
    "synthesis": "#9C27B0",
    "unknown": "#9E9E9E",
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def parse_frontmatter(text: str) -> dict[str, str]:
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


def pages(root: Path) -> list[Path]:
    return sorted(p for p in (root / "wiki").rglob("*.md") if p.name not in EXCLUDE)


def node_id(root: Path, page: Path) -> str:
    return page.relative_to(root / "wiki").with_suffix("").as_posix()


def link_target(raw: str) -> str:
    return raw.split("|", 1)[0].split("#", 1)[0].strip()


def build_nodes(root: Path, wiki_pages: list[Path]) -> list[dict[str, Any]]:
    nodes = []
    for page in wiki_pages:
        text = read_text(page)
        fm = parse_frontmatter(text)
        page_type = fm.get("type", "unknown")
        nodes.append(
            {
                "id": node_id(root, page),
                "label": fm.get("title", page.stem),
                "type": page_type,
                "color": TYPE_COLORS.get(page_type, TYPE_COLORS["unknown"]),
                "path": page.relative_to(root).as_posix(),
            }
        )
    return nodes


def build_edges(root: Path, wiki_pages: list[Path]) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    stem_map = {page.stem.lower(): node_id(root, page) for page in wiki_pages}
    path_map = {node_id(root, page).lower(): node_id(root, page) for page in wiki_pages}
    edges: list[dict[str, Any]] = []
    missing: list[dict[str, str]] = []
    seen_pairs: set[tuple[str, str]] = set()

    for page in wiki_pages:
        src = node_id(root, page)
        for raw in re.findall(r"\[\[([^\]]+)\]\]", read_text(page)):
            target_name = link_target(raw)
            target = path_map.get(target_name.lower()) or stem_map.get(Path(target_name).stem.lower())
            if not target:
                missing.append({"from": src, "target": target_name})
                continue
            if target == src:
                continue
            pair = tuple(sorted((src, target)))
            if pair in seen_pairs:
                continue
            seen_pairs.add(pair)
            edges.append(
                {
                    "id": f"{pair[0]}--{pair[1]}",
                    "from": src,
                    "to": target,
                    "type": "EXTRACTED",
                    "confidence": 1.0,
                }
            )
    return edges, missing


def generate_html(graph: dict[str, Any]) -> str:
    data = json.dumps(graph, ensure_ascii=False, indent=2)
    rows = "\n".join(
        f"<li><strong>{node['label']}</strong> <code>{node['id']}</code> <span>{node['type']}</span></li>"
        for node in graph["nodes"]
    )
    edge_rows = "\n".join(
        f"<li><code>{edge['from']}</code> -> <code>{edge['to']}</code></li>" for edge in graph["edges"]
    )
    return f"""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>LLM Wiki Graph</title>
<style>
body {{ font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }}
code {{ background: #f4f4f4; padding: 0.1rem 0.25rem; border-radius: 4px; }}
pre {{ overflow: auto; background: #f8f8f8; padding: 1rem; }}
</style>
<h1>LLM Wiki Graph</h1>
<p>Built: {graph["built"]}. Nodes: {len(graph["nodes"])}. Edges: {len(graph["edges"])}.</p>
<h2>Nodes</h2>
<ul>{rows}</ul>
<h2>Edges</h2>
<ul>{edge_rows}</ul>
<h2>Raw Data</h2>
<pre id="graph-data">{data}</pre>
</html>
"""


def degree_map(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> dict[str, int]:
    degrees = {node["id"]: 0 for node in nodes}
    for edge in edges:
        degrees[edge["from"]] += 1
        degrees[edge["to"]] += 1
    return degrees


def generate_report(graph: dict[str, Any], missing: list[dict[str, str]]) -> str:
    degrees = degree_map(graph["nodes"], graph["edges"])
    orphans = sorted(node_id for node_id, degree in degrees.items() if degree == 0)
    hubs = sorted(degrees.items(), key=lambda item: item[1], reverse=True)[:10]
    lines = [
        f"# Graph Report - {graph['built']}",
        "",
        f"- Nodes: {len(graph['nodes'])}",
        f"- Edges: {len(graph['edges'])}",
        f"- Orphans: {len(orphans)}",
        f"- Missing referenced pages: {len(missing)}",
        "",
        "## Orphan Nodes",
        "",
    ]
    lines.extend(f"- `{node}`" for node in orphans) if orphans else lines.append("No orphan nodes.")
    lines.extend(["", "## Top Degree Nodes", ""])
    lines.extend(f"- `{node}`: {degree}" for node, degree in hubs) if hubs else lines.append("No nodes.")
    lines.extend(["", "## Missing Referenced Pages", ""])
    lines.extend(f"- `{item['from']}` -> `[[{item['target']}]]`" for item in missing) if missing else lines.append("No missing referenced pages.")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Build explicit WikiLink graph artifacts.")
    parser.add_argument("--root", default=".", help="Repository root.")
    parser.add_argument("--report", action="store_true", help="Also write graph/graph-report.md.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    graph_dir = root / "graph"
    graph_dir.mkdir(parents=True, exist_ok=True)
    wiki_pages = pages(root)
    nodes = build_nodes(root, wiki_pages)
    edges, missing = build_edges(root, wiki_pages)
    graph = {"built": date.today().isoformat(), "nodes": nodes, "edges": edges, "missing": missing}

    (graph_dir / "graph.json").write_text(json.dumps(graph, ensure_ascii=False, indent=2), encoding="utf-8")
    (graph_dir / "graph.html").write_text(generate_html(graph), encoding="utf-8")
    print(f"wrote: {graph_dir / 'graph.json'}")
    print(f"wrote: {graph_dir / 'graph.html'}")

    if args.report:
        report = generate_report(graph, missing)
        (graph_dir / "graph-report.md").write_text(report, encoding="utf-8")
        print(f"wrote: {graph_dir / 'graph-report.md'}")
    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
