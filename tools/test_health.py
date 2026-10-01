"""Exercise the CLI gates used before integrating automatic research."""

from pathlib import Path
import json
import subprocess
import sys
import tempfile
import unittest


HEALTH = Path(__file__).with_name("health.py")
BODY = "这是一段有待外部资料验证的学习笔记，明确保留证据边界。" * 8


class HealthGateTests(unittest.TestCase):
    def check_page(self, *, tags="[unsourced]", body=BODY):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            wiki = root / "wiki"
            (wiki / "concepts").mkdir(parents=True)
            (wiki / "index.md").write_text(
                "[测试概念](concepts/Example.md)\n", encoding="utf-8"
            )
            (wiki / "concepts/Example.md").write_text(
                f"---\ntitle: 测试概念\ntype: concept\ntags: {tags}\n"
                f"sources: []\nmodified: 2026-10-02\n---\n\n{body}\n",
                encoding="utf-8",
            )
            result = subprocess.run(
                [sys.executable, str(HEALTH), "--root", str(root), "--json"],
                capture_output=True,
                text=True,
                check=False,
            )
            return result.returncode, json.loads(result.stdout)

    def test_valid_unsourced_note_passes(self):
        code, report = self.check_page()
        self.assertEqual(code, 0)
        self.assertEqual(report["evidence_state"], [])

    def test_conversation_distillation_has_visible_status(self):
        code, report = self.check_page(tags="[distill]")
        self.assertEqual(code, 0)
        self.assertEqual(report["evidence_state"], [])

    def test_missing_evidence_status_stops_integration(self):
        code, report = self.check_page(tags="[]")
        self.assertEqual(code, 1)
        self.assertEqual(len(report["evidence_state"]), 1)

    def test_source_backed_tag_cannot_replace_missing_sources(self):
        code, report = self.check_page(tags="[source-backed]")
        self.assertEqual(code, 1)
        self.assertEqual(len(report["evidence_state"]), 1)

    def test_reported_language_error_stops_integration(self):
        code, report = self.check_page(body=BODY + "这里的 source 需要归档。")
        self.assertEqual(code, 1)
        self.assertTrue(report["language_artifacts"])

    def test_empty_page_stops_integration(self):
        code, report = self.check_page(body="")
        self.assertEqual(code, 1)
        self.assertEqual(report["empty_files"][0]["status"], "empty")


if __name__ == "__main__":
    unittest.main()
