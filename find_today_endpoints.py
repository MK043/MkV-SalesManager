import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['ServiceTodayScreen-CNdx2J4j.js', 'OrdersListScreen-KwcTAs3g.js']:
    path = os.path.join('scraped_source', fname)
    if os.path.exists(path):
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        matches = re.findall(r'[\'\"`](/(?:[a-zA-Z0-9_\-]+(?:/[a-zA-Z0-9_\-\$#{}\?=&]+)*))[\'\"`]', text)
        print(f"=== {fname} ===")
        for m in sorted(set(matches)):
            if not m.endswith('.js') and not m.endswith('.css'):
                print("  ", m)
