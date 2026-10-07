import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open('encar_cars.json', 'r', encoding='utf-8') as f:
    cars = json.load(f)

for cid in ['42827327', '42715675', '42726089', '42599041', '42828060']:
    c = cars.get(cid, {})
    print(f"=== LOT ID: {cid} ===")
    print(f"Model: {c.get('model')} | Trim: {c.get('grade')} ({c.get('grade_en')})")
    print(f"Year/Month: {c.get('year_month')} | Model Year: {c.get('form_year')}")
    print(f"Price: {c.get('price_man_won')} 만원 ({c.get('price_won'):,} KRW)")
    print(f"Mileage: {c.get('mileage'):,} km")
    print(f"Engine: {c.get('displacement')} cc ({c.get('fuel')})")
    print(f"Color: {c.get('color')} | Seats: {c.get('seats')}")
    print(f"URL: {c.get('url')}")
    print(f"Photo: {c.get('thumb')}\n")
