import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Package
} from 'lucide-react';

export function PartsScreen() {
  const { t } = useTranslation();
  const { currency } = useApp();
  const { navigate } = useRouter();

  const [partsList, setPartsList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchParts = async () => {
    try {
      setLoading(true);
      const ordersRes = await api.get('/orders');
      setOrders(ordersRes || []);

      // Gather all parts across orders
      const allParts = [];
      for (const o of (ordersRes || []).slice(0, 20)) {
        try {
          const p = await api.get(`/orders/${o.id}/parts`);
          if (Array.isArray(p)) {
            p.forEach(item => {
              allParts.push({
                ...item,
                order_id: o.id,
                plate: o.plate,
                car: `${o.brand} ${o.model}`
              });
            });
          }
        } catch {}
      }
      setPartsList(allParts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handleMarkArrived = async (orderId, partId) => {
    try {
      await api.patch(`/orders/${orderId}/parts/${partId}`, { status: 'arrived' });
      fetchParts();
    } catch (err) {
      alert('Помилка оновлення статусу');
    }
  };

  const filtered = partsList.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (p.name && p.name.toLowerCase().includes(s)) ||
             (p.plate && p.plate.toLowerCase().includes(s)) ||
             (p.car && p.car.toLowerCase().includes(s));
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Wrench size={22} className="text-brand-olive" />
            {t.parts.title}
          </h1>
          <p className="text-xs text-brand-muted">
            {t.parts.subtitle}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Всі статуси' },
            { id: 'needed', label: t.parts.statusNeeded },
            { id: 'ordered', label: t.parts.statusOrdered },
            { id: 'arrived', label: t.parts.statusArrived }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-brand-olive text-white shadow-sm'
                  : 'bg-brand-surface2 text-brand-muted hover:text-brand-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Пошук деталі або номера авто..."
            className="input pl-8 py-1.5 text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Деталь / Позиція</th>
                <th>Автомобіль / Держномер</th>
                <th>№ Наряду</th>
                <th>К-сть</th>
                <th className="text-right">Собівартість</th>
                <th className="text-right">Ціна продажу</th>
                <th>Статус постачання</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-brand-muted text-xs">
                    Замовлень запчастин за цим фільтром не знайдено
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={`${p.order_id}-${p.id}`}>
                    <td className="font-bold text-brand-text">{p.name}</td>
                    <td>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{p.car}</span>
                        <span className="font-mono text-[11px] text-brand-sand">{p.plate}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-brand-muted">
                      #{p.order_id}
                    </td>
                    <td className="font-mono text-xs">{p.qty || 1} шт</td>
                    <td className="text-right font-mono text-xs text-brand-muted">
                      {formatMoney(p.cost, currency)}
                    </td>
                    <td className="text-right font-mono font-bold text-xs text-brand-green">
                      {formatMoney(p.price, currency)}
                    </td>
                    <td>
                      <span className="badge badge-accent text-xs">
                        {p.status === 'arrived' ? t.parts.statusArrived :
                         p.status === 'ordered' ? t.parts.statusOrdered : t.parts.statusNeeded}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        {p.status !== 'arrived' && (
                          <button
                            type="button"
                            onClick={() => handleMarkArrived(p.order_id, p.id)}
                            className="btn btn-primary btn-sm text-[11px]"
                            title="Позначити як прибуло"
                          >
                            <CheckCircle2 size={12} /> Отримано
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => navigate(`/orders/${p.order_id}`)}
                          className="btn btn-ghost btn-sm text-xs"
                          title="Відкрити наряд"
                        >
                          Наряд →
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
