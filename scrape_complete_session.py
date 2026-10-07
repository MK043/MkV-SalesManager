import urllib.request
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('scraped_data_full', exist_ok=True)

# 1. Visitor ticket
req = urllib.request.Request(
    'https://avto.demo.aivinity.ru/demo/visitor',
    data=json.dumps({'source': 'landing'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp = urllib.request.urlopen(req)
ticket = json.loads(resp.read().decode('utf-8'))['ticket']
print("Ticket:", ticket)

# 2. Enter
req_enter = urllib.request.Request(
    'https://avto-panel.demo.aivinity.ru/demo/enter',
    data=json.dumps({'ticket': ticket, 'role': 'owner', 'client': 'panel'}).encode('utf-8'),
    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
)
resp_enter = urllib.request.urlopen(req_enter)
enter_res = json.loads(resp_enter.read().decode('utf-8'))
token = enter_res['access_token']
print("Token:", token[:20])

def api_get(endpoint, params=''):
    url = f'https://avto-panel.demo.aivinity.ru{endpoint}{params}'
    req = urllib.request.Request(url, headers={
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    })
    try:
        r = urllib.request.urlopen(req)
        return json.loads(r.read().decode('utf-8'))
    except Exception as e:
        print(f"Error {endpoint}{params}: {e}")
        return None

def save_json(fname, data):
    path = os.path.join('scraped_data_full', fname)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Scrape config
save_json('demo_config.json', api_get('/demo/config'))
save_json('auth_me.json', api_get('/auth/web/me'))
save_json('dashboard_today.json', api_get('/dashboard/today'))
save_json('orders_pipeline.json', api_get('/orders/pipeline'))
save_json('orders_overview_stats.json', api_get('/orders/overview-stats'))
save_json('orders_review_queue.json', api_get('/orders/review-queue'))
save_json('orders_parking.json', api_get('/orders/parking'))
save_json('bookings.json', api_get('/bookings'))
save_json('customers_registry.json', api_get('/customers/registry'))
save_json('warehouse_items.json', api_get('/warehouse/items'))
save_json('warehouse_docs.json', api_get('/warehouse/docs'))
save_json('warehouse_warehouses.json', api_get('/warehouse/warehouses'))
save_json('cash_flow.json', api_get('/cash/flow'))
save_json('cash_orders.json', api_get('/cash/orders'))
save_json('admin_users.json', api_get('/admin/users'))
save_json('admin_roles.json', api_get('/admin/roles'))
save_json('admin_stages.json', api_get('/admin/stages'))
save_json('clients_stage_positions.json', api_get('/clients/stage-positions'))
save_json('clients_payroll_settings.json', api_get('/clients/payroll-settings'))
save_json('company_positions.json', api_get('/company/positions'))
save_json('work_items.json', api_get('/work-items'))
save_json('company_tasks.json', api_get('/company-tasks'))
save_json('reports_orders_registry.json', api_get('/reports/orders-registry', '?date_from=2026-01-01&date_to=2026-12-31'))
save_json('reports_debts.json', api_get('/reports/debts'))
save_json('reports_executors.json', api_get('/reports/executors', '?date_from=2026-01-01&date_to=2026-12-31'))
save_json('reports_managers.json', api_get('/reports/managers', '?date_from=2026-01-01&date_to=2026-12-31'))
save_json('reports_payroll.json', api_get('/reports/payroll', '?date_from=2026-01-01&date_to=2026-12-31'))
save_json('shifts_active.json', api_get('/shifts/active'))
save_json('shifts_pending.json', api_get('/shifts/pending'))
save_json('audit_actions.json', api_get('/audit/actions'))

# Stages checklist
stages = api_get('/admin/stages') or []
stage_checklists = {}
for s in stages:
    s_id = s['id']
    cl = api_get(f'/admin/stages/{s_id}/checklist')
    if cl is not None:
        stage_checklists[s_id] = cl
save_json('stage_checklists.json', stage_checklists)

# Orders and sub-resources
orders = api_get('/orders') or []
save_json('orders.json', orders)

order_sub = {}
for o in orders:
    oid = o['id']
    detail = api_get(f'/orders/{oid}')
    events = api_get(f'/orders/{oid}/events')
    comments = api_get(f'/orders/{oid}/comments')
    parts = api_get(f'/orders/{oid}/parts')
    payments = api_get(f'/orders/{oid}/payments')
    docs = api_get(f'/orders/{oid}/documents')
    order_sub[oid] = {
        'detail': detail,
        'events': events,
        'comments': comments,
        'parts': parts,
        'payments': payments,
        'docs': docs
    }
save_json('orders_full_subresources.json', order_sub)

# Customer details
customers = api_get('/customers/registry') or []
cust_details = {}
for c in customers:
    cid = c['id']
    det = api_get(f'/customers/{cid}/detail')
    if det:
        cust_details[cid] = det
save_json('customers_details.json', cust_details)

# Company tasks subresources
tasks = api_get('/company-tasks') or []
task_subs = {}
for t in tasks:
    tid = t['id']
    comm = api_get(f'/company-tasks/{tid}/comments')
    sub = api_get(f'/company-tasks/{tid}/subtasks')
    task_subs[tid] = {'comments': comm, 'subtasks': sub}
save_json('company_tasks_subresources.json', task_subs)

# Warehouse docs details
wdocs = api_get('/warehouse/docs') or []
wdoc_details = {}
for d in wdocs:
    did = d['id']
    det = api_get(f'/warehouse/docs/{did}')
    if det:
        wdoc_details[did] = det
save_json('warehouse_docs_details.json', wdoc_details)

print("COMPLETE DATA SCRAPING FINISHED!")
