import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  Kanban,
  Search,
  Filter,
  Plus,
  Car,
  User,
  ArrowRight,
  ParkingSquare,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export function BoardScreen() {
  const { t } = useTranslation();
  const { currency, setIsNewOrderModalOpen } = useApp();
  const { navigate } = useRouter();

  const [pipeline, setPipeline] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ parking_count: 0, in_work_count: 0 });
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchPipeline = async () => {
    try {
      setLoading(true);
      const [pipeRes, usersRes, statsRes] = await Promise.all([
        api.get('/orders/pipeline'),
        api.get('/admin/users'),
        api.get('/orders/overview-stats')
      ]);
      setPipeline(pipeRes.stages || []);
      setUsers(usersRes || []);
      setStats(statsRes || { parking_count: 0, in_work_count: 0 });
    } catch (e) {
      console.error('Error fetching pipeline:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline();
    const handleOrderCreated = () => fetchPipeline();
    window.addEventListener('mkv-order-created', handleOrderCreated);
    return () => window.removeEventListener('mkv-order-created', handleOrderCreated);
  }, []);

  const handleAdvance = async (e, orderId) => {
    e.stopPropagation();
    setActionLoadingId(orderId);
    try {
      await api.post(`/orders/${orderId}/confirm-review`);
      await fetchPipeline();
    } catch (err) {
      alert(err.message || 'Помилка зміни етапу');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSendToParking = async (e, orderId) => {
    e.stopPropagation();
    try {
      await api.patch(`/orders/${orderId}`, { on_parking: true });
      await fetchPipeline();
    } catch (err) {
      alert(err.message || 'Не вдалося перемістити на стоянку');
    }
  };

  return (
    <div className="space-y-5 flex flex-col h-[calc(100vh-7rem)]">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Kanban size={22} className="text-brand-olive" />
            {t.board.title}
          </h1>
          <p className="text-xs text-brand-muted">
            {t.board.subtitle}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Counters strip */}
          <div className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-1.5 rounded-lg text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-brand-text">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              {t.board.inWorkCount}: <strong className="font-mono">{stats.in_work_count}</strong>
            </span>
            <span className="text-brand-border">|</span>
            <span 
              onClick={() => navigate('/parking')}
              className="flex items-center gap-1.5 text-brand-sand cursor-pointer hover:underline"
            >
              <ParkingSquare size={13} />
              {t.board.parkingCount}: <strong className="font-mono">{stats.parking_count}</strong>
            </span>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.board.searchPlaceholder}
              className="input pl-8 py-1.5 text-xs"
            />
          </div>

          {/* User Filter */}
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="select py-1.5 text-xs w-auto"
          >
            <option value="">{t.board.allExecutors}</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.full_name}</option>
            ))}
          </select>

          {/* New Order */}
          <button
            type="button"
            onClick={() => setIsNewOrderModalOpen(true)}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">{t.orders.createBtn}</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        {loading && pipeline.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-brand-muted text-sm">
            {t.common.loading}
          </div>
        ) : (
          <div className="flex gap-4 h-full min-w-max">
            {pipeline.map((stage) => {
              // Apply local filters
              let orders = stage.orders || [];
              if (selectedUser) {
                orders = orders.filter(o => String(o.assigned_user_id) === String(selectedUser));
              }
              if (search.trim()) {
                const s = search.toLowerCase();
                orders = orders.filter(o => 
                  (o.plate && o.plate.toLowerCase().includes(s)) ||
                  (o.customer_name && o.customer_name.toLowerCase().includes(s)) ||
                  (o.brand && o.brand.toLowerCase().includes(s)) ||
                  (o.model && o.model.toLowerCase().includes(s))
                );
              }

              return (
                <div
                  key={stage.id}
                  className="w-72 sm:w-80 flex flex-col bg-brand-surface/70 border border-brand-border rounded-xl shadow-sm overflow-hidden shrink-0"
                >
                  {/* Stage Column Header */}
                  <div className="p-3 border-b border-brand-border bg-brand-surface2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: stage.color || '#4A5E38' }}
                      />
                      <span className="font-bold text-xs text-brand-text truncate max-w-[170px]">
                        {stage.name}
                      </span>
                    </div>
                    <span className="badge badge-gray font-mono text-[11px] px-2">
                      {orders.length}
                    </span>
                  </div>

                  {/* Orders Cards List */}
                  <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                    {orders.length === 0 ? (
                      <div className="h-32 flex items-center justify-center border-2 border-dashed border-brand-border/60 rounded-lg text-brand-muted text-xs">
                        {t.board.noOrdersInStage}
                      </div>
                    ) : (
                      orders.map((o) => {
                        const isOverdue = o.deadline_at && new Date(o.deadline_at) < new Date();
                        const assignedUser = users.find(u => u.id === o.assigned_user_id);

                        return (
                          <div
                            key={o.id}
                            onClick={() => navigate(`/orders/${o.id}`)}
                            className="card p-3 hover:border-brand-olive/50 hover:shadow-md cursor-pointer transition-all space-y-2 group"
                          >
                            {/* Card Top Row: Plate & Car */}
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <span className="font-mono text-xs font-black tracking-wide text-brand-sand block">
                                  {o.plate}
                                </span>
                                <h3 className="text-sm font-bold text-brand-text leading-tight group-hover:text-brand-olive transition-colors">
                                  {o.brand} {o.model}
                                </h3>
                              </div>

                              <span className="text-[10px] font-mono font-semibold text-brand-muted">
                                #{o.id}
                              </span>
                            </div>

                            {/* Customer & Issue note */}
                            <div className="text-xs text-brand-muted space-y-0.5">
                              <div className="flex items-center gap-1.5 truncate">
                                <User size={12} className="shrink-0 text-brand-muted" />
                                <span className="truncate">{o.customer_name}</span>
                              </div>
                              {o.comment && (
                                <p className="text-[11px] text-brand-subtle italic truncate">
                                  "{o.comment}"
                                </p>
                              )}
                            </div>

                            {/* Overdue alert */}
                            {isOverdue && (
                              <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-red">
                                <AlertCircle size={12} />
                                Дедлайн сплив
                              </div>
                            )}

                            {/* Card Footer: Assignee, Price, Quick Advance */}
                            <div className="pt-2 border-t border-brand-border flex items-center justify-between text-xs">
                              {/* Assignee / Technician */}
                              <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                                <div className="w-5 h-5 rounded-full bg-brand-surface2 border border-brand-border text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {assignedUser ? assignedUser.full_name.charAt(0) : '?'}
                                </div>
                                <span className="text-[11px] text-brand-muted truncate">
                                  {assignedUser ? assignedUser.full_name.split(' ')[0] : 'Вільний'}
                                </span>
                              </div>

                              {/* Price & Advance Button */}
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-xs text-brand-text">
                                  {formatMoney(o.grand_total, currency)}
                                </span>

                                <button
                                  type="button"
                                  disabled={actionLoadingId === o.id}
                                  onClick={(e) => handleAdvance(e, o.id)}
                                  className="p-1 rounded bg-brand-surface2 hover:bg-brand-olive hover:text-white text-brand-muted transition-colors"
                                  title={t.board.advanceStage}
                                >
                                  <ChevronRight size={15} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
