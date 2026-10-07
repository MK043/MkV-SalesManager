import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

for name in ['samples-DnYLCvLT.js', 'theme-boot.js', 'theme-boot.css', 'PageStates-DtfKgSTY.js']:
    path = os.path.join('scraped_source', name)
    print(f"=== {name} ===")
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        print(content[:1500])
        print("\n-----------------------\n")
