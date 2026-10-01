"""Observable invariants for immutable evidence archival; no external network."""
from __future__ import annotations

import hashlib
import json
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from archive_source import archive, canonical_url, fetch


class ArchiveTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.options = dict(url="https://example.org/paper.pdf", slug="paper", snapshot_date="2026-10-02", extension="pdf")

    def test_unchanged_refresh_reuses_original_bytes(self) -> None:
        first = archive(self.root, b"original PDF bytes", version="v1", **self.options)
        second = archive(self.root, b"original PDF bytes", version="v1", **(self.options | {"snapshot_date": "2026-10-03"}))
        self.assertEqual(second["status"], "reused")
        self.assertEqual(first["source_file"], second["source_file"])
        self.assertEqual(len(list((self.root / "raw").iterdir())), 1)
        self.assertEqual((self.root / str(first["source_file"])).read_bytes(), b"original PDF bytes")
        records = [json.loads(line) for line in (self.root / "graph/acquisitions.jsonl").read_text().splitlines()]
        self.assertEqual([record["snapshot_date"] for record in records], ["2026-10-02", "2026-10-03"])
        self.assertEqual(records[0]["sha256"], hashlib.sha256(b"original PDF bytes").hexdigest())

    def test_new_version_preserves_old_snapshot(self) -> None:
        first = archive(self.root, b"v1", version="v1", **self.options)
        second = archive(self.root, b"v2", version="v2", **self.options)
        self.assertNotEqual(first["source_file"], second["source_file"])
        self.assertEqual((self.root / str(first["source_file"])).read_bytes(), b"v1")
        self.assertEqual((self.root / str(second["source_file"])).read_bytes(), b"v2")

    def test_explicit_previous_adopts_existing_raw_file_without_rewriting(self) -> None:
        previous = self.root / "raw/old-file.pdf"
        previous.parent.mkdir()
        previous.write_bytes(b"already ingested")
        previous_stat = previous.stat()
        result = archive(self.root, b"already ingested", previous=Path("raw/old-file.pdf"), **self.options)
        self.assertEqual(result["source_file"], "raw/old-file.pdf")
        self.assertEqual(previous.stat().st_mtime_ns, previous_stat.st_mtime_ns)
        self.assertEqual(len(list(previous.parent.iterdir())), 1)

    def test_tampered_evidence_is_reported_without_overwriting(self) -> None:
        first = archive(self.root, b"evidence", **self.options)
        path = self.root / str(first["source_file"])
        path.write_bytes(b"tampered")
        with self.assertRaisesRegex(ValueError, "modified"):
            archive(self.root, b"evidence", **self.options)
        self.assertEqual(path.read_bytes(), b"tampered")

    def test_distinct_download_urls_share_explicit_canonical_identity(self) -> None:
        first = archive(self.root, b"same paper", canonical="https://example.org/paper", **self.options)
        second = archive(self.root, b"same paper", canonical="https://example.org/paper", **(self.options | {"url": "https://mirror.example/paper.pdf"}))
        self.assertEqual(first["source_file"], second["source_file"])
        self.assertEqual(second["requested_url"], "https://mirror.example/paper.pdf")

    def test_invalid_names_and_outside_previous_cannot_write_outside_raw(self) -> None:
        with self.assertRaisesRegex(ValueError, "slug"):
            archive(self.root, b"data", **(self.options | {"slug": "../escape"}))
        outside = self.root / "outside.pdf"
        outside.write_bytes(b"data")
        with self.assertRaisesRegex(ValueError, "inside raw"):
            archive(self.root, b"data", previous=outside, **self.options)
        self.assertFalse((self.root / "raw").exists())

    def test_url_normalization_preserves_version_query(self) -> None:
        self.assertEqual(canonical_url("https://EXAMPLE.org:443/doc?v=2#section"), "https://example.org/doc?v=2")

    def test_invalid_provenance_fails_before_creating_evidence(self) -> None:
        with self.assertRaisesRegex(ValueError, "HTTP"):
            archive(self.root, b"data", canonical="https://example.org/paper", **(self.options | {"url": "file:///tmp/paper.pdf"}))
        self.assertFalse((self.root / "raw").exists())


class FetchTests(unittest.TestCase):
    def test_redirect_bytes_and_size_limit(self) -> None:
        payload = b"<html>canonical response</html>"

        class Handler(BaseHTTPRequestHandler):
            def do_GET(self) -> None:
                if self.path == "/redirect":
                    self.send_response(302)
                    self.send_header("Location", "/source.html")
                    self.end_headers()
                    return
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(payload)))
                self.end_headers()
                self.wfile.write(payload)

            def log_message(self, *args: object) -> None:
                pass

        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            url = f"http://127.0.0.1:{server.server_port}/redirect"
            content, resolved, content_type = fetch(url, 1000, 2)
            self.assertEqual(content, payload)
            self.assertTrue(resolved.endswith("/source.html"))
            self.assertEqual(content_type, "text/html; charset=utf-8")
            with self.assertRaisesRegex(ValueError, "exceeds"):
                fetch(url, 5, 2)
        finally:
            server.shutdown()
            server.server_close()
            thread.join()


if __name__ == "__main__":
    unittest.main()
