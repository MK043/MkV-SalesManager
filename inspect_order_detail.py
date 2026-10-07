import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/OrderDetailScreen-Bdi9fV2m.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Search for api calls in OrderDetailScreen
matches = re.finditer(r'(?:get|post|put|delete)\([`\'\"]([^`\'\"]+)[`\'\"]', text)
for m in matches:
    print("API call in OrderDetail:", m.group(0))

# Search for queryKey in OrderDetailScreen
queries = re.finditer(r'queryKey:\s*\[([^\]]+)\]', text)
for q in queries:
    print("queryKey:", q.group(1))
