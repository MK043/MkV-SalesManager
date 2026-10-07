import json
import urllib.request
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Re-read token or get new one
with open('scraped_api/auth_web_me.json', 'r', encoding='utf-8') as f:
    me = json.load(f)
    print("Logged in as:", me)

# Let's read order IDs from scraped_api/orders.json
with open('scraped_api/orders.json', 'r', encoding='utf-8') as f:
    orders_data = json.load(f)

orders = orders_data if isinstance(orders_data, list) else orders_data.get('items', orders_data.get('orders', []))
print(f"Total orders: {len(orders)}")

# Fetch detail for first 5 orders and order events/comments
# We will do this using scrape_api_live.py logic
