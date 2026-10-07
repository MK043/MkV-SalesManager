import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

endpoints = set()
for fname in sorted(os.listdir('scraped_source')):
    if fname.endswith('.js'):
        path = os.path.join('scraped_source', fname)
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        
        # Matches like ae.get('/foo') or ae.post(`/bar/${id}`) or "/api/..." or "/orders..."
        matches = re.findall(r'(?:ae|P)\.(?:get|post|put|patch|delete)\(\s*([`\'\"][^`\'\"]+[`\'\"])', text)
        for m in matches:
            endpoints.add((fname, m))
            
        # Also look for queryFn / mutationFn urls
        matches2 = re.findall(r'[\'\"`](/(?:api|orders|bookings|customers|warehouse|employees|shifts|cash|tasks|parking|parts|settings|profile|audit|demo|auth)/[^\'\"`\s]*)[\'\"`]', text)
        for m in matches2:
            endpoints.add((fname, m))

print("Total endpoints found:", len(endpoints))
for f, e in sorted(endpoints):
    print(f"  {f:35} -> {e}")
