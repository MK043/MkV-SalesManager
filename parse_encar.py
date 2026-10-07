import urllib.request
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

car_ids = ['42827327', '42715675', '42726089', '42599041', '42828060']

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
}

results = {}

for cid in car_ids:
    url = f'https://fem.encar.com/cars/detail/{cid}'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
        idx = html.find('__PRELOADED_STATE__')
        if idx != -1:
            end_idx = html.find('</script>', idx)
            raw = html[idx + len('__PRELOADED_STATE__ = '):end_idx].strip()
            if raw.endswith(';'):
                raw = raw[:-1]
            data = json.loads(raw)
            base = data.get('cars', {}).get('base', {})
            cat = base.get('category', {})
            adv = base.get('advertisement', {})
            spec = base.get('spec', {})
            photos = base.get('photos', [])
            thumb = photos[0].get('path') if photos else None
            
            info = {
                'id': cid,
                'url': url,
                'model': cat.get('modelName'),
                'grade': cat.get('gradeName'),
                'grade_en': cat.get('gradeEnglishName'),
                'year_month': cat.get('yearMonth'),
                'form_year': cat.get('formYear'),
                'price_man_won': adv.get('price'),
                'price_won': (adv.get('price') or 0) * 10000,
                'mileage': spec.get('mileage'),
                'displacement': spec.get('displacement'),
                'fuel': spec.get('fuelName'),
                'color': spec.get('colorName'),
                'seats': spec.get('seatCount'),
                'thumb': f"https://ci.encar.com{thumb}" if thumb else None
            }
            results[cid] = info
            print(f"Loaded {cid}: {info['model']} {info['grade']} ({info['year_month']}) | {info['price_man_won']} man-won ({info['price_won']} KRW) | {info['mileage']} km | {info['displacement']} cc")
        else:
            print(f"No state found for {cid}")
    except Exception as e:
        print(f"Error {cid}: {e}")

with open('encar_cars.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Saved all car data to encar_cars.json")
