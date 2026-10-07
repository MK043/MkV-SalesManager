import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/index-BSSaxj3E.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for m in re.finditer(r'ticket', text):
    idx = m.start()
    print(text[max(0, idx-100):min(len(text), idx+150)])
    print("-" * 30)
