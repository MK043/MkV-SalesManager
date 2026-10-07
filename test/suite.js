// Automated Test Suite for MKV Autostand
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE = 'http://localhost:3001';

async function req(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, BASE);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const r = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    r.on('error', reject);
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runTests() {
  console.log('=== STARTING MKV AUTOSTAND VERIFICATION SUITE ===\n');

  // 1. Auth Me
  console.log('Testing 1: /auth/web/me');
  const meRes = await req('GET', '/auth/web/me');
  assert(meRes.status === 200, 'Status is 200');
  assert(meRes.body.full_name === 'Михайло Шевченко', 'Full name is localized to Михайло Шевченко');
  assert(meRes.body.position === 'Власник', 'Position is Власник');

  // 2. Dashboard Today
  console.log('\nTesting 2: /dashboard/today');
  const todayRes = await req('GET', '/dashboard/today');
  assert(todayRes.status === 200, 'Status is 200');
  assert(todayRes.body.money && typeof todayRes.body.money.today_amount === 'number', 'Money object with today_amount');
  assert(Array.isArray(todayRes.body.money.week), '7-day week array present');
  assert(todayRes.body.debts && typeof todayRes.body.debts.total === 'number', 'Debts total present');

  // 3. Orders Pipeline
  console.log('\nTesting 3: /orders/pipeline');
  const pipeRes = await req('GET', '/orders/pipeline');
  assert(pipeRes.status === 200, 'Status is 200');
  assert(Array.isArray(pipeRes.body.stages), 'Pipeline stages array returned');
  assert(pipeRes.body.stages.length >= 8, '8 Workflow stages defined');
  assert(pipeRes.body.stages[0].name === 'Прийомка', 'Stage 1 is Прийомка');

  // 4. Create Order & Lifecycle
  console.log('\nTesting 4: Order Creation & Stage Progression');
  const createRes = await req('POST', '/orders', {
    brand: 'Porsche',
    model: 'Cayenne',
    plate: 'AO 0001 MK',
    customer_name: 'Остапенко Дмитро',
    customer_phone: '+380509990011',
    request_type: 'Слюсарний ремонт',
    work_list: ['Діагностика ходової частини'],
    grand_total: 12000
  });
  assert(createRes.status === 201, 'Order created with 201');
  const newOrderId = createRes.body.id;
  assert(newOrderId > 0, `Order assigned valid ID #${newOrderId}`);
  assert(createRes.body.plate === 'AO 0001 MK', 'Plate matches Ukrainian format');

  // Advance stage
  console.log(`\nTesting 5: Advance stage on order #${newOrderId}`);
  const advRes = await req('POST', `/orders/${newOrderId}/confirm-review`);
  assert(advRes.status === 200, 'Advance stage returned 200');
  const orderDetail = await req('GET', `/orders/${newOrderId}`);
  assert(orderDetail.body.current_stage_id !== createRes.body.current_stage_id, 'Stage transitioned successfully');

  // Add payment
  console.log(`\nTesting 6: Record Payment for order #${newOrderId}`);
  const payRes = await req('POST', `/orders/${newOrderId}/payments`, {
    amount: 5000,
    method: 'cash',
    note: 'Авансовий платіж'
  });
  assert(payRes.status === 201, 'Payment recorded with 201');
  assert(payRes.body.paid_total === 5000, 'Paid total reflects 5000 ₴');

  // Check cashflow
  console.log('\nTesting 7: Cashflow updated');
  const cashRes = await req('GET', '/cash/flow');
  assert(cashRes.status === 200, 'Cashflow status is 200');
  assert(cashRes.body.total_in > 0, 'Total cash in > 0');

  // 8. Bookings & 1-Click Convert
  console.log('\nTesting 8: Bookings creation and conversion');
  const bookRes = await req('POST', '/bookings', {
    customer_name: 'Кравченко Андрій',
    customer_phone: '+380671234567',
    car_brand: 'Audi',
    car_model: 'Q7',
    visit_date: '2026-10-10',
    visit_time: '14:00',
    service: 'Планове ТО'
  });
  assert(bookRes.status === 201, 'Booking created');
  const bookingId = bookRes.body.id;

  const convRes = await req('POST', `/bookings/${bookingId}/convert`);
  assert(convRes.status === 200 && convRes.body.order_id, `Booking converted to order #${convRes.body.order_id}`);

  // 9. Warehouse stock and waybills
  console.log('\nTesting 9: Warehouse operations');
  const whItems = await req('GET', '/warehouse/items');
  assert(Array.isArray(whItems.body) && whItems.body.length > 0, 'Warehouse items list active');

  const whDocRes = await req('POST', '/warehouse/docs', {
    doc_type: 'receipt',
    total_amount: 15000,
    comment: 'Тестова прибуткова накладна'
  });
  assert(whDocRes.status === 201, 'Warehouse waybill created');
  const docId = whDocRes.body.id;

  const postDocRes = await req('POST', `/warehouse/docs/${docId}/post`);
  assert(postDocRes.status === 200 && postDocRes.body.doc.status === 'posted', 'Warehouse waybill posted');

  // 10. Audit Log Verification
  console.log('\nTesting 10: Audit Trail Verification');
  const auditRes = await req('GET', '/audit/actions');
  assert(auditRes.status === 200, 'Audit endpoint returned 200');
  assert(auditRes.body.length >= 4, 'Audit actions recorded created order, payments, and waybills');

  // 11. Static Build Assets
  console.log('\nTesting 11: Production static distribution');
  const distHtml = path.join(__dirname, '..', 'dist', 'index.html');
  assert(fs.existsSync(distHtml), 'dist/index.html exists');
  const logoPath = path.join(__dirname, '..', 'dist', 'brand', 'logo.png');
  assert(fs.existsSync(logoPath), 'dist/brand/logo.png brand asset exists');

  console.log('\n=================================================');
  console.log('🎉 ALL 11 TEST SUITES PASSED FLAWLESSLY! 100% OPERATIONAL.');
  console.log('=================================================\n');
}

runTests().catch(err => {
  console.error('Test suite runner error:', err);
  process.exit(1);
});
