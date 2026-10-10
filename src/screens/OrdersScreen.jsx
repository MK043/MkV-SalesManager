import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  FileText,
  Search,
  Plus,
  Car,
  User,
  Filter,
  CheckCircle2,
  Clock,
  ParkingSquare,
  AlertCircle
} from 'lucide-react';

export function OrdersScreen() {
  const { t } = useTranslation();
  const { currency, setIsNewOrderModalOpen } = useApp();
  const { navigate } = useRouter();

  const [orders, setOrders] = useState([]);
  const [stages, setStages] = useState([]);
  const [statusTab, setStatusTab] = useState('all'); // all, in_progress, completed, parking
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const [ordersRes, stagesRes] = await Promise.all([
        api.get('/orders'),
        api.get('/admin/stages')
      ]);
      setOrders(ordersRes || []);
      setStages(stagesRes || []);
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const handleCreated = () => fetchOrders();
    window.addEventListener('mkv-order-created', handleCreated);
    return () => window.removeEventListener('mkv-order-created', handleCreated);
  }, []);

  const filteredOrders = orders.filter(o => {
    if (statusTab === 'in_progress' && (o.status !== 'in_progress' || o.on_parking)) return false;
    if (statusTab === 'completed' && o.status !== 'completed') return false;
    if (statusTab === 'parking' && !o.on_parking) return false;

    if (search.trim()) {
      const s = search.toLowerCase();
      const matchPlate = o.plate && o.plate.toLowerCase().includes(s);
      const matchCustomer = o.customer_name && o.customer_name.toLowerCase().includes(s);
      const matchVehicle = (o.brand && o.brand.toLowerCase().includes(s)) || (o.model && o.model.toLowerCase().includes(s));
      const matchId = String(o.id).includes(s);
      return matchPlate || matchCustomer || matchVehicle || matchId;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <FileText size={22} className="text-brand-olive" />
            {t.orders.title}
          </h1>
          <p className="text-xs text-brand-muted">
            Повний реєстр замовлень-нарядів, статусів оплати та виробничих етапів
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewOrderModalOpen(true)}
          className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 self-start sm:self-auto"
        >
          <Plus size={16} /> {t.orders.createBtn}
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="card p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: t.orders.filterAll, count: orders.length },
            { id: 'in_progress', label: t.orders.statusInWork, count: orders.filter(o => o.status === 'in_progress' && !o.on_parking).length },
            { id: 'parking', label: t.orders.statusParking, count: orders.filter(o => o.on_parking).length },
            { id: 'completed', label: t.orders.statusCompleted, count: orders.filter(o => o.status === 'completed').length }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                statusTab === tab.id
                  ? 'bg-brand-olive text-white shadow-sm'
                  : 'bg-brand-surface2 text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                statusTab === tab.id ? 'bg-black/20 text-white' : 'bg-brand-border text-brand-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Пошук за номером, клієнтом, авто..."
            className="input pl-8 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* Mobile Card List */}
      <div className="block md:hidden space-y-3">
        {loading ? (
          <div className="card p-8 text-center text-xs text-brand-muted">
            {t.common.loading}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="card p-8 text-center text-xs text-brand-muted">
            {t.common.noData}
          </div>
        ) : (
          filteredOrders.map((o) => {
            const stage = stages.find(s => s.id === o.current_stage_id) || o.stage;
            const total = Number(o.grand_total) || 20000;
            const paid = Number(o.paid_total) || 0;
            const balance = Math.max(0, total - paid);

            return (
              <div
                key={o.id}
                onClick={() => navigate(`/orders/${o.id}`)}
                className="card p-4 space-y-2.5 active:scale-[0.99] transition-all cursor-pointer border border-brand-border hover:border-brand-olive/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-muted">
                    #{o.id}
                  </span>
                  <span
                    className="badge text-[11px] font-semibold"
                    style={{
                      backgroundColor: `${stage?.color || '#4A5E38'}20`,
                      color: stage?.color || '#4A5E38',
                      borderColor: `${stage?.color || '#4A5E38'}40`
                    }}
                  >
                    {stage?.name || 'Прийомка'}
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-brand-text">
                      {o.brand} {o.model}
                    </h3>
                    <div className="text-xs text-brand-muted mt-0.5">
                      Клієнт: <strong className="text-brand-text">{o.customer_name}</strong>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-brand-surface2 text-brand-sand border border-brand-border">
                    {o.plate}
                  </span>
                </div>

                <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="text-brand-muted text-[11px] block">Сума наряду:</span>
                    <strong className="text-brand-text font-mono">{formatMoney(total, currency)}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-muted text-[11px] block">Оплачено:</span>
                    <span className="text-brand-green font-mono font-bold">{formatMoney(paid, currency)}</span>
                  </div>
                  {balance > 0 && (
                    <div className="text-right">
                      <span className="text-brand-muted text-[11px] block">Залишок:</span>
                      <span className="text-brand-orange font-mono font-bold">{formatMoney(balance, currency)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>{t.orders.orderNumber}</th>
                <th>{t.orders.vehicle} / {t.orders.plate}</th>
                <th>{t.orders.client}</th>
                <th>{t.orders.currentStage}</th>
                <th>{t.orders.status}</th>
                <th className="text-right">{t.orders.totalAmount}</th>
                <th className="text-right">{t.orders.paidAmount}</th>
                <th className="text-right">{t.orders.balance}</th>
                <th>{t.orders.createdAt}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.noData}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const stage = stages.find(s => s.id === o.current_stage_id) || o.stage;
                  const total = Number(o.grand_total) || 20000;
                  const paid = Number(o.paid_total) || 0;
                  const balance = Math.max(0, total - paid);

                  return (
                    <tr
                      key={o.id}
                      onClick={() => navigate(`/orders/${o.id}`)}
                      className="cursor-pointer hover:bg-brand-surfaceHover transition-colors"
                    >
                      <td className="font-mono font-bold text-xs text-brand-muted">
                        #{o.id}
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-text leading-tight">
                            {o.brand} {o.model}
                          </span>
                          <span className="font-mono text-xs text-brand-sand font-semibold">
                            {o.plate}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-brand-text">
                            {o.customer_name}
                          </span>
                          <span className="text-xs text-brand-muted font-mono">
                            {o.customer_phone}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="badge text-xs font-semibold"
                          style={{
                            backgroundColor: `${stage?.color || '#4A5E38'}20`,
                            color: stage?.color || '#4A5E38',
                            borderColor: `${stage?.color || '#4A5E38'}40`
                          }}
                        >
                          {stage?.name || 'Прийомка'}
                        </span>
                      </td>
                      <td>
                        {o.status === 'completed' ? (
                          <span className="badge badge-green">Завершено</span>
                        ) : o.on_parking ? (
                          <span className="badge badge-yellow">Стоянка</span>
                        ) : (
                          <span className="badge badge-accent">В роботі</span>
                        )}
                      </td>
                      <td className="text-right font-mono font-semibold text-xs">
                        {formatMoney(total, currency)}
                      </td>
                      <td className="text-right font-mono text-xs text-brand-green">
                        {formatMoney(paid, currency)}
                      </td>
                      <td className="text-right font-mono font-bold text-xs text-brand-orange">
                        {balance > 0 ? formatMoney(balance, currency) : '—'}
                      </td>
                      <td className="text-xs font-mono text-brand-muted">
                        {o.created_at ? o.created_at.slice(0, 10) : '—'}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/orders/${o.id}`);
                          }}
                          className="btn btn-ghost btn-sm text-xs"
                        >
                          Картка →
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
