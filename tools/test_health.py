"""Exercise the CLI gates used before integrating automatic research."""

from pathlib import Path
import json
import subprocess
import sys
import tempfile
import unittest
from health import check_research_structure, frontmatter_list, check_local_images, check_broken_wikilinks, check_empty_files


HEALTH = Path(__file__).with_name("health.py")
BODY = "这是一段有待外部资料验证的学习笔记，明确保留证据边界。" * 8


class HealthGateTests(unittest.TestCase):
    def test_short_redirect_still_requires_body_and_valid_target(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "wiki").mkdir()
            page = root / "wiki/old.md"
            header = "---\ntype: redirect\nredirect_to: missing\n---\n"
            page.write_text(header + "内容已并入 [[missing]]。", encoding="utf-8")
            self.assertEqual(check_empty_files(root, [page]), [])
            self.assertTrue(check_research_structure(root, [page]))
            page.write_text(header, encoding="utf-8")
            self.assertEqual(check_empty_files(root, [page])[0]["status"], "empty")

    def test_log_link_requires_an_existing_log_file(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            wiki = root / "wiki"
            wiki.mkdir()
            page = wiki / "catalog.md"
            page.write_text("[[log|知识库日志]]", encoding="utf-8")
            self.assertEqual(len(check_broken_wikilinks(root, [page])), 1)
            (wiki / "log.md").write_text("# 知识库日志", encoding="utf-8")
            self.assertEqual(check_broken_wikilinks(root, [page]), [])

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


class ResearchStructureTests(unittest.TestCase):
    def test_source_list_preserves_multiple_wikilinks_and_ignores_body(self):
        text = '---\nsources: ["[[first-paper]]", "[[second-paper]]"]\n---\ntopics: ["body-only"]\n'
        self.assertEqual(frontmatter_list(text, "sources"), ["[[first-paper]]", "[[second-paper]]"])
        self.assertEqual(frontmatter_list(text, "topics"), [])

    def check_memberships(self, topic_field, *, domain=None):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            files = {
                "domains/robotics.md": "type: domain",
                "topics/control.md": "type: topic" + (f"\ndomain: {domain}" if domain else ""),
                "topics/learning.md": "type: topic",
                "concepts/Example.md": f"type: concept\ntopics: {topic_field}",
            }
            pages = []
            for name, meta in files.items():
                path = root / "wiki" / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(f"---\n{meta}\n---\n{BODY}")
                pages.append(path)
            return check_research_structure(root, pages)

    def test_shared_concept_can_belong_to_two_topics(self):
        self.assertEqual(self.check_memberships('["topics/control", "topics/learning"]'), [])

    def test_missing_topic_is_rejected(self):
        issues = self.check_memberships('["topics/missing"]')
        self.assertIn("missing or not a topic", issues[0]["issue"])

    def test_domain_cannot_substitute_for_topic(self):
        issues = self.check_memberships('["domains/robotics"]')
        self.assertIn("missing or not a topic", issues[0]["issue"])

    def test_topic_cannot_be_nested_under_another_topic(self):
        issues = self.check_memberships('[]', domain="topics/learning")
        self.assertIn("no mandatory parent", issues[0]["issue"])


class LocalImageTests(unittest.TestCase):
    def test_only_vault_local_images_are_portable(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "wiki/sources").mkdir(parents=True)
            (root / "wiki/assets").mkdir()
            (root / "raw").mkdir()
            (root / "wiki/assets/figure.webp").write_bytes(b"image")
            (root / "raw/figure.webp").write_bytes(b"image")
            page = root / "wiki/sources/paper.md"
            page.write_text("![ok](../assets/figure.webp)\n![missing](../assets/missing.webp)\n"
                            "![outside](../../raw/figure.webp)\n![remote](https://example.com/image.png)\n"
                            "```markdown\n![example](missing.png)\n```", encoding="utf-8")
            errors = check_local_images(root, [page])
            self.assertEqual(len(errors), 3)
            self.assertNotIn("../assets/figure.webp", [error["target"] for error in errors])


if __name__ == "__main__":
    unittest.main()
