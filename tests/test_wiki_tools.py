import json
import os
import subprocess
import textwrap
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory


REPO_ROOT = Path(__file__).resolve().parents[1]


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(textwrap.dedent(content).strip() + "\n", encoding="utf-8")


class WikiToolTests(unittest.TestCase):
    def run_tool(
        self,
        *args: str,
        cwd: Path | None = None,
        env: dict[str, str] | None = None,
    ) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["python3", *args],
            cwd=cwd or REPO_ROOT,
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_health_json_reports_structural_integrity(self) -> None:
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            write(
                root / "wiki/index.md",
                """
                # Wiki Index

                ## Overview
                - [Overview](overview.md)
                - [Wiki Log](log.md)

                ## Sources
                - [Paper](sources/paper.md)

                ## Concepts
                - [Concept](concepts/Concept.md)
                """,
            )
            write(root / "wiki/log.md", "## [2026-04-27] ingest | Paper")
            write(
                root / "wiki/overview.md",
                "---\ntitle: Overview\ntype: synthesis\n---\n\n[[Paper]] with enough overview content to avoid being treated as an accidental stub file.",
            )
            write(
                root / "wiki/sources/paper.md",
                """
                ---
                title: "Paper"
                type: source
                source_file: raw/paper.pdf
                extracted_text: graph/extracts/paper.md
                ---

                ## 摘要

                Links to [[Concept]] and includes enough source-page body content to avoid being treated as an accidental stub.
                """,
            )
            write(
                root / "wiki/concepts/Concept.md",
                "---\ntitle: Concept\ntype: concept\n---\n\nLinks to [[Paper]] with enough concept content to avoid being treated as an accidental stub page.",
            )
            write(root / "raw/paper.pdf", "%PDF fixture")
            write(root / "graph/extracts/paper.md", "Extracted text")

            result = self.run_tool("tools/health.py", "--root", str(root), "--json")

            self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
            data = json.loads(result.stdout)
            self.assertEqual(data["broken_wikilinks"], [])
            self.assertEqual(data["index_sync"]["on_disk_not_in_index"], [])
            self.assertEqual(data["source_files"]["missing"], [])

    def test_extract_source_uses_markitdown_and_writes_markdown(self) -> None:
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            fake_site = root / "fake_site"
            write(
                fake_site / "markitdown.py",
                """
                class Result:
                    text_content = "# Converted\\n\\nHello from MarkItDown."

                class MarkItDown:
                    def __init__(self, **kwargs):
                        self.kwargs = kwargs

                    def convert(self, path):
                        return Result()
                """,
            )
            write(root / "raw/article.html", "<html><body><h1>Title</h1></body></html>")
            env = os.environ.copy()
            env["PYTHONPATH"] = str(fake_site)

            first = self.run_tool("tools/extract_source.py", "--root", str(root), "raw/article.html", env=env)
            second = self.run_tool("tools/extract_source.py", "--root", str(root), "raw/article.html", env=env)

            extract = root / "graph/extracts/article.md"
            self.assertEqual(first.returncode, 0, first.stderr + first.stdout)
            self.assertEqual(second.returncode, 0, second.stderr + second.stdout)
            self.assertIn("Hello from MarkItDown.", extract.read_text(encoding="utf-8"))
            self.assertIn("exists", second.stdout)

    def test_extract_source_markdown_accepts_utf16_input(self) -> None:
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "raw/readme.md"
            source.parent.mkdir(parents=True, exist_ok=True)
            source.write_text("# Title\n\nHello world.\n", encoding="utf-16")

            result = self.run_tool("tools/extract_source.py", "--root", str(root), "raw/readme.md")

            self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
            self.assertIn("Hello world.", (root / "graph/extracts/readme.md").read_text(encoding="utf-8"))

    def test_build_graph_outputs_json_and_report(self) -> None:
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            write(root / "wiki/index.md", "# Wiki Index")
            write(root / "wiki/log.md", "# Wiki Log")
            write(
                root / "wiki/overview.md",
                """
                ---
                title: Overview
                type: synthesis
                ---

                See [[Concept]].
                """,
            )
            write(
                root / "wiki/concepts/Concept.md",
                """
                ---
                title: Concept
                type: concept
                ---

                Related to [[overview]].
                """,
            )

            result = self.run_tool("tools/build_graph.py", "--root", str(root), "--report")

            self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
            graph = json.loads((root / "graph/graph.json").read_text(encoding="utf-8"))
            self.assertEqual(len(graph["nodes"]), 2)
            self.assertEqual(len(graph["edges"]), 1)
            self.assertTrue((root / "graph/graph.html").exists())
            self.assertTrue((root / "graph/graph-report.md").exists())


if __name__ == "__main__":
    unittest.main()
