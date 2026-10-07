import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in sorted(os.listdir('scraped_source')):
    if fname.endswith('.js'):
        path = os.path.join('scraped_source', fname)
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        storage_keys = re.findall(r'localStorage\.(?:getItem|setItem|removeItem)\(["\']([^"\']+)["\']', text)
        api_calls = re.findall(r'fetch\(["\']([^"\']+)["\']', text)
        if storage_keys or api_calls:
            print(f"File: {fname}")
            if storage_keys:
                print(f"  LocalStorage keys: {set(storage_keys)}")
            if api_calls:
                print(f"  Fetch calls: {set(api_calls)}")
