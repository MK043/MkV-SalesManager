import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/index-h4vPCODF.css', 'r', encoding='utf-8') as f:
    css = f.read()

print(f"Total CSS length: {len(css)} characters")

# Extract :root / theme variables
root_vars = re.findall(r'(--[a-zA-Z0-9_\-]+:\s*[^;]+;)', css)
print("CSS Variables count:", len(root_vars))
for v in root_vars[:30]:
    print("  ", v)

# Look for color definitions or accent themes
accents = re.findall(r'\[data-accent=[^\]]+\]\s*\{[^}]+\}', css)
print("\nAccents count:", len(accents))
for a in accents:
    print("  ", a)
