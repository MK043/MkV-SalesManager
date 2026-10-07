import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/ReportsScreen-CgQCMBZH.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for m in re.finditer(r'/reports/[a-zA-Z0-9_\-]+', text):
    idx = m.start()
    print(text[max(0, idx-50):min(len(text), idx+150)])
    print("-" * 30)
