import os
import re
import json

routes = []
with open('scraped_source/index-BSSaxj3E.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find routes: path: "..."
route_matches = re.findall(r'path:\s*["\']([^"\']+)["\']', text)
print("Routes found in index bundle:")
for r in sorted(set(route_matches)):
    print("  ", r)

# Also check router bundle
with open('scraped_source/router-Ldlm7Bhn.js', 'r', encoding='utf-8') as f:
    text_r = f.read()

route_matches_r = re.findall(r'path:\s*["\']([^"\']+)["\']', text_r)
print("Routes found in router bundle:")
for r in sorted(set(route_matches_r)):
    print("  ", r)
