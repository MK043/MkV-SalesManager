# -*- coding: utf-8 -*-
import os
import subprocess

lots = [
    {
        'num': 'Варіант 1',
        'lot_id': '42715675',
        'name': 'Kia Carnival 4 (KA4) 2.2D Prestige',
        'year': '2021',
        'mileage': '160 тис. км',
        'color': 'Білий',
        'car_krw': '15.8 млн ₩',
        'car_usd': 12800.0,
        'transfer': 320.0,
        'insurance': 256.0,
        'delivery': 4800.0,
        'commission': 600.0,
        'customs': 6350.0,
        'total': 25126.0,
        'url': 'https://fem.encar.com/cars/detail/42715675'
    },
    {
        'num': 'Варіант 2',
        'lot_id': '42599041',
        'name': 'Kia Carnival 4 (KA4) 2.2D Noblesse',
        'year': '2020',
        'mileage': '166 тис. км',
        'color': 'Чорний',
        'car_krw': '15.99 млн ₩',
        'car_usd': 12950.0,
        'transfer': 324.0,
        'insurance': 259.0,
        'delivery': 4800.0,
        'commission': 600.0,
        'customs': 6500.0,
        'total': 25433.0,
        'url': 'https://fem.encar.com/cars/detail/42599041'
    },
    {
        'num': 'Варіант 3',
        'lot_id': '42827327',
        'name': 'Kia Carnival 4 (KA4) 2.2D Noblesse',
        'year': '2020',
        'mileage': '129 тис. км',
        'color': 'Чорний',
        'car_krw': '16.6 млн ₩',
        'car_usd': 13400.0,
        'transfer': 335.0,
        'insurance': 268.0,
        'delivery': 4800.0,
        'commission': 600.0,
        'customs': 6650.0,
        'total': 26053.0,
        'url': 'https://fem.encar.com/cars/detail/42827327'
    },
    {
        'num': 'Варіант 4',
        'lot_id': '42828060',
        'name': 'Kia Carnival 4 (KA4) 2.2D Prestige',
        'year': '2021',
        'mileage': '154 тис. км',
        'color': 'Чорний',
        'car_krw': '16.8 млн ₩',
        'car_usd': 13550.0,
        'transfer': 339.0,
        'insurance': 271.0,
        'delivery': 4800.0,
        'commission': 600.0,
        'customs': 6550.0,
        'total': 26110.0,
        'url': 'https://fem.encar.com/cars/detail/42828060'
    }
]

html = """<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="utf-8">
<title>Калькуляція вартості авто з Кореї під ключ</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 10mm 10mm 10mm 10mm;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  body {
    background: #ffffff;
    color: #111827;
    margin: 0;
    padding: 0;
    font-size: 11px;
  }

  .header {
    text-align: center;
    border-bottom: 2px solid #ea580c;
    padding-bottom: 8px;
    margin-bottom: 14px;
  }

  .header h1 {
    font-size: 18px;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    color: #0f172a;
    letter-spacing: 0.5px;
  }

  .header p {
    margin: 3px 0 0 0;
    font-size: 11px;
    font-weight: 700;
    color: #ea580c;
  }

  /* Compact Grid for 4 cars */
  .grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .card {
    border: 1.5px solid #ea580c;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  }

  .card-top {
    background: #0f172a;
    color: #ffffff;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-top-title {
    font-size: 12px;
    font-weight: 800;
  }

  .card-top-badge {
    background: #ea580c;
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .card-meta {
    background: #f8fafc;
    padding: 6px 10px;
    border-bottom: 1px solid #e2e8f0;
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    color: #475569;
    font-weight: 600;
  }

  /* Orange table rows like image */
  .tbl {
    width: 100%;
    border-collapse: collapse;
  }

  .tbl td {
    padding: 5.5px 10px;
    font-size: 10.5px;
    border-bottom: 1px solid #fed7aa;
  }

  .tbl tr:nth-child(odd) td {
    background-color: #ffedd5;
  }

  .tbl tr:nth-child(even) td {
    background-color: #fed7aa;
  }

  .tbl td.label {
    font-weight: 700;
    color: #1e293b;
  }

  .tbl td.val {
    font-weight: 800;
    text-align: right;
    color: #000000;
    white-space: nowrap;
  }

  .tbl tr.row-total td {
    background-color: #ea580c !important;
    color: #ffffff !important;
    font-size: 13px !important;
    font-weight: 900 !important;
    padding: 8px 10px !important;
    border-bottom: none;
  }

  .tbl tr.row-total td.val {
    color: #ffffff !important;
  }

  .summary-bar {
    margin-top: 14px;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    overflow: hidden;
  }

  .summary-bar table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10.5px;
  }

  .summary-bar th {
    background: #1e293b;
    color: #ffffff;
    padding: 7px 8px;
    font-size: 10px;
    text-align: left;
  }

  .summary-bar td {
    padding: 6px 8px;
    border-bottom: 1px solid #e2e8f0;
  }

  .summary-bar tr:last-child td {
    border-bottom: none;
  }

  .summary-bar td.final {
    font-weight: 900;
    color: #ea580c;
    font-size: 12px;
  }

  .footer-note {
    text-align: center;
    color: #64748b;
    font-size: 9px;
    margin-top: 8px;
    font-weight: 600;
  }
</style>
</head>
<body>

<div class="header">
  <h1>Розрахунок вартості «Під Ключ» (Україна)</h1>
  <p>Kia Carnival 4-го покоління (2.2 Дизель, 9 місць) з Південної Кореї</p>
</div>

<div class="grid-2x2">
"""

for lot in lots:
    html += f"""
  <div class="card">
    <div class="card-top">
      <span class="card-top-title">{lot['num']}: {lot['name']}</span>
      <span class="card-top-badge">#{lot['lot_id']}</span>
    </div>
    <div class="card-meta">
      <span>Рік: <strong>{lot['year']}</strong> • Пробіг: <strong>{lot['mileage']}</strong></span>
      <span>Колір: <strong>{lot['color']}</strong></span>
    </div>

    <table class="tbl">
      <tr>
        <td class="label">Вартість автомобіля в Кореї:</td>
        <td class="val">${lot['car_usd']:,.2f}</td>
      </tr>
      <tr>
        <td class="label">Переказ коштів (2.5%):</td>
        <td class="val">${lot['transfer']:,.2f}</td>
      </tr>
      <tr>
        <td class="label">Страхівка:</td>
        <td class="val">${lot['insurance']:,.2f}</td>
      </tr>
      <tr>
        <td class="label">Комплекс доставки:</td>
        <td class="val">${lot['delivery']:,.2f}</td>
      </tr>
      <tr>
        <td class="label">Комісія компанії:</td>
        <td class="val">${lot['commission']:,.2f}</td>
      </tr>
      <tr>
        <td class="label">Розмитнення + брокерські послуги:</td>
        <td class="val">${lot['customs']:,.2f}</td>
      </tr>
      <tr class="row-total">
        <td>ВСЬОГО СУМА «ПІД КЛЮЧ»:</td>
        <td class="val">${lot['total']:,.2f}</td>
      </tr>
    </table>
  </div>
"""

html += """
</div>

<!-- Comparison Summary Strip -->
<div class="summary-bar">
  <table>
    <thead>
      <tr>
        <th>Варіант</th>
        <th>ID Encar</th>
        <th>Комплектація</th>
        <th>Рік / Пробіг</th>
        <th>Колір</th>
        <th>Ціна в Кореї</th>
        <th style="text-align: right;">Фінальна ціна під ключ</th>
      </tr>
    </thead>
    <tbody>
"""

for lot in lots:
    html += f"""
      <tr>
        <td><strong>{lot['num']}</strong></td>
        <td><span style="font-family: monospace; font-size: 10px;">#{lot['lot_id']}</span></td>
        <td><strong>{lot['name'].replace('Kia Carnival 4 (KA4) ', '')}</strong></td>
        <td>{lot['year']} р. • {lot['mileage']}</td>
        <td>{lot['color']}</td>
        <td><strong>${lot['car_usd']:,.0f}</strong> ({lot['car_krw']})</td>
        <td style="text-align: right;" class="final">${lot['total']:,.0f}</td>
      </tr>
"""

html += """
    </tbody>
  </table>
</div>

<div class="footer-note">
  * У вартість під ключ включено: авто, експортні документи Кореї, доставку морем та автовозом в Україну, повне розмитнення, брокерські послуги, сертифікацію та супровід.
</div>

</body>
</html>
"""

html_path = "client_table.html"
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

target_pdf = r"C:\Users\Дом\Desktop\Koreya_Pod_Klyuch_Rozrakhunok.pdf"
edge_bin = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_bin):
    edge_bin = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

cmd = [
    edge_bin,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={target_pdf}",
    os.path.abspath(html_path)
]

print("Rendering client PDF...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Exit code:", res.returncode)
if os.path.exists(target_pdf):
    print(f"Created clean 1-page PDF: {target_pdf} ({os.path.getsize(target_pdf)} bytes)")
