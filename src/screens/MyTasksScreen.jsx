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
  RotateCcw
} from 'lucide-react';

export function MyTasksScreen() {
  const { t } = useTranslation();
  const { user, isImpersonating } = useApp();
  const { navigate } = useRouter();

  const [orders, setOrders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'tasks'
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
  const handleToggleChecklist = async (orderId, itemId, currentlyChecked) => {
    try {
      if (currentlyChecked) {
        await api.delete(`/orders/${orderId}/checklist/${itemId}/check`);
      } else {
        await api.post(`/orders/${orderId}/checklist/${itemId}/check`, {});
      }
      // Re-fetch to update progress
      fetchAllData();
    } catch (err) {
      console.error('Error updating checklist item:', err);
    }
  };

  // Take task into work
  const handleTakeTask = async (orderId) => {
    try {
      setActionLoading(`take-${orderId}`);
      await api.post(`/orders/${orderId}/take-task`, {});
      fetchAllData();
    } catch (err) {
      alert('Помилка взяття завдання в роботу');
    } finally {
      setActionLoading(null);
    }
  };

  // Complete stage / Move to next
  const handleConfirmStage = async (orderId) => {
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

  // Toggle company task status
  const handleToggleTaskStatus = async (taskId, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'open' : 'completed';
    try {
      await api.patch(`/company-tasks/${taskId}`, { status: nextStatus });
      fetchAllData();
    } catch (err) {
      alert('Помилка зміни статусу завдання');
    }
  };

  const assignedCompanyTasks = tasks.filter(t => 
    !t.assigned_to || 
    t.assigned_to === user?.full_name || 
    user?.position === 'Власник'
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-brand-surface border border-brand-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
              <CheckCheck size={24} className="text-brand-olive" />
              Мої завдання
            </h1>
            <span className="badge badge-accent text-xs">
              {user?.position || 'Власник'}
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            Замовлення на вашому етапі. Візьміть замовлення в роботу, відзначте чек-лист та натисніть «Готово».
          </p>
        </div>

        {/* Current Employee Info Chip */}
        <div className="flex items-center gap-3 self-start md:self-auto p-2 rounded-xl bg-brand-surface2 border border-brand-border">
          <div className="w-9 h-9 rounded-full bg-brand-olive text-white font-bold text-sm flex items-center justify-center">
            {user?.full_name?.charAt(0) || 'М'}
          </div>
          <div className="text-left pr-2">
            <div className="text-xs font-bold text-brand-text">
              {user?.full_name || 'Михайло Шевченко'}
            </div>
            <div className="text-[11px] text-brand-muted">
              {user?.position || 'Власник'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-border pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-brand-olive text-white shadow-sm'
              : 'text-brand-muted hover:text-brand-text bg-brand-surface2 border border-brand-border'
          }`}
        >
          <Car size={15} />
          Замовлення на етапі ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'tasks'
              ? 'bg-brand-olive text-white shadow-sm'
              : 'text-brand-muted hover:text-brand-text bg-brand-surface2 border border-brand-border'
          }`}
        >
          <CheckSquare size={15} />
          Операційні завдання ({assignedCompanyTasks.length})
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="card p-12 text-center text-brand-muted text-xs">
          Завантаження завдань...
        </div>
      ) : activeTab === 'orders' ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="card p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-surface2 mx-auto flex items-center justify-center text-brand-muted">
                <CheckCircle2 size={24} className="text-brand-olive" />
              </div>
              <h3 className="text-sm font-bold text-brand-text">
                На вашому етапі немає активних автомобілів
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                Всі наряди успішно опрацьовані або передані далі за конвеєром.
              </p>
            </div>
          ) : (
            orders.map((o) => {
              const isExpanded = expandedOrderId === o.id;
              const isAssignedToMe = o.assigned_user_id === user?.id;
              const totalItems = o.checklist_total || (o.checklist?.length || 0);
              const completedItems = o.checklist_completed || (o.checked_item_ids?.length || 0);
              const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
              const allItemsDone = totalItems > 0 && completedItems >= totalItems;

              return (
                <div 
                  key={o.id}
                  className="card p-5 space-y-4 hover:border-brand-olive/40 transition-all shadow-sm"
                >
                  {/* Top: Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-brand-surface2 text-brand-sand border border-brand-border">
                          {o.plate}
                        </span>
                        <span className="badge badge-accent text-[11px] font-semibold">
                          {o.stage?.name || 'Ремонт'}
                        </span>
                        <span className="font-mono text-xs text-brand-muted">
                          #{o.id}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-brand-text">
                        {o.brand} {o.model}
                      </h3>
                      <div className="text-xs text-brand-muted flex items-center gap-3">
                        <span>Клієнт: <strong className="text-brand-text">{o.customer_name}</strong></span>
                        {o.assigned_user_name && (
                          <span>• Майстер: <strong className="text-brand-olive">{o.assigned_user_name}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!isAssignedToMe && (
                        <button
                          type="button"
                          onClick={() => handleTakeTask(o.id)}
                          disabled={actionLoading === `take-${o.id}`}
                          className="btn btn-secondary btn-sm text-xs font-bold"
                          title="Закріпити замовлення за собою"
                        >
                          <UserCheck size={14} /> Взяти в роботу
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleConfirmStage(o.id)}
                        disabled={actionLoading === `advance-${o.id}`}
                        className={`btn btn-sm text-xs font-bold ${
                          allItemsDone 
                            ? 'btn-primary shadow-md shadow-brand-olive/30 ring-2 ring-brand-olive/50' 
                            : 'btn-secondary text-brand-sand'
                        }`}
                        title="Завершити етап та перевести автомобіль далі"
                      >
                        <CheckCircle2 size={14} /> {allItemsDone ? 'Готово (перевести далі)' : 'Завершити етап'}
                      </button>

                      <button
                        type="button"
                        onClick={() => navigate(`/orders/${o.id}`)}
                        className="btn btn-ghost btn-sm text-brand-olive hover:text-white"
                        title="Відкрити повну картку наряду"
                      >
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Checklist Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-brand-muted flex items-center gap-1.5">
                        <ListTodo size={14} className="text-brand-olive" />
                        Контрольний чек-лист етапу
                      </span>
                      <span className="font-mono text-brand-text">
                        {completedItems} з {totalItems}
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full h-2 rounded-full bg-brand-surface2 overflow-hidden border border-brand-border">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          allItemsDone ? 'bg-brand-green' : 'bg-brand-olive'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Expand / Collapse Checklist button */}
                  {o.checklist && o.checklist.length > 0 && (
                    <div className="pt-2 border-t border-brand-border/60">
                      <button
                        type="button"
                        onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                        className="text-xs font-bold text-brand-olive hover:underline flex items-center gap-1.5"
                      >
                        {isExpanded ? (
                          <>Згорнути чек-лист <ChevronUp size={14} /></>
                        ) : (
                          <>Показати пункти контролю ({o.checklist.length}) <ChevronDown size={14} /></>
                        )}
                      </button>

                      {/* Interactive Checklist items */}
                      {isExpanded && (
                        <div className="mt-3 space-y-2 p-3 rounded-xl bg-brand-surface2/60 border border-brand-border animate-in fade-in duration-200">
                          {o.checklist.map((item) => {
                            const isChecked = (o.checked_item_ids || []).includes(item.id);
                            return (
                              <label
                                key={item.id}
                                className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors text-xs select-none ${
                                  isChecked 
                                    ? 'bg-brand-surface text-brand-muted line-through' 
                                    : 'hover:bg-brand-surfaceHover text-brand-text font-medium'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleChecklist(o.id, item.id, isChecked)}
                                  className="mt-0.5 rounded border-brand-border text-brand-olive focus:ring-brand-olive"
                                />
                                <span>{item.text}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Operational Tasks Tab */
        <div className="space-y-3">
          {assignedCompanyTasks.length === 0 ? (
            <div className="card p-12 text-center text-brand-muted text-xs">
              Операційних завдань немає
            </div>
          ) : (
            assignedCompanyTasks.map((t) => {
              const isCompleted = t.status === 'completed';
              return (
                <div
                  key={t.id}
                  className={`card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isCompleted ? 'opacity-60 bg-brand-surface2' : 'hover:border-brand-olive/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleTaskStatus(t.id, t.status)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isCompleted ? 'bg-brand-green border-brand-green text-white' : 'border-brand-border hover:border-brand-olive'
                      }`}
                      title={isCompleted ? "Повернути у відкриті" : "Позначити виконаним"}
                    >
                      {isCompleted && <CheckCircle2 size={14} />}
                    </button>

                    <div className="space-y-1">
                      <span className={`text-sm font-bold block ${isCompleted ? 'line-through text-brand-muted' : 'text-brand-text'}`}>
                        {t.title}
                      </span>
                      {t.description && (
                        <p className="text-xs text-brand-muted">
                          {t.description}
                        </p>
                      )}
                      <div className="text-[11px] text-brand-muted pt-1 flex items-center gap-3">
                        <span>Виконавець: <strong className="text-brand-text">{t.assigned_to || 'Не призначено'}</strong></span>
                        {t.created_at && (
                          <span className="font-mono">{t.created_at.slice(0, 10)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`badge text-[11px] self-end sm:self-center ${
                    t.priority === 'high' ? 'badge-red' : t.priority === 'low' ? 'badge-gray' : 'badge-yellow'
                  }`}>
                    {t.priority === 'high' ? 'Терміновий' : t.priority === 'low' ? 'Низький' : 'Звичайний'}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
