import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/index-BSSaxj3E.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Search for axios or baseURL or create(
matches = [m.start() for m in re.finditer(r'baseURL|axios\.create|\.create\(', text)]
for idx in matches:
    print(text[max(0, idx-100):min(len(text), idx+200)])
    print("-" * 40)
