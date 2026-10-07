import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/index-BSSaxj3E.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's inspect around snippet 37673 and 129105
print("=== Around 37673 ===")
print(text[37400:38200])

print("\n=== Around 129000 ===")
print(text[128800:130500])
