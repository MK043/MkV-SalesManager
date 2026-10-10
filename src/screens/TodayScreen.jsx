import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  TrendingUp,
  AlertCircle,
  Car,
  Clock,
  ArrowRight,
  Plus,
  Calendar,
  Wallet,
  Users,
  CheckCircle2,
  ParkingSquare
} from 'lucide-react';

export function TodayScreen() {
  const { t } = useTranslation();
  const { currency, setIsNewOrderModalOpen } = useApp();
  const { navigate } = useRouter();

  const [data, setData] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToday = async () => {
    try {
      setLoading(true);
      const [todayRes, shiftsRes] = await Promise.all([
        api.get('/dashboard/today'),
        api.get('/shifts/active')
      ]);
      setData(todayRes);
      setShifts(shiftsRes || []);
    } catch (err) {
      setError(err.message || 'Не вдалося завантажити зведення');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
    const handleOrderCreated = () => fetchToday();
    window.addEventListener('mkv-order-created', handleOrderCreated);
    return () => window.removeEventListener('mkv-order-created', handleOrderCreated);
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-brand-olive border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-brand-muted">{t.common.loading}</span>
        </div>
      </div>
    );
  }

  const money = data?.money || { today_amount: 0, today_count: 0, yesterday_amount: 0, delta_amount: 0, week: [] };
  const debts = data?.debts || { total: 0, orders_count: 0, top: [] };
  const cars = data?.cars || { in_work_count: 0, overdue_count: 0, parking_count: 0, intake_today_count: 0, issued_today_count: 0 };

  const maxWeekAmount = Math.max(...(money.week?.map(w => w.amount) || [1]), 10000);

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-brand-text flex items-center gap-2.5">
            {t.today.title}
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-brand-surface2 border border-brand-border text-brand-muted">
              {data?.date || new Date().toISOString().slice(0, 10)}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
            Операційна аналітика цеху, фінансові показники та завантаження персоналу
          </p>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsNewOrderModalOpen(true)}
            className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 flex-1 sm:flex-initial justify-center py-2 min-h-[38px]"
          >
            <Plus size={15} /> {t.today.createOrderBtn}
          </button>
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            className="btn btn-secondary btn-sm flex-1 sm:flex-initial justify-center py-2 min-h-[38px]"
          >
            <Calendar size={15} /> {t.today.createBookingBtn}
          </button>
          <button
            type="button"
            onClick={() => navigate('/cash')}
            className="btn btn-secondary btn-sm flex-1 sm:flex-initial justify-center py-2 min-h-[38px]"
          >
            <Wallet size={15} /> {t.today.openCashBtn}
          </button>
        </div>
      </div>

      {/* Grid: 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Today Revenue & Week Sparkline */}
        <div className="card p-5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
              <span>{t.today.moneyTitle}</span>
              <TrendingUp size={16} className="text-brand-green" />
            </div>

            <div className="text-3xl font-extrabold font-display text-brand-text tracking-tight">
              {formatMoney(money.today_amount, currency)}
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="badge badge-green font-mono">
                {money.today_count} {t.today.paymentsCount}
              </span>
              <span className="text-brand-muted">
                {money.delta_amount >= 0 ? `+${formatMoney(money.delta_amount, currency)}` : formatMoney(money.delta_amount, currency)} {t.today.yesterdayComparison}
              </span>
            </div>
          </div>

          {/* 7-Day Sparkline Bar Chart */}
          <div className="mt-5 pt-4 border-t border-brand-border">
            <span className="text-[11px] font-semibold text-brand-muted block mb-2">
              {t.today.weekSparkline}
            </span>
            <div className="h-14 flex items-end gap-1.5">
              {money.week?.map((w, idx) => {
                const heightPct = Math.max(12, Math.round((w.amount / maxWeekAmount) * 100));
                const isToday = idx === money.week.length - 1;
                return (
                  <div key={w.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all ${
                        isToday ? 'bg-brand-olive' : 'bg-brand-surface2 group-hover:bg-brand-sand'
                      }`}
                    />
                    <span className="text-[9px] font-mono text-brand-subtle">
                      {w.date.slice(8)}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute -top-7 scale-0 group-hover:scale-100 transition-transform bg-brand-surface border border-brand-border px-1.5 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md z-10 pointer-events-none">
                      {formatMoney(w.amount, currency)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 2: Customer Debts */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
              <span>{t.today.debtsTitle}</span>
              <AlertCircle size={16} className="text-brand-orange" />
            </div>

            <div className="text-3xl font-extrabold font-display text-brand-text tracking-tight text-brand-orange">
              {formatMoney(debts.total, currency)}
            </div>

            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="badge badge-orange font-mono">
                {debts.orders_count} {t.today.debtsOrdersCount}
              </span>
              <span className="text-brand-muted">
                {t.today.debtsTotal}
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-brand-border flex items-center justify-between">
            <span className="text-xs text-brand-muted">Переглянути звіт по дебіторці</span>
            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="text-xs font-semibold text-brand-olive hover:underline flex items-center gap-1"
            >
              До звіту <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Card 3: Cars Status in Workshop */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
              <span>{t.today.inWorkTitle}</span>
              <Car size={16} className="text-brand-olive" />
            </div>

            <div className="text-3xl font-extrabold font-display text-brand-text tracking-tight">
              {cars.in_work_count} <span className="text-sm font-normal text-brand-muted">авто</span>
            </div>

            <div className="space-y-1.5 mt-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-brand-green" /> Вкладаються в термін:
                </span>
                <span className="font-mono font-bold">{cars.in_work_count - cars.overdue_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <AlertCircle size={13} className="text-brand-red" /> Потребують уваги:
                </span>
                <span className="font-mono font-bold text-brand-red">{cars.overdue_count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted flex items-center gap-1.5">
                  <ParkingSquare size={13} className="text-brand-sand" /> На стоянці:
                </span>
                <span className="font-mono font-bold text-brand-sand">{cars.parking_count}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/board')}
              className="text-xs font-semibold text-brand-olive hover:underline flex items-center gap-1"
            >
              Відкрити конвеєр робіт <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Top Debtors Table & Floor Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left (2 cols): Top Debts Table */}
        <div className="lg:col-span-2 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">
                Найбільші активні заборгованості
              </h2>
              <p className="text-xs text-brand-muted">
                Замовлення, де роботи виконані або в процесі, а залишок очікує оплати
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="text-xs text-brand-olive hover:underline font-semibold"
            >
              Всі наряди →
            </button>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Авто / Держномер</th>
                  <th>Клієнт</th>
                  <th>Поточний етап</th>
                  <th className="text-right">Сума наряду</th>
                  <th className="text-right">Борг до сплати</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {debts.top?.length > 0 ? (
                  debts.top.map((d) => (
                    <tr key={d.id} className="cursor-pointer" onClick={() => navigate(`/orders/${d.id}`)}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-text">{d.brand} {d.model}</span>
                          <span className="font-mono text-xs text-brand-sand font-semibold">{d.plate}</span>
                        </div>
                      </td>
                      <td className="text-sm font-medium">{d.customer_name}</td>
                      <td>
                        <span className="badge badge-accent">
                          {d.stage_name}
                        </span>
                      </td>
                      <td className="text-right font-mono">
                        {formatMoney(d.grand_total, currency)}
                      </td>
                      <td className="text-right font-mono font-bold text-brand-orange">
                        {formatMoney(d.balance, currency)}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/orders/${d.id}`);
                          }}
                          className="btn btn-ghost btn-sm text-xs"
                        >
                          Картка →
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-brand-muted text-xs">
                      Заборгованостей немає
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (1 col): Floor Shifts Staff */}
        <div className="card p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-brand-text flex items-center gap-2">
                <Users size={16} className="text-brand-olive" />
                {t.today.activeShiftsNow}
              </h2>
              <span className="badge badge-green font-mono">
                {shifts.length} активні
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-1">
              Майстри, які зареєстрували вихід на зміну в системі
            </p>

            <div className="space-y-2.5 mt-4">
              {shifts.length > 0 ? (
                shifts.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-2.5 rounded-lg bg-brand-surface2 border border-brand-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-olive/20 text-brand-olive font-bold text-xs flex items-center justify-center">
                        {s.user_name ? s.user_name.charAt(0) : 'М'}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-text block">
                          {s.user_name}
                        </span>
                        <span className="text-[10px] text-brand-muted font-mono flex items-center gap-1">
                          <Clock size={10} /> З {s.start_time ? new Date(s.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:00'}
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-green text-[10px]">В цеху</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-brand-muted text-xs">
                  Наразі ніхто не зафіксований на зміні
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/shifts')}
            className="w-full btn btn-secondary btn-sm text-xs justify-center"
          >
            Керування змінами та табелем
          </button>
        </div>
      </div>
    </div>
  );
}
