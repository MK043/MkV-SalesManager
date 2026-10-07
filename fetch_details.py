import urllib.request
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Re-authenticate if needed
req = urllib.request.Request(
    'https://avto.demo.aivinity.ru/demo/visitor',
    data=json.dumps({'source': 'landing'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp = urllib.request.urlopen(req)
ticket = json.loads(resp.read().decode('utf-8')).get('ticket')

cookie_processor = urllib.request.HTTPCookieProcessor()
opener = urllib.request.build_opener(cookie_processor)

req_enter = urllib.request.Request(
    'https://avto-panel.demo.aivinity.ru/demo/enter',
    data=json.dumps({'ticket': ticket, 'role': 'owner', 'client': 'panel'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp_enter = opener.open(req_enter)
token = json.loads(resp_enter.read().decode('utf-8')).get('access_token')

def fetch_json(path, query=''):
    url = f'https://avto-panel.demo.aivinity.ru{path}{query}'
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    try:
        r = urllib.request.Request(url, headers=headers)
        res = opener.open(r)
        data = res.read()
        return json.loads(data.decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

# Reports with dates
reports = [
    ('/reports/orders-registry', '?date_from=2026-01-01&date_to=2026-12-31'),
    ('/reports/executors', '?date_from=2026-01-01&date_to=2026-12-31'),
    ('/reports/managers', '?date_from=2026-01-01&date_to=2026-12-31'),
    ('/reports/payroll', '?date_from=2026-01-01&date_to=2026-12-31'),
]

for ep, q in reports:
    data = fetch_json(ep, q)
    if data is not None:
        fname = os.path.join('scraped_api', ep.strip('/').replace('/', '_') + '.json')
        with open(fname, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Saved {ep}")

# Fetch checklist for each stage
stages_file = 'scraped_api/admin_stages.json'
with open(stages_file, 'r', encoding='utf-8') as f:
    stages = json.load(f)

stage_checklists = {}
for s in stages:
    s_id = s['id']
    cl = fetch_json(f'/admin/stages/{s_id}/checklist')
    if cl:
        stage_checklists[s_id] = cl
with open('scraped_api/stage_checklists.json', 'w', encoding='utf-8') as f:
    json.dump(stage_checklists, f, ensure_ascii=False, indent=2)
print("Saved stage checklists")

# Fetch full order details for orders
with open('scraped_api/orders.json', 'r', encoding='utf-8') as f:
    orders = json.load(f)

order_details = {}
for o in orders[:10]: # sample 10 detailed orders
    oid = o['id']
    detail = fetch_json(f'/orders/{oid}')
    events = fetch_json(f'/orders/{oid}/events')
    comments = fetch_json(f'/orders/{oid}/comments')
    parts = fetch_json(f'/orders/{oid}/parts')
    payments = fetch_json(f'/orders/{oid}/payments')
    order_details[oid] = {
        'detail': detail,
        'events': events,
        'comments': comments,
        'parts': parts,
        'payments': payments
    }
with open('scraped_api/order_details_sample.json', 'w', encoding='utf-8') as f:
    json.dump(order_details, f, ensure_ascii=False, indent=2)
print("Saved order details sample")
