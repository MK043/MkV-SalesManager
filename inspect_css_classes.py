import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['index-h4vPCODF.css', 'ServiceTodayScreen-C6Pe4tQY.css', 'warehouse-WN6iyBs4.css']:
    path = f'scraped_source/{fname}'
    content = open(path, 'r', encoding='utf-8', errors='ignore').read()
    classes = sorted(set(re.findall(r'\.([a-zA-Z0-9_\-]+)', content)))
    print(f"=== {fname} ({len(classes)} classes) ===")
    print(', '.join(classes[:50]))
    print("...")
