import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import {
  CheckCheck,
  CheckCircle2,
  Circle,
  Car,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  UserCheck,
  AlertCircle,
  ListTodo,
  CheckSquare,
  Wrench,
  RotateCcw,
  ExternalLink,
  Calendar,
  Sparkles
} from 'lucide-react';

export function MyTasksScreen() {
  const { t } = useTranslation();
  const { user, isImpersonating } = useApp();
  const { navigate } = useRouter();

  const [orders, setOrders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [myOrdersData, companyTasksData] = await Promise.all([
        api.get('/orders/my-tasks'),
        api.get('/company-tasks')
      ]);
      setOrders(myOrdersData || []);
      setTasks(companyTasksData || []);
    } catch (e) {
      console.error('Error fetching my-tasks data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    const handleSwitched = () => {
      fetchAllData();
    };
    window.addEventListener('mkv-user-switched', handleSwitched);
    return () => window.removeEventListener('mkv-user-switched', handleSwitched);
  }, [fetchAllData]);

  // Toggle checklist item
  const handleToggleChecklist = async (orderId, itemId, currentlyChecked, e) => {
    if (e) e.stopPropagation();
    try {
      // Optimistic update
      setOrders(prev => prev.map(o => {
        if (o.id !== orderId) return o;
        const sub = o.checked_item_ids || [];
        const nextChecked = currentlyChecked 
          ? sub.filter(id => id !== itemId)
          : [...sub, itemId];
        return {
          ...o,
          checked_item_ids: nextChecked,
          checklist_completed: nextChecked.length
        };
      }));

      if (currentlyChecked) {
        await api.delete(`/orders/${orderId}/checklist/${itemId}/check`);
      } else {
        await api.post(`/orders/${orderId}/checklist/${itemId}/check`, {});
      }
      fetchAllData();
    } catch (err) {
      console.error('Error updating checklist item:', err);
      fetchAllData();
    }
  };

  // Take task into work
  const handleTakeTask = async (orderId, e) => {
    if (e) e.stopPropagation();
    try {
      setActionLoading(`take-${orderId}`);
      await api.post(`/orders/${orderId}/take-task`, {});
      fetchAllData();
    } catch (err) {
      alert('Помилка закріплення завдання');
    } finally {
      setActionLoading(null);
    }
  };

  // Complete stage / Move to next
  const handleConfirmStage = async (orderId, e) => {
    if (e) e.stopPropagation();
    try {
      setActionLoading(`advance-${orderId}`);
      await api.post(`/orders/${orderId}/confirm-review`, {});
      fetchAllData();
    } catch (err) {
      alert('Помилка підтвердження виконання етапу');
    } finally {
      setActionLoading(null);
    }
  };

  // Group orders by dates/status like in Image 2
  const groupOrders = (ordersList) => {
    const groups = {};
    ordersList.forEach(o => {
      // Create friendly date label
      let label = 'Поточні замовлення';
      if (o.deadline_at) {
        try {
          const d = new Date(o.deadline_at);
          const day = d.getDate();
          const months = [
            'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
            'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
          ];
          label = `${day} ${months[d.getMonth()]} 2026 р.`;
        } catch {
          label = 'Поточні замовлення';
        }
      }
      if (!groups[label]) groups[label] = [];
      groups[label].push(o);
    });
    return groups;
  };

  const grouped = groupOrders(orders);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Title & Subtitle exactly matching Image 2 */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-display text-brand-text flex items-center gap-2.5">
          <span>Мої завдання</span>
          {user?.position && user.position !== 'Власник' && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-olive/20 text-brand-olive border border-brand-olive/30 font-sans">
              {user.position}
            </span>
          )}
        </h1>
        <p className="text-xs text-brand-muted">
          Замовлення на вашому етапі. Візьміть замовлення в роботу, відмітьте чек-лист і натисніть «Готово».
        </p>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="p-12 text-center text-brand-muted text-xs">
          Завантаження завдань майстра...
        </div>
      ) : orders.length === 0 ? (
        <div className="card p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-surface2 mx-auto flex items-center justify-center text-brand-muted">
            <CheckCircle2 size={24} className="text-brand-olive" />
          </div>
          <h3 className="text-sm font-bold text-brand-text">
            На вашому етапі немає активних завдань
          </h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Всі автомобілі опрацьовані або передані за конвеєром. Очікуйте нових призначень.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([dateLabel, items]) => (
            <div key={dateLabel} className="space-y-2.5">
              {/* Group Date Header (exact style as Image 2: "4 жовтня 2026 р.  2") */}
              <div className="text-xs font-semibold text-brand-muted flex items-center gap-2 px-1">
                <span>{dateLabel}</span>
                <span className="text-brand-muted/70">{items.length}</span>
              </div>

              {/* Group Cards */}
              <div className="space-y-2.5">
                {items.map((o) => {
                  const isExpanded = expandedOrderId === o.id;
                  const isAssignedToMe = o.assigned_user_id === user?.id;
                  
                  // Compute checklist counts
                  const checklist = o.checklist || [];
                  const checkedIds = o.checked_item_ids || [];
                  const totalItems = checklist.length > 0 ? checklist.length : (o.checklist_total || 4);
                  const completedItems = checkedIds.length > 0 ? checkedIds.length : (o.checklist_completed || 0);
                  const progressRatio = totalItems > 0 ? Math.min(100, Math.round((completedItems / totalItems) * 100)) : 0;
                  const isAllDone = totalItems > 0 && completedItems >= totalItems;

                  return (
                    <div
                      key={o.id}
                      onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                      className={`rounded-xl border transition-all cursor-pointer p-4 ${
                        isExpanded
                          ? 'bg-brand-surface border-brand-olive shadow-lg ring-1 ring-brand-olive/20'
                          : 'bg-[#12141a] hover:bg-[#161922] border-[#222530] hover:border-[#323646]'
                      }`}
                    >
                      {/* Top: Car Name */}
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-brand-text">
                          {o.brand} {o.model}
                        </h3>
                        <span className="text-[11px] font-mono text-brand-muted">
                          #{o.id}
                        </span>
                      </div>

                      {/* Subline: Plate · Stage */}
                      <div className="text-xs text-brand-muted mt-0.5 flex items-center gap-1.5 font-medium">
                        <span className="font-mono text-brand-sand font-bold">{o.plate}</span>
                        <span>·</span>
                        <span>{o.stage?.name || 'Ремонт'}</span>
                        {o.assigned_user_name && (
                          <>
                            <span>·</span>
                            <span className="text-brand-olive">{o.assigned_user_name}</span>
                          </>
                        )}
                      </div>

                      {/* Progress bar + Counter (Image 2 style) */}
                      <div className="mt-3.5 space-y-1">
                        <div className="flex items-center justify-between text-xs text-brand-muted">
                          <span className="text-[11px]">
                            {completedItems === 0 ? 'Не розпочато' : isAllDone ? 'Всі роботи виконано' : 'У процесі'}
                          </span>
                          <span className="text-xs font-semibold text-brand-text">
                            {completedItems} із {totalItems}
                          </span>
                        </div>

                        {/* Full width progress bar */}
                        <div className="h-1.5 w-full bg-[#1e222d] rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 rounded-full ${
                              isAllDone 
                                ? 'bg-emerald-500' 
                                : completedItems > 0 
                                ? 'bg-[#f97316]' 
                                : 'bg-transparent'
                            }`}
                            style={{ width: `${progressRatio}%` }}
                          />
                        </div>
                      </div>

                      {/* Interactive Expanded Checklist Section */}
                      {isExpanded && (
                        <div 
                          className="mt-4 pt-4 border-t border-brand-border space-y-3.5 animate-in fade-in duration-150"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-sand uppercase tracking-wider flex items-center gap-1.5">
                              <ListTodo size={13} />
                              Чек-лист робіт для відмітки:
                            </span>
                            <span className="text-[11px] text-brand-muted">
                              Натисніть на пункт для відмітки прогресу
                            </span>
                          </div>

                          {/* Checklist items */}
                          <div className="space-y-2">
                            {checklist.length === 0 ? (
                              // Default standard works if no custom checklist
                              [
                                { id: 1, title: 'Компʼютерна діагностика та огляд вузлів' },
                                { id: 2, title: 'Заміна технічних рідин та фільтрів' },
                                { id: 3, title: 'Слюсарні та регулювальні роботи' },
                                { id: 4, title: 'Фінальна перевірка та контроль затяжки' }
                              ].map(item => {
                                const checked = checkedIds.includes(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    onClick={(e) => handleToggleChecklist(o.id, item.id, checked, e)}
                                    className={`flex items-center gap-3.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all select-none min-h-[48px] active:scale-[0.99] ${
                                      checked
                                        ? 'bg-brand-olive/20 border-brand-olive/50 text-brand-text'
                                        : 'bg-[#151822] border-[#252938] text-gray-300 hover:text-white hover:bg-[#1a1e2b]'
                                    }`}
                                  >
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                                      checked 
                                        ? 'bg-brand-olive border-brand-olive text-white' 
                                        : 'border-gray-500 bg-[#0f1118]'
                                    }`}>
                                      {checked && <CheckCheck size={14} />}
                                    </div>
                                    <span className={checked ? 'line-through text-brand-muted' : 'font-medium'}>
                                      {item.title}
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              checklist.map(item => {
                                const checked = checkedIds.includes(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    onClick={(e) => handleToggleChecklist(o.id, item.id, checked, e)}
                                    className={`flex items-center gap-3.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all select-none min-h-[48px] active:scale-[0.99] ${
                                      checked
                                        ? 'bg-brand-olive/20 border-brand-olive/50 text-brand-text'
                                        : 'bg-[#151822] border-[#252938] text-gray-300 hover:text-white hover:bg-[#1a1e2b]'
                                    }`}
                                  >
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                                      checked 
                                        ? 'bg-brand-olive border-brand-olive text-white' 
                                        : 'border-gray-500 bg-[#0f1118]'
                                    }`}>
                                      {checked && <CheckCheck size={14} />}
                                    </div>
                                    <span className={checked ? 'line-through text-brand-muted' : 'font-medium'}>
                                      {item.title}
                                    </span>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* Bottom Action Buttons (Stacked on mobile, row on tablet/desktop) */}
                          <div className="pt-3 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                              {!isAssignedToMe && (
                                <button
                                  type="button"
                                  onClick={(e) => handleTakeTask(o.id, e)}
                                  disabled={actionLoading === `take-${o.id}`}
                                  className="btn btn-secondary py-2.5 sm:py-1.5 px-3 min-h-[44px] sm:min-h-0 text-xs font-bold flex items-center justify-center gap-1.5"
                                >
                                  <UserCheck size={14} />
                                  <span>{actionLoading === `take-${o.id}` ? 'Закріплення...' : 'Взяти в роботу'}</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={(e) => handleConfirmStage(o.id, e)}
                                disabled={actionLoading === `advance-${o.id}`}
                                className={`btn py-2.5 sm:py-1.5 px-4 min-h-[44px] sm:min-h-0 text-xs font-bold flex items-center justify-center gap-1.5 ${
                                  isAllDone 
                                    ? 'btn-primary shadow-lg shadow-brand-olive/30' 
                                    : 'btn-secondary text-brand-sand'
                                }`}
                              >
                                <CheckCheck size={14} />
                                <span>{actionLoading === `advance-${o.id}` ? 'Передача...' : 'Готово (Передати далі)'}</span>
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/orders/${o.id}`);
                              }}
                              className="text-xs text-brand-muted hover:text-brand-text flex items-center justify-center sm:justify-start gap-1 py-1 font-medium"
                            >
                              <span>Повний заказ-наряд</span>
                              <ExternalLink size={12} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
