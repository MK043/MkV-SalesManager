import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  ArrowLeft,
  Car,
  User,
  Wrench,
  Boxes,
  Wallet,
  CheckSquare,
  FileText,
  MessageSquare,
  History,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Printer,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export function OrderDetailScreen({ orderId }) {
  const { t } = useTranslation();
  const { currency } = useApp();
  const { navigate } = useRouter();

  const [order, setOrder] = useState(null);
  const [stages, setStages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('info'); // info, works, parts, payments, checklist, docs, comments, history
  
  const [parts, setParts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [comments, setComments] = useState([]);
  const [events, setEvents] = useState([]);
  const [docs, setDocs] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals / forms
  const [showAddPart, setShowAddPart] = useState(false);
  const [partName, setPartName] = useState('');
  const [partQty, setPartQty] = useState('1');
  const [partPrice, setPartPrice] = useState('');
  const [partCost, setPartCost] = useState('');

  const [showAddPayment, setShowAddPayment] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('cash');
  const [payNote, setPayNote] = useState('Оплата замовлення');

  const [showRollback, setShowRollback] = useState(false);
  const [rollbackStageId, setRollbackStageId] = useState('');
  const [rollbackReason, setRollbackReason] = useState('');

  const [newComment, setNewComment] = useState('');
  const [newCommentColor, setNewCommentColor] = useState('green');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');

  const [newWorkItem, setNewWorkItem] = useState('');

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const [orderRes, stagesRes, usersRes, partsRes, paymentsRes, commentsRes, eventsRes, docsRes] = await Promise.all([
        api.get(`/orders/${orderId}`),
        api.get('/admin/stages'),
        api.get('/admin/users'),
        api.get(`/orders/${orderId}/parts`),
        api.get(`/orders/${orderId}/payments`),
        api.get(`/orders/${orderId}/comments`),
        api.get(`/orders/${orderId}/events`),
        api.get(`/orders/${orderId}/documents`)
      ]);

      setOrder(orderRes);
      setStages(stagesRes || []);
      setUsers(usersRes || []);
      setParts(partsRes || []);
      setPayments(paymentsRes?.items || []);
      setComments(commentsRes || []);
      setEvents(eventsRes || []);
      setDocs(docsRes || []);
    } catch (err) {
      setError(err.message || 'Помилка завантаження даних замовлення');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [orderId]);

  if (loading && !order) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-olive border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-brand-muted">{t.common.loading}</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="card p-8 text-center space-y-4">
        <AlertCircle size={32} className="mx-auto text-brand-red" />
        <h2 className="text-lg font-bold text-brand-text">Замовлення не знайдено</h2>
        <p className="text-xs text-brand-muted">{error}</p>
        <button type="button" onClick={() => navigate('/orders')} className="btn btn-secondary btn-sm">
          До списку замовлень
        </button>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex(s => s.id === order.current_stage_id);

  // Actions
  const handleAdvanceStage = async () => {
    try {
      await api.post(`/orders/${orderId}/confirm-review`);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Не вдалося перевести на наступний етап');
    }
  };

  const handleRollbackStage = async () => {
    if (!rollbackStageId) return;
    try {
      await api.post(`/orders/${orderId}/rollback`, {
        target_stage_id: rollbackStageId,
        reason: rollbackReason
      });
      setShowRollback(false);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Не вдалося повернути етап');
    }
  };

  const handleToggleChecklist = async (itemId, isChecked) => {
    try {
      if (isChecked) {
        await api.delete(`/orders/${orderId}/checklist/${itemId}/check`);
      } else {
        await api.post(`/orders/${orderId}/checklist/${itemId}/check`);
      }
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка збереження чек-ліста');
    }
  };

  const handleAddPart = async (e) => {
    e.preventDefault();
    if (!partName.trim()) return;
    try {
      await api.post(`/orders/${orderId}/parts`, {
        name: partName.trim(),
        qty: Number(partQty) || 1,
        price: Number(partPrice) || 0,
        cost: Number(partCost) || 0,
        status: 'needed'
      });
      setPartName('');
      setPartPrice('');
      setPartCost('');
      setShowAddPart(false);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка додавання запчастини');
    }
  };

  const handleDeletePart = async (partId) => {
    if (!window.confirm('Видалити запчастину?')) return;
    try {
      await api.delete(`/orders/${orderId}/parts/${partId}`);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка видалення');
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    const amount = Number(payAmount);
    if (!amount || amount <= 0) return;
    try {
      await api.post(`/orders/${orderId}/payments`, {
        amount,
        method: payMethod,
        note: payNote
      });
      setPayAmount('');
      setShowAddPayment(false);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка внесення платежу');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Видалити платіж? Операція потрапить в аудит.')) return;
    try {
      await api.delete(`/orders/${orderId}/payments/${paymentId}`);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка видалення');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.post(`/orders/${orderId}/comments`, {
        text: newComment.trim(),
        color: newCommentColor
      });
      setNewComment('');
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка додавання коментаря');
    }
  };

  const handleAssignUser = async () => {
    try {
      await api.post(`/orders/${orderId}/assign`, {
        user_id: selectedAssignee ? Number(selectedAssignee) : null
      });
      setShowAssignModal(false);
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка призначення майстра');
    }
  };

  const handleAddWorkItem = async () => {
    if (!newWorkItem.trim()) return;
    let list = [];
    try {
      list = typeof order.work_list === 'string' ? JSON.parse(order.work_list) : (order.work_list || []);
    } catch {
      list = [order.work_list];
    }
    list.push(newWorkItem.trim());
    try {
      await api.patch(`/orders/${orderId}`, { work_list: JSON.stringify(list) });
      setNewWorkItem('');
      fetchOrderData();
    } catch (err) {
      alert(err.message || 'Помилка додавання роботи');
    }
  };

  const parsedWorkList = (() => {
    try {
      return typeof order.work_list === 'string' ? JSON.parse(order.work_list) : (order.work_list || []);
    } catch {
      return [order.work_list || 'Діагностика'];
    }
  })();

  const grandTotal = Number(order.grand_total) || 20000;
  const paidTotal = Number(order.paid_total) || 0;
  const balance = Math.max(0, grandTotal - paidTotal);

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="p-2 rounded-lg bg-brand-surface2 hover:bg-brand-surfaceHover border border-brand-border text-brand-muted hover:text-brand-text transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-muted">#{order.id}</span>
              <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text">
                {order.brand} {order.model}
              </h1>
              <span className="font-mono text-xs font-black tracking-wide text-brand-sand px-2 py-0.5 rounded bg-brand-surface2 border border-brand-border">
                {order.plate}
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Клієнт: <strong>{order.customer_name}</strong> • {order.customer_phone}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {currentStageIndex < stages.length - 1 && (
            <button
              type="button"
              onClick={handleAdvanceStage}
              className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20"
            >
              <CheckCircle2 size={15} /> Перевести на наступний етап
            </button>
          )}

          {currentStageIndex > 0 && (
            <button
              type="button"
              onClick={() => setShowRollback(true)}
              className="btn btn-secondary btn-sm"
            >
              <RotateCcw size={15} /> Откатити етап
            </button>
          )}
        </div>
      </div>

      {/* Stage Stepper Progress */}
      <div className="card p-4 overflow-x-auto">
        <div className="flex items-center min-w-max gap-2">
          {stages.map((stage, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <React.Fragment key={stage.id}>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-brand-olive text-white shadow-sm ring-2 ring-brand-olive/40'
                      : isDone
                      ? 'bg-brand-surface2 text-brand-green border border-brand-green/30'
                      : 'bg-brand-surface text-brand-muted border border-brand-border'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-black/30 text-white' : isDone ? 'bg-brand-green/20 text-brand-green' : 'bg-brand-surface2 text-brand-muted'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </span>
                  <span>{stage.name}</span>
                </div>
                {idx < stages.length - 1 && (
                  <ChevronRight size={14} className="text-brand-border shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-brand-border flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'info', label: 'Загальна картка', icon: Car },
          { id: 'works', label: 'Роботи та послуги', icon: Wrench },
          { id: 'parts', label: `Запчастини (${parts.length})`, icon: Boxes },
          { id: 'payments', label: `Платежі (${payments.length})`, icon: Wallet },
          { id: 'checklist', label: 'Чек-лист якості', icon: CheckSquare },
          { id: 'docs', label: 'Документи та акти', icon: FileText },
          { id: 'comments', label: `Коментарі (${comments.length})`, icon: MessageSquare },
          { id: 'history', label: 'Історія дій', icon: History }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-brand-olive text-brand-olive bg-brand-olive/5'
                  : 'border-transparent text-brand-muted hover:text-brand-text hover:border-brand-border'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Info */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Vehicle card */}
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
              <Car size={15} className="text-brand-olive" /> Дані автомобіля
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Марка і модель:</span>
                <span className="font-bold">{order.brand} {order.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Держномер:</span>
                <span className="font-mono font-bold text-brand-sand">{order.plate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Рік випуску:</span>
                <span className="font-mono">{order.year || '—'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Колір:</span>
                <span>{order.color || '—'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-muted">VIN-код:</span>
                <span className="font-mono">{order.vin || 'Не вказано'}</span>
              </div>
            </div>
          </div>

          {/* Customer card */}
          <div className="card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
              <User size={15} className="text-brand-olive" /> Дані клієнта
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">ПІБ:</span>
                <span className="font-bold">{order.customer_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Телефон:</span>
                <span className="font-mono">{order.customer_phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-border/50">
                <span className="text-brand-muted">Тип клієнта:</span>
                <span>Фізична особа</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-muted">Джерело звернення:</span>
                <span>{order.source || 'Прямий візит'}</span>
              </div>
            </div>
          </div>

          {/* Technician & Financial status */}
          <div className="card p-5 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                Відповідальний майстер
              </h3>
              <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface2 border border-brand-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-olive text-white font-bold text-xs flex items-center justify-center">
                    {order.assigned_user_name ? order.assigned_user_name.charAt(0) : '?'}
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{order.assigned_user_name || 'Не призначено'}</span>
                    <span className="text-[10px] text-brand-muted">Виконавець робіт</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(true)}
                  className="btn btn-secondary btn-sm text-[11px]"
                >
                  Змінити
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Загальний кошторис:</span>
                  <span className="font-mono font-bold">{formatMoney(grandTotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Оплачено:</span>
                  <span className="font-mono text-brand-green font-bold">{formatMoney(paidTotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Залишок до сплати:</span>
                  <span className="font-mono text-brand-orange font-bold">{formatMoney(balance, currency)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowAddPayment(true);
                setPayAmount(String(balance > 0 ? balance : 1000));
              }}
              className="w-full btn btn-primary btn-sm text-xs justify-center"
            >
              <Wallet size={14} /> Внести платіж
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Works */}
      {activeTab === 'works' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-brand-text">Перелік узгоджених робіт</h2>
            <span className="text-xs text-brand-muted font-mono">{parsedWorkList.length} робіт</span>
          </div>

          <div className="space-y-2">
            {parsedWorkList.map((w, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-brand-surface2 border border-brand-border text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-olive/20 text-brand-olive text-[11px] font-mono flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{w}</span>
                </div>
                <span className="badge badge-green text-[10px]">Узгоджено</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-3 border-t border-brand-border">
            <input
              type="text"
              value={newWorkItem}
              onChange={e => setNewWorkItem(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddWorkItem()}
              placeholder="Додати найменування послуги..."
              className="input text-xs"
            />
            <button
              type="button"
              onClick={handleAddWorkItem}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={14} /> Додати роботу
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Spare Parts */}
      {activeTab === 'parts' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">Запчастини та матеріали для наряду</h2>
              <p className="text-xs text-brand-muted">Облік деталей, цін та статусів постачання</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddPart(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} /> Додати деталь
            </button>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Найменування</th>
                  <th>Кількість</th>
                  <th className="text-right">Собівартість</th>
                  <th className="text-right">Ціна для клієнта</th>
                  <th>Статус постачання</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {parts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-brand-muted text-xs">
                      Деталей для цього наряду поки немає
                    </td>
                  </tr>
                ) : (
                  parts.map(p => (
                    <tr key={p.id}>
                      <td className="font-semibold">{p.name}</td>
                      <td className="font-mono text-xs">{p.qty} шт</td>
                      <td className="text-right font-mono text-xs text-brand-muted">{formatMoney(p.cost, currency)}</td>
                      <td className="text-right font-mono text-xs font-bold">{formatMoney(p.price, currency)}</td>
                      <td>
                        <span className="badge badge-accent text-[11px]">
                          {p.status === 'needed' ? 'Потрібно замовити' : p.status === 'ordered' ? 'Замовлено' : 'На складі'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeletePart(p.id)}
                          className="text-brand-muted hover:text-brand-red p-1 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Payments */}
      {activeTab === 'payments' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">Історія платежів та касових ордерів</h2>
              <p className="text-xs text-brand-muted">Фіксує всі готівкові та безготівкові транзакції за нарядом</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddPayment(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus size={14} /> Внести платіж
            </button>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Спосіб оплати</th>
                  <th className="text-right">Сума платежу</th>
                  <th>Прийняв касир</th>
                  <th>Примітка</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-brand-muted text-xs">
                      Оплат за цим нарядом ще не було
                    </td>
                  </tr>
                ) : (
                  payments.map(p => (
                    <tr key={p.id}>
                      <td className="text-xs font-mono">{p.created_at ? p.created_at.slice(0, 16).replace('T', ' ') : '—'}</td>
                      <td>
                        <span className="badge badge-gray text-xs">
                          {p.method === 'cash' ? 'Готівка' : p.method === 'card' ? 'Картка POS' : 'IBAN'}
                        </span>
                      </td>
                      <td className="text-right font-mono font-bold text-brand-green">
                        {formatMoney(p.amount, currency)}
                      </td>
                      <td className="text-xs">{p.receiver}</td>
                      <td className="text-xs text-brand-muted">{p.note}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeletePayment(p.id)}
                          className="text-brand-muted hover:text-brand-red p-1 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Checklist */}
      {activeTab === 'checklist' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">Контрольний чек-лист етапу «{order.stage?.name}»</h2>
              <p className="text-xs text-brand-muted">Майстер відмічає виконання пунктів перед передачею наряду далі</p>
            </div>
            <span className="badge badge-accent font-mono text-xs">
              {(order.checked_item_ids || []).length} / {(order.checklist || []).length} перевірено
            </span>
          </div>

          <div className="space-y-2">
            {(order.checklist && order.checklist.length > 0) ? (
              order.checklist.map(item => {
                const isChecked = (order.checked_item_ids || []).includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id, isChecked)}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                      isChecked
                        ? 'bg-brand-olive/10 border-brand-olive/40 text-brand-text'
                        : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isChecked ? 'bg-brand-olive border-brand-olive text-white' : 'border-brand-border'
                    }`}>
                      {isChecked && <CheckCircle2 size={14} />}
                    </div>
                    <span className="text-xs font-semibold">{item.title}</span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-brand-muted text-xs">
                Для поточного етапу чек-лист не налаштовано
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Documents */}
      {activeTab === 'docs' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">Документи та акти</h2>
              <p className="text-xs text-brand-muted">Готові форми для друку та підпису клієнтом</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {docs.map((d, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-brand-surface2 border border-brand-border space-y-3">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-brand-olive" />
                  <span className="font-bold text-xs">{d.title}</span>
                </div>
                <p className="text-[11px] text-brand-muted">
                  Сформовано автоматично з реквізитами MKV Production
                </p>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full btn btn-secondary btn-sm text-xs justify-center"
                >
                  <Printer size={13} /> Роздрукувати PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Comments */}
      {activeTab === 'comments' && (
        <div className="card p-5 space-y-4">
          <h2 className="text-base font-bold text-brand-text">Коментарі та нотатки майстрів</h2>

          <div className="space-y-3">
            {comments.map((c, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-brand-surface2 border border-brand-border space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-text">{c.author || 'Майстер'}</span>
                  <span className="text-brand-muted font-mono text-[10px]">
                    {c.created_at ? c.created_at.slice(0, 16).replace('T', ' ') : ''}
                  </span>
                </div>
                <p className="text-xs text-brand-muted">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2 pt-3 border-t border-brand-border">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Додати нотатку або коментар до наряду..."
              className="input text-xs"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              <Send size={14} /> Надіслати
            </button>
          </form>
        </div>
      )}

      {/* Tab 8: History */}
      {activeTab === 'history' && (
        <div className="card p-5 space-y-4">
          <h2 className="text-base font-bold text-brand-text">Історія подій замовлення</h2>
          <div className="space-y-2">
            {events.map((ev, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-brand-surface2 text-xs">
                <span className="font-semibold text-brand-text">{ev.text}</span>
                <span className="font-mono text-[10px] text-brand-muted">
                  {ev.created_at ? ev.created_at.slice(0, 16).replace('T', ' ') : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Add Spare Part */}
      {showAddPart && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-brand-text">Додати запчастину до наряду</h3>
            <form onSubmit={handleAddPart} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Найменування</label>
                <input
                  type="text"
                  required
                  value={partName}
                  onChange={e => setPartName(e.target.value)}
                  placeholder="Олива 5W-40, Фільтр масляний..."
                  className="input text-xs"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">К-сть</label>
                  <input
                    type="number"
                    value={partQty}
                    onChange={e => setPartQty(e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Собівартість</label>
                  <input
                    type="number"
                    value={partCost}
                    onChange={e => setPartCost(e.target.value)}
                    placeholder="800"
                    className="input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Ціна (₴)</label>
                  <input
                    type="number"
                    value={partPrice}
                    onChange={e => setPartPrice(e.target.value)}
                    placeholder="1200"
                    className="input text-xs font-mono font-bold"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowAddPart(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Payment */}
      {showAddPayment && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-brand-text">Внесення оплати (ПКО)</h3>
            <form onSubmit={handleAddPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Сума платежу (₴)</label>
                <input
                  type="number"
                  required
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  placeholder="5000"
                  className="input font-mono font-bold text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Форма оплати</label>
                <select
                  value={payMethod}
                  onChange={e => setPayMethod(e.target.value)}
                  className="select text-xs"
                >
                  <option value="cash">Готівка (Головна каса MKV)</option>
                  <option value="card">Банківська картка (POS термінал)</option>
                  <option value="iban">Безготівковий розрахунок IBAN</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Призначення / Коментар</label>
                <input
                  type="text"
                  value={payNote}
                  onChange={e => setPayNote(e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowAddPayment(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Провести платіж
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Rollback Stage */}
      {showRollback && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-brand-text">Откат етапу виробництва</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Повернути на етап:</label>
                <select
                  value={rollbackStageId}
                  onChange={e => setRollbackStageId(e.target.value)}
                  className="select text-xs"
                >
                  <option value="">Оберіть етап...</option>
                  {stages.slice(0, currentStageIndex).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Причина повернення:</label>
                <textarea
                  rows={2}
                  value={rollbackReason}
                  onChange={e => setRollbackReason(e.target.value)}
                  className="textarea text-xs"
                  placeholder="Додаткові роботи, дефект деталі тощо..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowRollback(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="button" onClick={handleRollbackStage} className="btn btn-danger btn-sm">
                  Підтвердити откат
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Assign Staff */}
      {showAssignModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-brand-text">Призначити майстра на замовлення</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Оберіть спеціаліста:</label>
                <select
                  value={selectedAssignee}
                  onChange={e => setSelectedAssignee(e.target.value)}
                  className="select text-xs"
                >
                  <option value="">Не призначено (вільний наряд)</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.full_name} ({u.position})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowAssignModal(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="button" onClick={handleAssignUser} className="btn btn-primary btn-sm">
                  Зберегти
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
