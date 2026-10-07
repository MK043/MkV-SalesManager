import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

cyrillic_pattern = re.compile(r'[\u0400-\u04FF]+')

results = {}
for fname in sorted(os.listdir('scraped_source')):
    if fname.endswith('.js'):
        path = os.path.join('scraped_source', fname)
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        # Find all string literals with cyrillic
        matches = re.findall(r'["\']([^"\']*[а-яА-ЯёЁ][^"\']*)["\']', text)
        clean = [m for m in matches if len(m) < 150]
        results[fname] = clean

for fname, strings in results.items():
    print(f"=== {fname}: {len(strings)} Cyrillic strings ===")
    for s in strings[:8]:
        print(f"   - {s}")
    if len(strings) > 8:
        print(f"   ... and {len(strings) - 8} more")
