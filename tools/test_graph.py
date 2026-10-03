"""Directory membership must not masquerade as a scholarly relationship."""
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from build_graph import pages, build_edges


class KnowledgeGraphTests(unittest.TestCase):
    def test_navigation_edges_excluded_without_hiding_broken_knowledge_links(self):
        with TemporaryDirectory() as folder:
            root = Path(folder)
            wiki = root / "wiki"
            wiki.mkdir()
            docs = {
                "catalog": ('navigation', '[[Paper]] [[Mechanism]]'),
                "Old": ('redirect', '[[Paper]]'),
                "Paper": ('source', '[[Mechanism]] [[catalog]] [[Old]] [[Missing]]'),
                "Mechanism": ('concept', ''),
            }
            for name, (kind, body) in docs.items():
                (wiki / (name + '.md')).write_text(f'---\ntype: {kind}\n---\n{body}\n')
            visible = pages(root)
            self.assertEqual({p.stem for p in visible}, {'Paper', 'Mechanism'})
            edges, missing = build_edges(root, visible)
            self.assertEqual([(e['from'], e['to']) for e in edges], [('Paper', 'Mechanism')])
            self.assertEqual(missing, [{'from': 'Paper', 'target': 'Missing'}])


if __name__ == '__main__':
    unittest.main()
