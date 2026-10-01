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
                "---\ntitle: Overview\ntype: synthesis\nsources: [\"[[Paper]]\"]\n---\n\n"
                "[[Paper]] supports this overview. This fixture represents a reviewed synthesis "
                "and explicitly declares its evidence so the quality gate can distinguish it from an unsourced note.",
            )
            write(
                root / "wiki/sources/paper.md",
                """
                ---
                title: "Paper"
                type: source
                tags: [source-backed]
                source_file: raw/paper.pdf
                extracted_text: graph/extracts/paper.md
                ---

                ## 摘要

                Links to [[Concept]] and includes enough source-page body content to avoid being treated as an accidental stub.
                """,
            )
            write(
                root / "wiki/concepts/Concept.md",
                "---\ntitle: Concept\ntype: concept\nsources: [\"[[Paper]]\"]\n---\n\n"
                "Links to [[Paper]] and explains the mechanism supported by that evidence. "
                "This fixture is a complete concept rather than an empty navigation target or a generated stub.",
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

    def test_build_graph_is_reproducible_across_dates_and_timezones(self) -> None:
        # Run the actual CLI with controlled local dates, including the UTC /
        # Shanghai midnight boundary that made committed artifacts fail in CI.
        clock_runner = """
import datetime, os, runpy, sys, time
class ControlledDate(datetime.date):
    @classmethod
    def today(cls):
        return cls.fromisoformat(os.environ["GRAPH_TEST_TODAY"])
datetime.date = ControlledDate
if hasattr(time, "tzset"):
    time.tzset()
sys.argv = sys.argv[1:]
runpy.run_path(sys.argv[0], run_name="__main__")
"""
        with TemporaryDirectory() as tmp:
            root = Path(tmp)
            write(root / "wiki/concepts/Concept.md", "---\ntitle: Concept\ntype: concept\n---\n\n[[paper]]")
            write(root / "wiki/sources/paper.md", "---\ntitle: Paper\ntype: source\n---\n\nEvidence.")
            outputs = []
            for timezone, today in (
                ("UTC", "2026-10-01"),
                ("Asia/Shanghai", "2026-10-02"),
                ("UTC", "2027-01-01"),
            ):
                env = os.environ | {"TZ": timezone, "GRAPH_TEST_TODAY": today}
                result = self.run_tool(
                    "-c", clock_runner, "tools/build_graph.py", "--root", str(root), "--report", env=env
                )
                self.assertEqual(result.returncode, 0, result.stderr + result.stdout)
                outputs.append({
                    name: (root / "graph" / name).read_bytes()
                    for name in ("graph.json", "graph.html", "graph-report.md")
                })
            self.assertEqual(outputs[0], outputs[1])
            self.assertEqual(outputs[0], outputs[2])


if __name__ == "__main__":
    unittest.main()
