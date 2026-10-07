import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('scraped_source/index-BSSaxj3E.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Search for data structures or keywords like orders, bookings, warehouse, customers, createOrder, reset, etc.
keywords = ['reset', 'demo', 'orders', 'bookings', 'customers', 'employees', 'tasks', 'warehouse', 'parts', 'audit', 'cash']
for kw in keywords:
    matches = [m.start() for m in re.finditer(r'\b' + kw + r'\b', text, re.IGNORECASE)]
    print(f"Keyword '{kw}': {len(matches)} occurrences")

# Find occurrences of demo reset or initial data
for m in re.finditer(r'(?:demo|reset|seed|mock|initialState|database)', text, re.IGNORECASE):
    idx = m.start()
    snippet = text[max(0, idx-50):min(len(text), idx+150)]
    if 'reset' in snippet.lower() or 'seed' in snippet.lower():
        print(f"Snippet near {idx}:\n  {snippet}\n")
