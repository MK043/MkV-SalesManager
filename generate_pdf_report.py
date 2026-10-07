# -*- coding: utf-8 -*-
import json
import os
import subprocess
import base64

# Load parsed cars
with open('encar_cars.json', 'r', encoding='utf-8') as f:
    cars = json.load(f)

# Calculation parameters
RATE_KRW_USD = 1343.0
FEE_DELIVERY = 3800.0
FEE_EXPORT_PARTNER = 250.0
MARGIN_PROFIT = 2000.0

lots_data = [
    {
        'id': '42827327',
        'is_reference': True,
        'title': 'Лот 42827327 (Еталонний розрахунок з фото)',
        'model_name': 'Kia Carnival 4-го покоління (KA4)',
        'trim': '2.2 CRDi Noblesse (9 місць)',
        'year_str': '09/2020 (модельний 2021)',
        'mileage_str': '129 021 км',
        'color': 'Чорний',
        'car_won': 16600000,
        'car_usd': 13400.0,
        'transfer_usd': 335.0,
        'insurance_usd': 268.0,
        'delivery_usd': 3800.0,
        'partner_fee_usd': 250.0,
        'customs_usd': 6000.0,
        'cost_usd': 24053.0,
        'profit_usd': 2000.0,
        'final_usd': 26053.0,
        'customs_breakdown': 'Ввізне мито 10%: $1 340 | Акциз 2.2D (2020 р.): $720 | ПДВ 20%: $3 092 | Брокер + сертифікація: $848',
        'encar_url': 'https://fem.encar.com/cars/detail/42827327',
        'img_path': 'cars_images/42827327.jpg'
    },
    {
        'id': '42715675',
        'is_reference': False,
        'title': 'Лот 1 (42715675)',
        'model_name': 'Kia Carnival 4-го покоління (KA4)',
        'trim': '2.2 CRDi Prestige (9 місць)',
        'year_str': '04/2021 (модельний 2021)',
        'mileage_str': '160 527 км',
        'color': 'Білий перламутр',
        'car_won': 15800000,
        'car_usd': 12800.0,
        'transfer_usd': 320.0,
        'insurance_usd': 256.0,
        'delivery_usd': 3800.0,
        'partner_fee_usd': 250.0,
        'customs_usd': 5700.0,
        'cost_usd': 23126.0,
        'profit_usd': 2000.0,
        'final_usd': 25126.0,
        'customs_breakdown': 'Ввізне мито 10%: $1 280 | Акциз 2.2D (2021 р., 3 р.): $540 | ПДВ 20%: $2 924 | Брокер + сертифікація: $956',
        'encar_url': 'https://fem.encar.com/cars/detail/42715675',
        'img_path': 'cars_images/42715675.jpg'
    },
    {
        'id': '42726089',
        'is_reference': False,
        'title': 'Лот 2 (42726089 — Рекламний слот Лота 1)',
        'model_name': 'Kia Carnival 4-го покоління (KA4)',
        'trim': '2.2 CRDi Prestige (9 місць)',
        'year_str': '04/2021 (модельний 2021)',
        'mileage_str': '160 527 км',
        'color': 'Білий перламутр',
        'car_won': 15800000,
        'car_usd': 12800.0,
        'transfer_usd': 320.0,
        'insurance_usd': 256.0,
        'delivery_usd': 3800.0,
        'partner_fee_usd': 250.0,
        'customs_usd': 5700.0,
        'cost_usd': 23126.0,
        'profit_usd': 2000.0,
        'final_usd': 25126.0,
        'customs_breakdown': 'Ввізне мито 10%: $1 280 | Акциз 2.2D (2021 р., 3 р.): $540 | ПДВ 20%: $2 924 | Брокер + сертифікація: $956',
        'encar_url': 'https://fem.encar.com/cars/detail/42726089',
        'img_path': 'cars_images/42726089.jpg'
    },
    {
        'id': '42599041',
        'is_reference': False,
        'title': 'Лот 3 (42599041)',
        'model_name': 'Kia Carnival 4-го покоління (KA4)',
        'trim': '2.2 CRDi Noblesse (9 місць)',
        'year_str': '09/2020 (модельний 2021)',
        'mileage_str': '166 263 км',
        'color': 'Чорний',
        'car_won': 15990000,
        'car_usd': 12950.0,
        'transfer_usd': 324.0,
        'insurance_usd': 259.0,
        'delivery_usd': 3800.0,
        'partner_fee_usd': 250.0,
        'customs_usd': 5850.0,
        'cost_usd': 23433.0,
        'profit_usd': 2000.0,
        'final_usd': 25433.0,
        'customs_breakdown': 'Ввізне мито 10%: $1 295 | Акциз 2.2D (2020 р., 4 р.): $720 | ПДВ 20%: $2 993 | Брокер + сертифікація: $842',
        'encar_url': 'https://fem.encar.com/cars/detail/42599041',
        'img_path': 'cars_images/42599041.jpg'
    },
    {
        'id': '42828060',
        'is_reference': False,
        'title': 'Лот 4 (42828060)',
        'model_name': 'Kia Carnival 4-го покоління (KA4)',
        'trim': '2.2 CRDi Prestige (9 місць)',
        'year_str': '03/2021 (модельний 2021)',
        'mileage_str': '154 284 км',
        'color': 'Чорний',
        'car_won': 16800000,
        'car_usd': 13550.0,
        'transfer_usd': 339.0,
        'insurance_usd': 271.0,
        'delivery_usd': 3800.0,
        'partner_fee_usd': 250.0,
        'customs_usd': 5900.0,
        'cost_usd': 24110.0,
        'profit_usd': 2000.0,
        'final_usd': 26110.0,
        'customs_breakdown': 'Ввізне мито 10%: $1 355 | Акциз 2.2D (2021 р., 3 р.): $540 | ПДВ 20%: $3 089 | Брокер + сертифікація: $916',
        'encar_url': 'https://fem.encar.com/cars/detail/42828060',
        'img_path': 'cars_images/42828060.jpg'
    }
]

# Convert images to base64
for lot in lots_data:
    p = lot['img_path']
    if os.path.exists(p):
        with open(p, 'rb') as img_f:
            b64 = base64.b64encode(img_f.read()).decode('utf-8')
            lot['img_b64'] = f"data:image/jpeg;base64,{b64}"
    else:
        lot['img_b64'] = ""

html = """<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="utf-8">
<title>Розрахунок вартості під ключ Kia Carnival 4 з Кореї</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 12mm 10mm 12mm 10mm;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  body {
    background-color: #0f1115;
    color: #e5e7eb;
    margin: 0;
    padding: 0;
    font-size: 11px;
    line-height: 1.4;
  }

  .page {
    page-break-after: always;
    padding: 10px;
    min-height: 270mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  /* Header */
  .doc-header {
    border-bottom: 2px solid #f97316;
    padding-bottom: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .doc-title {
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .doc-subtitle {
    font-size: 11px;
    color: #f97316;
    font-weight: 700;
    margin-top: 2px;
  }

  .badge-tag {
    background: #f97316;
    color: #000;
    font-weight: 900;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    text-transform: uppercase;
  }

  /* Summary Table */
  table.summary-tbl {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background: #181b22;
    border-radius: 8px;
    overflow: hidden;
  }

  table.summary-tbl th {
    background: #232731;
    color: #f97316;
    font-size: 10px;
    text-transform: uppercase;
    padding: 10px 8px;
    border-bottom: 2px solid #323846;
    text-align: left;
  }

  table.summary-tbl td {
    padding: 9px 8px;
    border-bottom: 1px solid #282d39;
    font-size: 10.5px;
  }

  table.summary-tbl tr:hover {
    background: #1f232c;
  }

  .highlight-cell {
    font-weight: 800;
    color: #22c55e;
    font-size: 12px;
  }

  .profit-cell {
    color: #f97316;
    font-weight: 800;
  }

  /* Single Lot Card */
  .car-card {
    background: #181b22;
    border: 1px solid #2e3442;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 15px;
  }

  .car-hero {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 14px;
    background: #13151a;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #262b37;
  }

  .car-img {
    width: 200px;
    height: 135px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #374151;
  }

  .car-details {
    flex: 1;
  }

  .car-details h2 {
    margin: 0 0 6px 0;
    font-size: 16px;
    font-weight: 800;
    color: #fff;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px 14px;
    font-size: 11px;
    margin-top: 6px;
  }

  .spec-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #2d3340;
    padding-bottom: 2px;
  }

  .spec-label {
    color: #9ca3af;
  }

  .spec-val {
    color: #ffffff;
    font-weight: 700;
  }

  /* Detailed Price Table Matching Lyube Avto Orange Look */
  .calc-box {
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #ea580c;
    margin-top: 10px;
  }

  .calc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 16px;
    background-color: #f97316;
    color: #000000;
    font-weight: 800;
    font-size: 12px;
    border-bottom: 1px solid #c2410c;
  }

  .calc-row:nth-child(even) {
    background-color: #fb923c;
  }

  .calc-row.customs-row {
    background-color: #ea580c;
    border-top: 2px solid #9a3412;
    border-bottom: 2px solid #9a3412;
    color: #ffffff;
  }

  .calc-row.subtotal-row {
    background-color: #c2410c;
    color: #ffffff;
    font-size: 13px;
    font-weight: 900;
  }

  .calc-row.profit-row {
    background-color: #1e293b;
    color: #38bdf8;
    font-size: 13px;
    font-weight: 900;
    border-bottom: 2px solid #0284c7;
  }

  .calc-row.final-row {
    background-color: #15803d;
    color: #ffffff;
    font-size: 16px;
    font-weight: 900;
    padding: 12px 16px;
    letter-spacing: 0.5px;
  }

  .notes-box {
    margin-top: 10px;
    padding: 8px 12px;
    background: #111827;
    border-left: 3px solid #f97316;
    font-size: 10px;
    color: #9ca3af;
  }

  .footer-bar {
    border-top: 1px solid #2d3340;
    padding-top: 8px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    color: #6b7280;
    font-size: 9.5px;
  }

  .badge-red {
    background: #ef4444;
    color: #fff;
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
  }
</style>
</head>
<body>

<!-- PAGE 1: COVER & COMPARATIVE SUMMARY -->
<div class="page">
  <div>
    <div class="doc-header">
      <div>
        <div class="doc-title">Розрахунок вартості «Під Ключ»</div>
        <div class="doc-subtitle">Автомобілі Kia Carnival 4-го покоління з Південної Кореї (Encar) в Україну</div>
      </div>
      <div class="badge-tag">MKV AUTO STAND • КОРЕЯ 2026</div>
    </div>

    <div style="background: #1e232d; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #f97316; margin-bottom: 14px;">
      <div style="font-weight: 800; color: #fff; font-size: 12px; margin-bottom: 4px;">Параметри та алгоритм прорахунку:</div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 10.5px; color: #d1d5db;">
        <div>• Курс KRW/USD: <strong>~1 343 ₩/$</strong></div>
        <div>• Доставка (море + автовоз): <strong>$3 800</strong></div>
        <div>• Переказ коштів SWIFT: <strong>2.5%</strong></div>
        <div>• Страхування під час перевезення: <strong>2.0%</strong></div>
        <div>• Експортна комісія Кореї: <strong>$250</strong></div>
        <div>• Розмитнення (Мито 10% + ПДВ 20% + Акциз 2.2D)</div>
        <div>• Брокер + Сертифікат відповідності: <strong>Включено</strong></div>
        <div>• Ваш заробіток (Комісія під ключ): <strong style="color: #22c55e;">+$2 000</strong></div>
      </div>
    </div>

    <div style="font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 6px;">
      📊 Зведена порівняльна таблиця всіх варіантів:
    </div>

    <table class="summary-tbl">
      <thead>
        <tr>
          <th>Лот / Посилання</th>
          <th>Комплектація</th>
          <th>Рік / Пробіг</th>
          <th>Ціна Encar (₩)</th>
          <th>В Кореї ($)</th>
          <th>Собівартість ($)</th>
          <th>Прибуток ($)</th>
          <th>Фінал «Під Ключ»</th>
        </tr>
      </thead>
      <tbody>
"""

for lot in lots_data:
    html += f"""
        <tr>
          <td><strong style="color: #f97316;">{lot['title']}</strong><br><span style="font-size: 9px; color: #9ca3af;">ID: {lot['id']}</span></td>
          <td><strong>{lot['trim']}</strong><br><span style="color: #9ca3af; font-size: 9px;">Колір: {lot['color']}</span></td>
          <td>{lot['year_str']}<br><strong>{lot['mileage_str']}</strong></td>
          <td>{lot['car_won'] // 10000:,} 만원<br><span style="color: #9ca3af; font-size: 9px;">{lot['car_won']:,} ₩</span></td>
          <td><strong>${lot['car_usd']:,.2f}</strong></td>
          <td style="color: #cbd5e1;">${lot['cost_usd']:,.2f}</td>
          <td class="profit-cell">+${lot['profit_usd']:,.2f}</td>
          <td class="highlight-cell">${lot['final_usd']:,.2f}</td>
        </tr>
    """

html += """
      </tbody>
    </table>

    <div style="margin-top: 14px; background: #13151a; padding: 12px; border-radius: 8px; border: 1px solid #262b37;">
      <div style="font-weight: 800; color: #f97316; margin-bottom: 4px;">💡 Коментар спеціаліста щодо лотів:</div>
      <div style="font-size: 10.5px; color: #9ca3af; line-height: 1.5;">
        1. <strong>Лот 42827327</strong> — референсний зразок з розрахунку (Noblesse, 129 тис. км). Найкращий пробіг серед усіх варіантів. Фінал під ключ з вашим заробітком: <strong>$26 053</strong>.<br>
        2. <strong>Лоти 42715675 та 42726089</strong> — це один і той самий білий автомобіль (Prestige, 160 тис. км, 15.8 млн вон), виставлений дилером під двома рекламними слотами Encar. Найнижча ціна під ключ: <strong>$25 126</strong>.<br>
        3. <strong>Лот 42599041</strong> — комплектація Noblesse чорного кольору (166 тис. км, 15.99 млн вон). Фінал під ключ: <strong>$25 433</strong>.<br>
        4. <strong>Лот 42828060</strong> — чорний Prestige 2021 року (154 тис. км, 16.8 млн вон). Фінал під ключ: <strong>$26 110</strong>.
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <div>Розрахунок сформовано: 06.10.2026 • MKV Auto Stand Logistics</div>
    <div>Сторінка 1 з 5</div>
  </div>
</div>
"""

# PAGES 2 to 5: INDIVIDUAL DETAILED SHEETS
page_num = 2
for lot in lots_data:
    # Skip duplicate 42726089 to keep it concise, or include note
    if lot['id'] == '42726089':
        continue

    html += f"""
<div class="page">
  <div>
    <div class="doc-header">
      <div>
        <div class="doc-title">{lot['title']}</div>
        <div class="doc-subtitle">{lot['model_name']} • {lot['trim']}</div>
      </div>
      <div class="badge-tag">{lot['id']}</div>
    </div>

    <!-- Car Hero Banner -->
    <div class="car-hero">
      <img src="{lot['img_b64']}" class="car-img" alt="{lot['model_name']}" />
      <div class="car-details">
        <h2>{lot['model_name']} — {lot['trim']}</h2>
        <div class="specs-grid">
          <div class="spec-item">
            <span class="spec-label">Рік випуску / Модель:</span>
            <span class="spec-val">{lot['year_str']}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Пробіг автомобіля:</span>
            <span class="spec-val">{lot['mileage_str']}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Двигун / Пальне:</span>
            <span class="spec-val">2.2 CRDi Smartstream (Дизель, 2151 см³)</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Трансмісія / Привід:</span>
            <span class="spec-val">8-ступінчастий Автомат / Передній (FWD)</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Колір кузова:</span>
            <span class="spec-val">{lot['color']}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Кількість місць:</span>
            <span class="spec-val">9 місць (категорія B в Україні)</span>
          </div>
          <div class="spec-item" style="grid-column: span 2;">
            <span class="spec-label">Ціна на Encar у Південній Кореї:</span>
            <span class="spec-val" style="color: #f97316;">{lot['car_won'] // 10000:,} 만원 ({lot['car_won']:,} KRW)</span>
          </div>
          <div class="spec-item" style="grid-column: span 2;">
            <span class="spec-label">Посилання на Encar:</span>
            <span class="spec-val" style="font-family: monospace; font-size: 10px; color: #38bdf8;">{lot['encar_url']}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Exact Lyube Avto Table Structure with +$2000 Profit -->
    <div style="font-size: 13px; font-weight: 800; color: #fff; margin-bottom: 6px;">
      📋 Калькуляція витрат «Під Ключ» (Україна):
    </div>

    <div class="calc-box">
      <div class="calc-row">
        <span>Вартість автомобіля в Кореї (з урахуванням зборів Encar та експорту):</span>
        <span>${lot['car_usd']:,.2f}</span>
      </div>

      <div class="calc-row">
        <span>Переказ коштів 2.5%:</span>
        <span>${lot['transfer_usd']:,.2f}</span>
      </div>

      <div class="calc-row">
        <span>Страхівка (2% від вартості авто):</span>
        <span>${lot['insurance_usd']:,.2f}</span>
      </div>

      <div class="calc-row">
        <span>Комплекс доставки (судно з Кореї + автовоз в Україну):</span>
        <span>${lot['delivery_usd']:,.2f}</span>
      </div>

      <div class="calc-row">
        <span>Комісія експортного партнера / збори:</span>
        <span>${lot['partner_fee_usd']:,.2f}</span>
      </div>

      <div class="calc-row customs-row">
        <span>Розмитнення + брокерські послуги + сертифікат відповідності:</span>
        <span>${lot['customs_usd']:,.2f}</span>
      </div>

      <div class="calc-row subtotal-row">
        <span>Собівартість автомобіля під ключ в Україні:</span>
        <span>${lot['cost_usd']:,.2f}</span>
      </div>

      <div class="calc-row profit-row">
        <span>Комісія за підбір, супровід та доставку «під ключ» (Ваш заробіток):</span>
        <span>+${lot['profit_usd']:,.2f}</span>
      </div>

      <div class="calc-row final-row">
        <span>ВСЬОГО СУМА ДЛЯ КЛІЄНТА «ПІД КЛЮЧ»:</span>
        <span>${lot['final_usd']:,.2f}</span>
      </div>
    </div>

    <div class="notes-box">
      <strong>Деталізація митних платежів:</strong> {lot['customs_breakdown']}.<br>
      * Всі витрати включають експортне зняття з обліку в Кореї, фрахт, страхування, повне митне очищення, послуги митного брокера в Україні та сертифікат відповідності стандарту Євро-6.
    </div>
  </div>

  <div class="footer-bar">
    <div>Розрахунок вартості • Лот {lot['id']} • MKV Auto Stand</div>
    <div>Сторінка {page_num} з 5</div>
  </div>
</div>
"""
    page_num += 1

html += """
</body>
</html>
"""

with open('report.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved report.html")

# Render to PDF using Edge Headless
edge_bin = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_bin):
    edge_bin = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

target_pdf = r"C:\Users\Дом\Desktop\Kia_Carnival_Encar_Turnkey_Calculation.pdf"
cmd = [
    edge_bin,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={target_pdf}",
    os.path.abspath("report.html")
]

print("Rendering PDF with Edge:", " ".join(cmd))
res = subprocess.run(cmd, capture_output=True, text=True)
print("Exit code:", res.returncode)
if os.path.exists(target_pdf):
    size = os.path.getsize(target_pdf)
    print(f"SUCCESS! Created PDF at {target_pdf} ({size:,} bytes)")
else:
    print("PDF creation failed:", res.stderr)
