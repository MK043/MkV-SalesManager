import os
import re

found = set()
for fname in os.listdir('scraped_source'):
    if fname.endswith('.js'):
        path = os.path.join('scraped_source', fname)
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        matches = re.findall(r'assets/[a-zA-Z0-9_\-./]+\.[a-z0-9]+', text)
        for m in matches:
            found.add('/' + m)

print('Referenced chunks count:', len(found))
for m in sorted(found):
    basename = os.path.basename(m)
    exists = os.path.exists(os.path.join('scraped_source', basename))
    print(f'  {m} - {"EXISTS" if exists else "MISSING"}')
