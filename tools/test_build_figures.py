"""Guard evidence integrity and visible figure-reference coverage."""
import tempfile
import unittest
from pathlib import Path

from build_figures import check, digest, figure_references


class FigureEvidenceTests(unittest.TestCase):
    def test_ranges_and_book_numbers(self):
        self.assertEqual(figure_references('图1–3、5；图 13.1–13.3；```\n图99\n```'),
                         {'1', '2', '3', '5', '13.1', '13.2', '13.3'})

    def test_missing_embed_and_changed_evidence_fail(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / 'raw/paper.pdf'
            image = root / 'wiki/assets/figure.webp'
            note = root / 'wiki/sources/paper.md'
            for path in (source, image, note):
                path.parent.mkdir(parents=True, exist_ok=True)
            source.write_bytes(b'original evidence')
            image.write_bytes(b'derivative')
            note.write_text('解释图 1。\n\n![图1](../assets/figure.webp)\n')
            entry = dict(note='wiki/sources/paper.md', source_file='raw/paper.pdf',
                         image='wiki/assets/figure.webp', source_sha256=digest(source),
                         image_sha256=digest(image), figures=['1'])
            self.assertEqual(check(root, [entry]), [])
            note.write_text('解释图 1、2。')
            errors = check(root, [entry])
            self.assertTrue(any('not embedded' in error for error in errors))
            self.assertTrue(any('without registered images' in error for error in errors))
            source.write_bytes(b'overwritten evidence')
            self.assertTrue(any('hash mismatch' in error for error in check(root, [entry])))


if __name__ == '__main__':
    unittest.main()
