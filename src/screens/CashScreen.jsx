import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Building,
  CheckCircle2
} from 'lucide-react';

export function CashScreen() {
  const { t } = useTranslation();
  const { currency } = useApp();

  const [flow, setFlow] = useState({ balance: 0, total_in: 0, total_out: 0, today_in: 0, today_out: 0 });
  const [cashOrders, setCashOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [direction, setDirection] = useState('in');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [note, setNote] = useState('');

  const fetchCash = async () => {
    try {
      setLoading(true);
      const [flowRes, ordersRes] = await Promise.all([
        api.get('/cash/flow'),
        api.get('/cash/orders')
      ]);
      setFlow(flowRes || {});
      setCashOrders(ordersRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCash();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!Number(amount)) return;
    try {
      await api.post('/cash/orders', {
        direction,
        amount: Number(amount),
        payment_method: paymentMethod,
        note: note || (direction === 'in' ? 'Прибутковий касовий ордер' : 'Видатковий касовий ордер')
      });
      setShowModal(false);
      setAmount('');
      setNote('');
      fetchCash();
    } catch (err) {
      alert(err.message || 'Помилка створення касового ордера');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Wallet size={22} className="text-brand-olive" />
            {t.cash.title}
          </h1>
          <p className="text-xs text-brand-muted">
            {t.cash.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 self-start sm:self-auto"
        >
          <Plus size={16} /> {t.cash.newOrderBtn}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted">
            <span>{t.cash.currentBalance}</span>
            <Wallet size={16} className="text-brand-olive" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-text">
            {formatMoney(flow.balance, currency)}
          </div>
          <p className="text-xs text-brand-muted">Загальний операційний залишок</p>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted">
            <span>{t.cash.todayIncome}</span>
            <TrendingUp size={16} className="text-brand-green" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-green">
            +{formatMoney(flow.today_in, currency)}
          </div>
          <p className="text-xs text-brand-muted">Прибуткові касові ордери (ПКО)</p>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted">
            <span>{t.cash.todayExpense}</span>
            <TrendingDown size={16} className="text-brand-red" />
          </div>
          <div className="text-3xl font-extrabold font-display text-brand-red">
            -{formatMoney(flow.today_out, currency)}
          </div>
          <p className="text-xs text-brand-muted">Видаткові касові ордери (РКО)</p>
        </div>
      </div>

      {/* Cash Orders Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-surface2">
          <h2 className="text-sm font-bold text-brand-text">Журнал касових ордерів</h2>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>№ Ордера</th>
                <th>Тип операції</th>
                <th>Дата та час</th>
                <th>Форма оплати</th>
                <th className="text-right">Сума операції</th>
                <th>Призначення платежу</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : cashOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-muted text-xs">
                    Записів касових ордерів немає
                  </td>
                </tr>
              ) : (
                cashOrders.map(co => (
                  <tr key={co.id}>
                    <td className="font-mono text-xs font-bold text-brand-muted">
                      #{co.id}
                    </td>
                    <td>
                      {co.direction === 'in' ? (
                        <span className="badge badge-green text-xs flex items-center gap-1 w-max">
                          <ArrowDownRight size={12} /> {t.cash.typeIncome}
                        </span>
                      ) : (
                        <span className="badge badge-red text-xs flex items-center gap-1 w-max">
                          <ArrowUpRight size={12} /> {t.cash.typeExpense}
                        </span>
                      )}
                    </td>
                    <td className="font-mono text-xs text-brand-muted">
                      {co.created_at ? co.created_at.slice(0, 16).replace('T', ' ') : '—'}
                    </td>
                    <td>
                      <span className="badge badge-gray text-xs">
                        {co.payment_method === 'cash' ? t.cash.methodCash :
                         co.payment_method === 'card' ? t.cash.methodCard : t.cash.methodIban}
                      </span>
                    </td>
                    <td className={`text-right font-mono font-bold text-xs ${
                      co.direction === 'in' ? 'text-brand-green' : 'text-brand-red'
                    }`}>
                      {co.direction === 'in' ? '+' : '-'}{formatMoney(co.amount, currency)}
                    </td>
                    <td className="text-xs text-brand-text">
                      {co.note || 'Касова транзакція'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Cash Order */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text">{t.cash.newOrderBtn}</h3>
            <form onSubmit={handleCreateOrder} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Напрямок операції</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDirection('in')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                      direction === 'in' ? 'bg-brand-green/20 border-brand-green text-brand-green' : 'bg-brand-surface2 border-brand-border text-brand-muted'
                    }`}
                  >
                    + Прихід (ПКО)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection('out')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                      direction === 'out' ? 'bg-brand-red/20 border-brand-red text-brand-red' : 'bg-brand-surface2 border-brand-border text-brand-muted'
                    }`}
                  >
                    - Витрата (РКО)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Сума (₴)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input font-mono font-bold text-base"
                  placeholder="3500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Форма розрахунку</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                  className="select text-xs"
                >
                  <option value="cash">{t.cash.methodCash}</option>
                  <option value="card">{t.cash.methodCard}</option>
                  <option value="iban">{t.cash.methodIban}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Призначення платежу / Коментар</label>
                <input
                  type="text"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="input text-xs"
                  placeholder="Оплата робіт, видача під звіт, інкасація..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Провести касовий ордер
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
