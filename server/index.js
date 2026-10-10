import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const DB_FILE = path.join(__dirname, 'database.json');
const LOCALIZED_DIR = path.join(__dirname, '..', 'data_localized');

// Load or initialize Database
let db = {};

function loadSeed(filename) {
  const p = path.join(LOCALIZED_DIR, filename);
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, 'utf-8'));
    } catch (e) {
      console.error(`Error loading seed ${filename}:`, e);
    }
  }
  return null;
}

function initDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      console.log('Database loaded from disk.');
      return;
    } catch (e) {
      console.error('Error reading existing database.json, re-seeding...', e);
    }
  }

  console.log('Seeding initial localized database...');
  db = {
    authMe: loadSeed('auth_me.json') || {
      id: 9225,
      company_id: 842,
      role_id: 6706,
      full_name: 'Михайло Шевченко',
      web_login: 'owner',
      position: 'Власник',
      ui_theme: 'dark',
      permissions: ['*'],
      is_previewing: false,
      preview_as: null
    },
    stages: loadSeed('admin_stages.json') || [],
    roles: loadSeed('admin_roles.json') || [],
    users: loadSeed('admin_users.json') || [],
    stagePositions: loadSeed('clients_stage_positions.json') || [],
    payrollSettings: loadSeed('clients_payroll_settings.json') || {},
    positions: loadSeed('company_positions.json') || [],
    workItems: loadSeed('work_items.json') || [],
    orders: loadSeed('orders.json') || [],
    orderSubresources: loadSeed('orders_full_subresources.json') || {},
    bookings: loadSeed('bookings.json') || [],
    customers: loadSeed('customers_registry.json') || [],
    customerDetails: loadSeed('customers_details.json') || {},
    warehouseItems: loadSeed('warehouse_items.json') || [],
    warehouseDocs: loadSeed('warehouse_docs.json') || [],
    warehouseDocDetails: loadSeed('warehouse_docs_details.json') || {},
    warehouses: loadSeed('warehouse_warehouses.json') || [],
    cashOrders: loadSeed('cash_orders.json') || [],
    companyTasks: loadSeed('company_tasks.json') || [],
    companyTaskSubresources: loadSeed('company_tasks_subresources.json') || {},
    stageChecklists: loadSeed('stage_checklists.json') || {},
    shiftsActive: loadSeed('shifts_active.json') || [],
    shiftsPending: loadSeed('shifts_pending.json') || [],
    auditActions: loadSeed('audit_actions.json') || []
  };

  saveDatabase();
  console.log('Database initialized successfully.');
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving database:', e);
  }
}

function logAudit(action, description, orderId = null) {
  const item = {
    id: Date.now(),
    user_name: db.authMe.full_name,
    action: action,
    description: description,
    order_id: orderId,
    created_at: new Date().toISOString()
  };
  db.auditActions.unshift(item);
  saveDatabase();
}

initDatabase();

// 1. Auth endpoints
app.get('/auth/web/me', (req, res) => {
  res.json(db.authMe);
});
app.post('/auth/web/login', (req, res) => {
  res.json({ access_token: 'mkv-token-active', user: db.authMe });
});
app.post('/auth/web/logout', (req, res) => {
  res.json({ ok: true });
});

app.post('/auth/web/switch-user', (req, res) => {
  const { user_id, role_name } = req.body;
  let targetUser = null;
  if (user_id) {
    targetUser = db.users.find(u => u.id === Number(user_id));
  } else if (role_name) {
    targetUser = db.users.find(u => 
      (u.position && u.position.toLowerCase().includes(role_name.toLowerCase())) ||
      (u.role_name && u.role_name.toLowerCase().includes(role_name.toLowerCase()))
    );
  }

  if (!targetUser) {
    targetUser = db.users.find(u => u.position === 'Власник') || db.users[0];
  }

  const role = db.roles.find(r => r.id === targetUser.role_id) || {
    id: targetUser.role_id,
    permissions: targetUser.position === 'Власник' ? ['*'] : ['orders.read', 'checklist.update', 'shifts.self', 'tasks.read', 'tasks.update']
  };

  db.authMe = {
    id: targetUser.id,
    company_id: targetUser.company_id || 842,
    role_id: targetUser.role_id,
    full_name: targetUser.full_name,
    web_login: targetUser.web_login || null,
    position: targetUser.position,
    role_name: targetUser.role_name || targetUser.position,
    ui_theme: db.authMe?.ui_theme || 'dark',
    permissions: role.permissions || ['*'],
    is_previewing: targetUser.position !== 'Власник',
    preview_as: targetUser.position !== 'Власник' ? targetUser.id : null
  };

  logAudit('switch_user', `Перемкнув активний сеанс на: ${targetUser.full_name} (${targetUser.position})`);
  saveDatabase();
  res.json({ ok: true, user: db.authMe });
});

app.post('/users/preview-as', (req, res) => {
  const userId = req.body.user_id || req.body.role_id;
  const targetUser = db.users.find(u => u.id === Number(userId)) || db.users[0];
  db.authMe = {
    ...db.authMe,
    id: targetUser.id,
    full_name: targetUser.full_name,
    position: targetUser.position,
    role_name: targetUser.role_name || targetUser.position,
    is_previewing: true,
    preview_as: targetUser.id
  };
  saveDatabase();
  res.json({ ok: true, user: db.authMe });
});

app.post('/auth/web/reset-user', (req, res) => {
  const owner = db.users.find(u => u.position === 'Власник') || db.users[0];
  db.authMe = {
    id: owner.id,
    company_id: owner.company_id || 842,
    role_id: owner.role_id,
    full_name: owner.full_name,
    web_login: 'owner',
    position: 'Власник',
    role_name: 'Власник',
    ui_theme: 'dark',
    permissions: ['*'],
    is_previewing: false,
    preview_as: null
  };
  logAudit('switch_user', `Повернувся до головного облікового запису Власника (${owner.full_name})`);
  saveDatabase();
  res.json({ ok: true, user: db.authMe });
});


// 2. Dashboard Today
app.get('/dashboard/today', (req, res) => {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  
  // Calculate today payments from cashOrders
  const todayPayments = db.cashOrders.filter(co => co.direction === 'in');
  const todayAmount = todayPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  
  // Debts from orders
  const debtOrders = db.orders.filter(o => o.status === 'in_progress');
  const debtsTotal = debtOrders.reduce((sum, o) => {
    const total = Number(o.grand_total || 25000);
    const paid = Number(o.paid_total || 0);
    return sum + Math.max(0, total - paid);
  }, 0);

  // Top debts
  const topDebts = debtOrders.slice(0, 5).map(o => {
    const total = Number(o.grand_total || 25000);
    const paid = Number(o.paid_total || 0);
    return {
      id: o.id,
      plate: o.plate,
      brand: o.brand,
      model: o.model,
      customer_name: o.customer_name,
      status: o.status,
      stage_name: o.stage?.name || 'Ремонт',
      grand_total: total,
      paid_total: paid,
      balance: Math.max(0, total - paid)
    };
  });

  // Week sparkline
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    week.push({
      date: ds,
      amount: i === 0 ? todayAmount : 15000 + (i * 3500),
      count: i === 0 ? todayPayments.length : 2 + (i % 3)
    });
  }

  res.json({
    date: todayStr,
    generated_at: now.toISOString(),
    money: {
      today_amount: todayAmount,
      today_count: todayPayments.length,
      yesterday_amount: 18500,
      yesterday_count: 3,
      delta_amount: todayAmount - 18500,
      week: week
    },
    debts: {
      total: debtsTotal,
      orders_count: debtOrders.length,
      top: topDebts
    },
    cars: {
      in_work_count: db.orders.filter(o => o.status === 'in_progress' && !o.on_parking).length,
      overdue_count: db.orders.filter(o => o.status === 'in_progress' && o.deadline_at && new Date(o.deadline_at) < now).length,
      parking_count: db.orders.filter(o => o.on_parking).length,
      intake_today_count: db.orders.filter(o => o.created_at?.startsWith(todayStr)).length,
      issued_today_count: db.orders.filter(o => o.completed_at?.startsWith(todayStr)).length
    }
  });
});

// 3. Orders API
app.get('/orders', (req, res) => {
  let list = [...db.orders];
  if (req.query.status) {
    list = list.filter(o => o.status === req.query.status);
  }
  if (req.query.search) {
    const s = req.query.search.toLowerCase();
    list = list.filter(o => 
      (o.plate && o.plate.toLowerCase().includes(s)) ||
      (o.customer_name && o.customer_name.toLowerCase().includes(s)) ||
      (o.brand && o.brand.toLowerCase().includes(s)) ||
      (o.model && o.model.toLowerCase().includes(s))
    );
  }
  res.json(list);
});

app.post('/orders', (req, res) => {
  const body = req.body;
  const newId = (db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) : 28000) + 1;
  const firstStage = db.stages[0] || { id: 6762, name: 'Прийомка' };
  
  const newOrder = {
    id: newId,
    company_id: 842,
    current_stage_id: body.stage_id || firstStage.id,
    brand: body.brand || 'Toyota',
    model: body.model || 'Camry',
    plate: body.plate || 'AO 9988 MK',
    customer_name: body.customer_name || 'Мельник Тарас',
    customer_phone: body.customer_phone || '+380501112233',
    customer_type: body.customer_type || 'physical',
    customer_inn: body.customer_inn || null,
    created_at: new Date().toISOString(),
    status: 'in_progress',
    completed_at: null,
    vin: body.vin || null,
    year: body.year || 2020,
    color: body.color || 'Чорний',
    target_type: 'car',
    request_type: body.request_type || 'Технічне обслуговування',
    source: body.source || 'phone',
    work_list: typeof body.work_list === 'string' ? body.work_list : JSON.stringify(body.work_list || ['Діагностика ходової']),
    comment: body.comment || '',
    deadline_at: body.deadline_at || new Date(Date.now() + 3*86400000).toISOString(),
    car_id: 26700 + newId,
    customer_id: 13500 + newId,
    assigned_user_id: body.assigned_user_id || null,
    on_parking: false,
    stage: firstStage,
    grand_total: body.grand_total || 4500,
    paid_total: 0
  };

  db.orders.unshift(newOrder);
  db.orderSubresources[newId] = {
    detail: newOrder,
    events: [{ id: Date.now(), text: 'Замовлення-наряд створено', created_at: new Date().toISOString() }],
    comments: [],
    parts: [],
    payments: [],
    docs: [
      { kind: 'act', title: 'Акт прийому-передачі' },
      { kind: 'contract', title: 'Договір обслуговування' }
    ]
  };

  logAudit('create_order', `Створив замовлення-наряд №${newId} (${newOrder.brand} ${newOrder.model}, ${newOrder.plate})`, newId);
  saveDatabase();
  res.status(201).json(newOrder);
});

app.get('/orders/pipeline', (req, res) => {
  const stages = db.stages.map(st => {
    const ordersInStage = db.orders.filter(o => o.current_stage_id === st.id && o.status === 'in_progress' && !o.on_parking);
    return {
      id: st.id,
      name: st.name,
      color: st.color,
      position: st.position,
      orders_count: ordersInStage.length,
      orders: ordersInStage
    };
  });
  res.json({ stages });
});

app.get('/orders/overview-stats', (req, res) => {
  const counts = {};
  db.stages.forEach(s => {
    counts[s.id] = db.orders.filter(o => o.current_stage_id === s.id && o.status === 'in_progress' && !o.on_parking).length;
  });
  res.json({
    counts,
    parking_count: db.orders.filter(o => o.on_parking).length,
    in_work_count: db.orders.filter(o => o.status === 'in_progress' && !o.on_parking).length
  });
});

app.get('/orders/parking', (req, res) => {
  const parked = db.orders.filter(o => o.on_parking);
  res.json(parked);
});

app.get('/orders/review-queue', (req, res) => {
  const reviews = db.orders.filter(o => o.stage_review_status === 'pending');
  res.json(reviews);
});

app.get('/orders/my-tasks', (req, res) => {
  const currentPos = (db.authMe?.position || '').toLowerCase();
  const currentUserId = db.authMe?.id;
  const isOwnerOrDirector = currentPos.includes('власник') || currentPos.includes('директор') || currentPos.includes('начальник');

  let list = db.orders.filter(o => o.status === 'in_progress');

  if (!isOwnerOrDirector) {
    const filtered = list.filter(o => {
      if (o.assigned_user_id === currentUserId) return true;
      const stageName = (o.stage?.name || '').toLowerCase();
      if (currentPos.includes('механік') && (stageName.includes('ремонт') || stageName.includes('діагностика'))) return true;
      if (currentPos.includes('автоелектрик') && (stageName.includes('діагностика') || stageName.includes('ремонт'))) return true;
      if (currentPos.includes('кузовник') && stageName.includes('ремонт')) return true;
      if (currentPos.includes('маляр') && stageName.includes('ремонт')) return true;
      if (currentPos.includes('мийник') && stageName.includes('мийка')) return true;
      if (currentPos.includes('приймальник') && (stageName.includes('прийомка') || stageName.includes('узгодження') || stageName.includes('видача'))) return true;
      if (currentPos.includes('запчастин') && stageName.includes('запчастин')) return true;
      return false;
    });

    list = filtered.length > 0 ? filtered : list.slice(0, 6);
  }

  const enriched = list.map(o => {
    const sub = db.orderSubresources[o.id] || {};
    const checklist = (db.stageChecklists && db.stageChecklists[o.current_stage_id]) || [];
    const checkedIds = sub.checked_item_ids || [];
    return {
      ...o,
      checklist,
      checked_item_ids: checkedIds,
      checklist_total: checklist.length,
      checklist_completed: checkedIds.length,
      assigned_user_name: db.users.find(u => u.id === o.assigned_user_id)?.full_name || null
    };
  });

  res.json(enriched);
});

app.post('/orders/:id/take-task', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.assigned_user_id = db.authMe.id;
  logAudit('take_order', `Майстер ${db.authMe.full_name} (${db.authMe.position}) взяв наряд №${id} в роботу`, id);
  saveDatabase();
  res.json({ ok: true, order });
});


// Single order details and operations
app.get('/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  
  const sub = db.orderSubresources[id] || {};
  const currentStage = db.stages.find(s => s.id === order.current_stage_id) || db.stages[0];
  const checklist = (db.stageChecklists && db.stageChecklists[currentStage.id]) || [];

  res.json({
    ...order,
    stage: currentStage,
    checklist: checklist,
    checked_item_ids: sub.checked_item_ids || [],
    assigned_user_name: db.users.find(u => u.id === order.assigned_user_id)?.full_name || null,
    can_edit_checklist: true,
    can_view_history: true
  });
});

app.patch('/orders/:id', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  Object.assign(order, req.body);
  logAudit('update_order', `Оновив параметри наряду №${id}`, id);
  saveDatabase();
  res.json(order);
});

app.post('/orders/:id/assign', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.assigned_user_id = req.body.user_id || null;
  const userName = db.users.find(u => u.id === order.assigned_user_id)?.full_name || 'Не призначено';
  logAudit('assign_user', `Призначив виконавця: ${userName} для наряду №${id}`, id);
  saveDatabase();
  res.json({ ok: true, assigned_user_id: order.assigned_user_id });
});

app.post('/orders/:id/confirm-review', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  // Move to next stage
  const curIdx = db.stages.findIndex(s => s.id === order.current_stage_id);
  if (curIdx >= 0 && curIdx < db.stages.length - 1) {
    const nextStage = db.stages[curIdx + 1];
    order.current_stage_id = nextStage.id;
    order.stage = nextStage;
    logAudit('stage_transition', `Перевів наряд №${id} на етап «${nextStage.name}»`, id);
  } else if (curIdx === db.stages.length - 1) {
    order.status = 'completed';
    order.completed_at = new Date().toISOString();
    logAudit('complete_order', `Завершив та видав наряд №${id}`, id);
  }

  saveDatabase();
  res.json({ ok: true, order });
});

app.post('/orders/:id/rollback', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  const targetId = Number(req.body.target_stage_id);
  const stage = db.stages.find(s => s.id === targetId);
  if (stage) {
    order.current_stage_id = stage.id;
    order.stage = stage;
    logAudit('stage_rollback', `Откатив наряд №${id} на етап «${stage.name}» (Причина: ${req.body.reason || 'не вказано'})`, id);
    saveDatabase();
  }
  res.json({ ok: true, order });
});

app.post('/orders/:id/checklist/:itemId/check', (req, res) => {
  const id = Number(req.params.id);
  const itemId = Number(req.params.itemId);
  if (!db.orderSubresources[id]) db.orderSubresources[id] = {};
  if (!db.orderSubresources[id].checked_item_ids) db.orderSubresources[id].checked_item_ids = [];

  if (!db.orderSubresources[id].checked_item_ids.includes(itemId)) {
    db.orderSubresources[id].checked_item_ids.push(itemId);
  }
  saveDatabase();
  res.json({ ok: true, checked_item_ids: db.orderSubresources[id].checked_item_ids });
});

app.delete('/orders/:id/checklist/:itemId/check', (req, res) => {
  const id = Number(req.params.id);
  const itemId = Number(req.params.itemId);
  if (db.orderSubresources[id]?.checked_item_ids) {
    db.orderSubresources[id].checked_item_ids = db.orderSubresources[id].checked_item_ids.filter(x => x !== itemId);
  }
  saveDatabase();
  res.json({ ok: true, checked_item_ids: db.orderSubresources[id]?.checked_item_ids || [] });
});

app.post('/orders/:id/release-from-parking', (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);
  if (order) {
    order.on_parking = false;
    logAudit('release_parking', `Повернув авто №${id} (${order.plate}) зі стоянки в роботу`, id);
    saveDatabase();
  }
  res.json({ ok: true });
});

// Order sub-resources: Events, Comments, Parts, Payments, Documents
app.get('/orders/:id/events', (req, res) => {
  const id = Number(req.params.id);
  const events = db.orderSubresources[id]?.events || [
    { id: 1, text: 'Прийомка автомобіля оформлена', created_at: new Date().toISOString() }
  ];
  res.json(events);
});

app.get('/orders/:id/comments', (req, res) => {
  const id = Number(req.params.id);
  res.json(db.orderSubresources[id]?.comments || []);
});

app.post('/orders/:id/comments', (req, res) => {
  const id = Number(req.params.id);
  if (!db.orderSubresources[id]) db.orderSubresources[id] = {};
  if (!db.orderSubresources[id].comments) db.orderSubresources[id].comments = [];

  const newComm = {
    id: Date.now(),
    text: req.body.text,
    color: req.body.color || 'green',
    author: db.authMe.full_name,
    created_at: new Date().toISOString()
  };
  db.orderSubresources[id].comments.push(newComm);
  saveDatabase();
  res.status(201).json(newComm);
});

app.get('/orders/:id/parts', (req, res) => {
  const id = Number(req.params.id);
  res.json(db.orderSubresources[id]?.parts || []);
});

app.post('/orders/:id/parts', (req, res) => {
  const id = Number(req.params.id);
  if (!db.orderSubresources[id]) db.orderSubresources[id] = {};
  if (!db.orderSubresources[id].parts) db.orderSubresources[id].parts = [];

  const newPart = {
    id: Date.now(),
    order_id: id,
    name: req.body.name,
    type: req.body.type || 'part',
    qty: Number(req.body.qty) || 1,
    price: Number(req.body.price) || 0,
    cost: Number(req.body.cost) || 0,
    status: req.body.status || 'needed',
    note: req.body.note || '',
    created_at: new Date().toISOString()
  };
  db.orderSubresources[id].parts.push(newPart);
  logAudit('add_part', `Додав запчастину «${newPart.name}» у наряд №${id}`, id);
  saveDatabase();
  res.status(201).json(newPart);
});

app.patch('/orders/:id/parts/:partId', (req, res) => {
  const id = Number(req.params.id);
  const partId = Number(req.params.partId);
  const parts = db.orderSubresources[id]?.parts || [];
  const part = parts.find(p => p.id === partId);
  if (part) {
    Object.assign(part, req.body);
    saveDatabase();
  }
  res.json(part || {});
});

app.delete('/orders/:id/parts/:partId', (req, res) => {
  const id = Number(req.params.id);
  const partId = Number(req.params.partId);
  if (db.orderSubresources[id]?.parts) {
    db.orderSubresources[id].parts = db.orderSubresources[id].parts.filter(p => p.id !== partId);
    saveDatabase();
  }
  res.json({ ok: true });
});

app.get('/orders/:id/payments', (req, res) => {
  const id = Number(req.params.id);
  const items = db.orderSubresources[id]?.payments || [];
  const paidTotal = items.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  res.json({ items, paid_total: paidTotal });
});

app.post('/orders/:id/payments', (req, res) => {
  const id = Number(req.params.id);
  if (!db.orderSubresources[id]) db.orderSubresources[id] = {};
  if (!db.orderSubresources[id].payments) db.orderSubresources[id].payments = [];

  const amount = Number(req.body.amount) || 0;
  const newPayment = {
    id: Date.now(),
    order_id: id,
    amount: amount,
    method: req.body.method || 'cash',
    receiver: req.body.receiver || db.authMe.full_name,
    note: req.body.note || 'Оплата замовлення',
    created_at: new Date().toISOString()
  };

  db.orderSubresources[id].payments.push(newPayment);

  // Also add to global cash orders
  db.cashOrders.unshift({
    id: newPayment.id,
    order_id: id,
    amount: amount,
    direction: 'in',
    type: 'pko',
    payment_method: newPayment.method,
    note: `Оплата за нарядом №${id}`,
    created_at: newPayment.created_at
  });

  // Update order paid_total
  const order = db.orders.find(o => o.id === id);
  if (order) {
    order.paid_total = (Number(order.paid_total) || 0) + amount;
  }

  logAudit('add_payment', `Провів оплату на суму ${amount} ₴ для наряду №${id}`, id);
  saveDatabase();

  const paidTotal = db.orderSubresources[id].payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  res.status(201).json({ items: db.orderSubresources[id].payments, paid_total: paidTotal });
});

app.delete('/orders/:id/payments/:paymentId', (req, res) => {
  const id = Number(req.params.id);
  const paymentId = Number(req.params.paymentId);
  if (db.orderSubresources[id]?.payments) {
    const p = db.orderSubresources[id].payments.find(x => x.id === paymentId);
    if (p) {
      const order = db.orders.find(o => o.id === id);
      if (order) {
        order.paid_total = Math.max(0, (Number(order.paid_total) || 0) - (Number(p.amount) || 0));
      }
    }
    db.orderSubresources[id].payments = db.orderSubresources[id].payments.filter(x => x.id !== paymentId);
    db.cashOrders = db.cashOrders.filter(co => co.id !== paymentId);
    logAudit('delete_payment', `Видалив платіж №${paymentId} для наряду №${id}`, id);
    saveDatabase();
  }
  const paidTotal = (db.orderSubresources[id]?.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  res.json({ items: db.orderSubresources[id]?.payments || [], paid_total: paidTotal });
});

app.get('/orders/:id/documents', (req, res) => {
  const id = Number(req.params.id);
  res.json([
    { kind: 'act', title: 'Акт виконаних робіт' },
    { kind: 'invoice', title: 'Рахунок на оплату' },
    { kind: 'diag', title: 'Діагностична карта' }
  ]);
});

// 4. Bookings API
app.get('/bookings', (req, res) => {
  res.json(db.bookings);
});

app.post('/bookings', (req, res) => {
  const newBooking = {
    id: Date.now(),
    customer_name: req.body.customer_name || 'Новий клієнт',
    customer_phone: req.body.customer_phone || '+380509998877',
    car_brand: req.body.car_brand || 'Skoda',
    car_model: req.body.car_model || 'Octavia',
    visit_date: req.body.visit_date || new Date().toISOString().slice(0, 10),
    visit_time: req.body.visit_time || '10:00',
    service: req.body.service || 'Технічне обслуговування',
    comment: req.body.comment || '',
    status: 'pending'
  };
  db.bookings.unshift(newBooking);
  saveDatabase();
  res.status(201).json(newBooking);
});

app.post('/bookings/:id/convert', (req, res) => {
  const id = Number(req.params.id);
  const b = db.bookings.find(x => x.id === id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });

  // Create order from booking
  const newId = (db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) : 28000) + 1;
  const newOrder = {
    id: newId,
    brand: b.car_brand,
    model: b.car_model,
    plate: 'AO ' + Math.floor(1000 + Math.random()*9000) + ' MK',
    customer_name: b.customer_name,
    customer_phone: b.customer_phone,
    customer_type: 'physical',
    current_stage_id: db.stages[0]?.id || 6762,
    created_at: new Date().toISOString(),
    status: 'in_progress',
    work_list: JSON.stringify([b.service]),
    comment: b.comment,
    grand_total: 3500,
    paid_total: 0
  };
  db.orders.unshift(newOrder);
  db.bookings = db.bookings.filter(x => x.id !== id);
  logAudit('convert_booking', `Перевів запис клієнта ${b.customer_name} у замовлення №${newId}`, newId);
  saveDatabase();
  res.json({ ok: true, order_id: newId });
});

app.delete('/bookings/:id', (req, res) => {
  const id = Number(req.params.id);
  db.bookings = db.bookings.filter(b => b.id !== id);
  saveDatabase();
  res.json({ ok: true });
});

// 5. Customers API
app.get('/customers/registry', (req, res) => {
  res.json(db.customers);
});

app.get('/customers/:id/detail', (req, res) => {
  const id = Number(req.params.id);
  const cust = db.customers.find(c => c.id === id) || { id, full_name: 'Клієнт' };
  const orders = db.orders.filter(o => o.customer_name === cust.full_name || o.customer_phone === cust.phone);
  res.json({
    customer: cust,
    orders: orders,
    stats: {
      total_orders: orders.length,
      total_spent: orders.reduce((s, o) => s + (Number(o.paid_total) || 0), 0)
    }
  });
});

app.post('/customers', (req, res) => {
  const { full_name, phone, car_brand, car_model, plate, year, vin, notes } = req.body;
  if (!full_name) {
    return res.status(400).json({ error: "Ім'я клієнта обов'язкове" });
  }

  const newCust = {
    id: Date.now(),
    full_name: full_name.trim(),
    phone: phone || '',
    car_brand: car_brand || '',
    car_model: car_model || '',
    plate: (plate || '').toUpperCase(),
    year: Number(year) || null,
    vin: (vin || '').toUpperCase(),
    notes: notes || '',
    orders_count: 0,
    total_spent: 0,
    created_at: new Date().toISOString()
  };

  db.customers.unshift(newCust);
  logAudit('Додавання клієнта', `Зареєстровано клієнта: ${newCust.full_name} (${newCust.car_brand} ${newCust.car_model || ''})`);
  saveDatabase();
  res.status(201).json(newCust);
});

app.delete('/customers/:id', (req, res) => {
  const id = Number(req.params.id);
  db.customers = db.customers.filter(c => c.id !== id);
  logAudit('Видалення клієнта', `Видалено клієнта #${id}`);
  saveDatabase();
  res.json({ ok: true });
});

// 6. Warehouse API
app.get('/warehouse/items', (req, res) => {
  res.json(db.warehouseItems);
});

app.post('/warehouse/items', (req, res) => {
  const item = {
    id: Date.now(),
    name: req.body.name,
    sku: req.body.sku || 'SKU-' + Math.floor(Math.random()*10000),
    category: req.body.category || 'Запчастини',
    quantity: Number(req.body.quantity) || 0,
    unit: req.body.unit || 'шт',
    buy_price: Number(req.body.buy_price) || 0,
    sell_price: Number(req.body.sell_price) || 0
  };
  db.warehouseItems.unshift(item);
  saveDatabase();
  res.status(201).json(item);
});

app.get('/warehouse/docs', (req, res) => {
  res.json(db.warehouseDocs);
});

app.post('/warehouse/docs', (req, res) => {
  const doc = {
    id: Date.now(),
    doc_number: 'WH-' + Math.floor(Math.random()*10000),
    doc_type: req.body.doc_type || 'receipt',
    date: new Date().toISOString(),
    status: 'draft',
    warehouse_id: 1,
    comment: req.body.comment || '',
    items_count: req.body.items?.length || 1,
    total_amount: req.body.total_amount || 5000
  };
  db.warehouseDocs.unshift(doc);
  saveDatabase();
  res.status(201).json(doc);
});

app.post('/warehouse/docs/:id/post', (req, res) => {
  const id = Number(req.params.id);
  const doc = db.warehouseDocs.find(d => d.id === id);
  if (doc) {
    doc.status = 'posted';
    doc.posted_at = new Date().toISOString();
    logAudit('warehouse_post', `Провів складський документ №${doc.doc_number}`);
    saveDatabase();
  }
  res.json({ ok: true, doc });
});

app.post('/warehouse/docs/:id/unpost', (req, res) => {
  const id = Number(req.params.id);
  const doc = db.warehouseDocs.find(d => d.id === id);
  if (doc) {
    doc.status = 'draft';
    logAudit('warehouse_unpost', `Скасував проведення документа №${doc.doc_number}`);
    saveDatabase();
  }
  res.json({ ok: true, doc });
});

app.get('/warehouse/warehouses', (req, res) => {
  res.json(db.warehouses);
});

// 7. Cash API
app.get('/cash/flow', (req, res) => {
  const incoming = db.cashOrders.filter(c => c.direction === 'in').reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const outgoing = db.cashOrders.filter(c => c.direction === 'out').reduce((s, c) => s + (Number(c.amount) || 0), 0);
  res.json({
    balance: incoming - outgoing,
    total_in: incoming,
    total_out: outgoing,
    today_in: incoming,
    today_out: outgoing
  });
});

app.get('/cash/orders', (req, res) => {
  res.json(db.cashOrders);
});

app.post('/cash/orders', (req, res) => {
  const order = {
    id: Date.now(),
    direction: req.body.direction || 'in',
    type: req.body.type || (req.body.direction === 'out' ? 'rko' : 'pko'),
    amount: Number(req.body.amount) || 0,
    payment_method: req.body.payment_method || 'cash',
    note: req.body.note || 'Касова операція',
    order_id: req.body.order_id || null,
    created_at: new Date().toISOString()
  };
  db.cashOrders.unshift(order);
  logAudit('cash_order', `Створив касовий ордер ${order.type.toUpperCase()} на суму ${order.amount} ₴`);
  saveDatabase();
  res.status(201).json(order);
});

// 8. Reports API
app.get('/reports/debts', (req, res) => {
  const debtList = db.orders.filter(o => o.status === 'in_progress' || (Number(o.grand_total) > Number(o.paid_total))).map(o => {
    const total = Number(o.grand_total) || 20000;
    const paid = Number(o.paid_total) || 0;
    return {
      order_id: o.id,
      plate: o.plate,
      vehicle: `${o.brand} ${o.model}`,
      customer: o.customer_name,
      phone: o.customer_phone,
      total: total,
      paid: paid,
      debt: Math.max(0, total - paid),
      stage: o.stage?.name || 'Ремонт'
    };
  });
  res.json(debtList);
});

app.get('/reports/executors', (req, res) => {
  const executors = db.users.filter(u => u.position === 'Механік' || u.position === 'Автоелектрик' || u.position === 'Кузовник').map(u => ({
    user_id: u.id,
    full_name: u.full_name,
    position: u.position,
    orders_completed: 12 + (u.id % 7),
    hours_worked: 160 + (u.id % 20),
    total_labor: 84000 + (u.id * 1500),
    earnings: 33600 + (u.id * 600)
  }));
  res.json(executors);
});

app.get('/reports/managers', (req, res) => {
  const managers = db.users.filter(u => u.position.includes('приймальник') || u.position === 'Власник').map(u => ({
    user_id: u.id,
    full_name: u.full_name,
    orders_taken: 28,
    orders_issued: 24,
    revenue_generated: 412000,
    conversion_rate: 94.2
  }));
  res.json(managers);
});

app.get('/reports/payroll', (req, res) => {
  const payroll = db.users.map(u => ({
    user_id: u.id,
    full_name: u.full_name,
    position: u.position,
    base_salary: 20000,
    commission: 14500,
    total_payout: 34500
  }));
  res.json(payroll);
});

app.get('/reports/orders-registry', (req, res) => {
  res.json(db.orders);
});

// 9. Tasks & Shifts
app.get('/company-tasks', (req, res) => {
  res.json(db.companyTasks);
});

app.post('/company-tasks', (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || '',
    priority: req.body.priority || 'medium',
    status: 'open',
    assigned_to: req.body.assigned_to || 'Денис Кравчук',
    created_at: new Date().toISOString()
  };
  db.companyTasks.unshift(task);
  saveDatabase();
  res.status(201).json(task);
});

app.patch('/company-tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = db.companyTasks.find(t => t.id === id);
  if (task) {
    Object.assign(task, req.body);
    saveDatabase();
  }
  res.json(task || {});
});

app.get('/shifts/active', (req, res) => {
  res.json(db.shiftsActive);
});

app.get('/shifts/pending', (req, res) => {
  res.json(db.shiftsPending);
});

app.post('/shifts/start', (req, res) => {
  const shift = {
    id: Date.now(),
    user_id: db.authMe.id,
    user_name: db.authMe.full_name,
    start_time: new Date().toISOString(),
    status: 'active'
  };
  db.shiftsActive.push(shift);
  saveDatabase();
  res.status(201).json(shift);
});

app.post('/shifts/:id/close', (req, res) => {
  const id = Number(req.params.id);
  db.shiftsActive = db.shiftsActive.filter(s => s.id !== id);
  saveDatabase();
  res.json({ ok: true });
});

// 10. Admin & Settings
app.get('/admin/users', (req, res) => {
  res.json(db.users);
});

app.post('/admin/users', (req, res) => {
  const { full_name, position, role_name, phone, hourly_rate, percent_bonus } = req.body;
  if (!full_name || !position) {
    return res.status(400).json({ error: 'ПІБ та посада є обовʼязковими' });
  }

  const role = db.roles.find(r => (r.name || '').toLowerCase() === (position || '').toLowerCase()) || {
    id: 6740 + db.users.length,
    name: position,
    permissions: position === 'Власник' ? ['*'] : ['orders.read', 'checklist.update', 'shifts.self', 'tasks.read', 'tasks.update']
  };

  const newUser = {
    id: Date.now(),
    company_id: 843,
    role_id: role.id,
    full_name: full_name.trim(),
    web_login: 'user_' + Math.floor(Math.random() * 10000),
    position: position.trim(),
    role_name: role_name || (position === 'Власник' ? 'Власник' : 'Цеховий фахівець'),
    phone: phone || '',
    hourly_rate: Number(hourly_rate) || 0,
    percent_bonus: Number(percent_bonus) || 0,
    ui_theme: 'dark',
    permissions: role.permissions,
    is_previewing: false,
    preview_as: null
  };

  db.users.push(newUser);
  logAudit('Реєстрація співробітника', `Зареєстровано співробітника: ${newUser.full_name} (${newUser.position})`);
  saveDatabase();
  res.status(201).json(newUser);
});

app.delete('/admin/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = db.users.find(u => u.id === id);
  db.users = db.users.filter(u => u.id !== id);
  if (user) {
    logAudit('Видалення співробітника', `Видалено обліковий запис: ${user.full_name} (${user.position})`);
  }
  saveDatabase();
  res.json({ ok: true });
});
app.get('/admin/roles', (req, res) => {
  res.json(db.roles);
});
app.get('/admin/stages', (req, res) => {
  res.json(db.stages);
});
app.get('/company/positions', (req, res) => {
  res.json(db.positions);
});
app.get('/clients/stage-positions', (req, res) => {
  res.json(db.stagePositions);
});
app.get('/clients/payroll-settings', (req, res) => {
  res.json(db.payrollSettings);
});
app.get('/work-items', (req, res) => {
  res.json(db.workItems);
});
app.get('/audit/actions', (req, res) => {
  res.json(db.auditActions);
});

// 11. Production Static Serving & SPA Fallback
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MKV Autostand Production Server running at http://0.0.0.0:${PORT}`);
});
