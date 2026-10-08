"""The home activity feed must preserve what the log actually records."""
import unittest
from build_catalog import recent_updates


class RecentUpdatesTests(unittest.TestCase):
    def test_append_order_and_old_date_only_records(self):
        log = """## [2026-10-08] ingest | Old
[[sources/first|本页]]
## [2026-10-08] maintenance | New
时间：2026-10-08 18:42（北京时间，UTC+08:00）
[[topics/world-models|World Models]] and [[topics/world-models|重复引用]]
"""
        updates = recent_updates(log)
        self.assertEqual(updates[0], ("2026-10-08 18:42", "New", ["topics/world-models"]))
        self.assertEqual(updates[1], ("2026-10-08", "Old", ["sources/first"]))

    def test_limit_and_empty_log(self):
        log = "\n".join(f"## [2026-10-08] maintenance | Change {i}\n" for i in range(8))
        self.assertEqual([entry[1] for entry in recent_updates(log)], [f"Change {i}" for i in range(7, 2, -1)])
        self.assertEqual(recent_updates("# 日志\n还没有操作记录"), [])


if __name__ == "__main__":
    unittest.main()
