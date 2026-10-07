import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

base_url = 'https://avto-panel.demo.aivinity.ru'

opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())

# Try visiting /today first to get cookies
req1 = urllib.request.Request(base_url + '/today', headers={'User-Agent': 'Mozilla/5.0'})
try:
    resp1 = opener.open(req1)
    print("GET /today status:", resp1.status)
except Exception as e:
    print("GET /today error:", e)

# Test endpoints
test_urls = [
    '/auth/web/me',
    '/dashboard/today',
    '/orders',
    '/orders/pipeline',
    '/orders/overview-stats',
    '/bookings',
    '/customers/registry',
    '/warehouse/items',
    '/warehouse/docs',
    '/warehouse/warehouses',
    '/cash/flow',
    '/cash/orders',
    '/admin/users',
    '/admin/roles',
    '/company-tasks',
    '/reports/orders-registry'
]

import os
os.makedirs('scraped_api', exist_ok=True)

for url in test_urls:
    try:
        req = urllib.request.Request(base_url + url, headers={
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json'
        })
        resp = opener.open(req)
        content = resp.read()
        print(f"GET {url}: {resp.status} ({len(content)} bytes)")
        fname = os.path.join('scraped_api', url.strip('/').replace('/', '_') + '.json')
        with open(fname, 'wb') as f:
            f.write(content)
    except Exception as e:
        print(f"GET {url} error: {e}")
