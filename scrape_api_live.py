import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Get visitor ticket
req = urllib.request.Request(
    'https://avto.demo.aivinity.ru/demo/visitor',
    data=json.dumps({'source': 'landing'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp = urllib.request.urlopen(req)
visitor_data = json.loads(resp.read().decode('utf-8'))
ticket = visitor_data.get('ticket')
print("Obtained ticket:", ticket)

# 2. Enter demo
cookie_processor = urllib.request.HTTPCookieProcessor()
opener = urllib.request.build_opener(cookie_processor)

req_enter = urllib.request.Request(
    'https://avto-panel.demo.aivinity.ru/demo/enter',
    data=json.dumps({'ticket': ticket, 'role': 'owner', 'client': 'panel'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp_enter = opener.open(req_enter)
enter_data = json.loads(resp_enter.read().decode('utf-8'))
token = enter_data.get('access_token')
print("Obtained token:", token[:20] if token else None)
print("Role:", enter_data.get('role'))

# 3. Test authenticated endpoints!
test_endpoints = [
    '/auth/web/me',
    '/dashboard/today',
    '/orders',
    '/orders/pipeline',
    '/orders/overview-stats',
    '/orders/review-queue',
    '/bookings',
    '/customers/registry',
    '/warehouse/items',
    '/warehouse/docs',
    '/warehouse/warehouses',
    '/cash/flow',
    '/cash/orders',
    '/admin/users',
    '/admin/roles',
    '/admin/stages',
    '/clients/stage-positions',
    '/clients/payroll-settings',
    '/company/positions',
    '/work-items',
    '/company-tasks',
    '/reports/orders-registry',
    '/reports/debts',
    '/reports/executors',
    '/reports/managers',
    '/reports/payroll',
    '/shifts/active',
    '/shifts/pending',
    '/audit/actions'
]

import os
os.makedirs('scraped_api', exist_ok=True)

for ep in test_endpoints:
    url = 'https://avto-panel.demo.aivinity.ru' + ep
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    try:
        r = urllib.request.Request(url, headers=headers)
        res = opener.open(r)
        data = res.read()
        print(f"GET {ep:30} -> {res.status} ({len(data)} bytes)")
        fname = os.path.join('scraped_api', ep.strip('/').replace('/', '_') + '.json')
        with open(fname, 'wb') as out:
            out.write(data)
    except Exception as e:
        print(f"GET {ep:30} -> ERROR: {e}")
