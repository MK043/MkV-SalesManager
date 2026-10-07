import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  BarChart3,
  Calendar,
  Download,
  AlertCircle,
  Users,
  Award,
  Wallet,
  FileSpreadsheet
} from 'lucide-react';

export function ReportsScreen() {
  const { t } = useTranslation();
  const { currency } = useApp();

  const [activeTab, setActiveTab] = useState('debts'); // debts, executors, managers, payroll, registry
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-12-31');

  const [debts, setDebts] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [managers, setManagers] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [registry, setRegistry] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [debtsRes, execRes, mgrRes, payRes, regRes] = await Promise.all([
        api.get('/reports/debts'),
        api.get('/reports/executors', { date_from: dateFrom, date_to: dateTo }),
        api.get('/reports/managers', { date_from: dateFrom, date_to: dateTo }),
        api.get('/reports/payroll', { date_from: dateFrom, date_to: dateTo }),
        api.get('/reports/orders-registry')
      ]);
      setDebts(debtsRes || []);
      setExecutors(execRes || []);
      setManagers(mgrRes || []);
      setPayroll(payRes || []);
      setRegistry(regRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [dateFrom, dateTo]);

  const handleExportCsv = () => {
    let csv = '';
    if (activeTab === 'debts') {
      csv = 'Наряд,Держномер,Авто,Клієнт,Телефон,Кошторис,Оплачено,Борг,Етап\n' +
        debts.map(d => `${d.order_id},${d.plate},${d.vehicle},"${d.customer}",${d.phone},${d.total},${d.paid},${d.debt},${d.stage}`).join('\n');
    } else if (activeTab === 'executors') {
      csv = 'Спеціаліст,Посада,Виконано замовлень,Годин,Сума робіт,Нараховано\n' +
        executors.map(e => `"${e.full_name}",${e.position},${e.orders_completed},${e.hours_worked},${e.total_labor},${e.earnings}`).join('\n');
    } else {
      csv = 'Наряд,Марка,Модель,Держномер,Клієнт,Статус,Сума\n' +
        registry.map(r => `${r.id},${r.brand},${r.model},${r.plate},"${r.customer_name}",${r.status},${r.grand_total || 0}`).join('\n');
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mkv_report_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <BarChart3 size={22} className="text-brand-olive" />
            {t.reports.title}
          </h1>
          <p className="text-xs text-brand-muted">
            Зведена управлінська та фінансова звітність автосервісу
          </p>
        </div>

        {/* Date Filter & Export */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5 bg-brand-surface border border-brand-border px-2.5 py-1.5 rounded-lg text-xs">
            <Calendar size={13} className="text-brand-muted" />
            <span className="text-brand-muted">{t.reports.periodFrom}</span>
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="bg-transparent font-mono text-xs outline-none"
            />
            <span className="text-brand-muted">{t.reports.periodTo}</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="bg-transparent font-mono text-xs outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="btn btn-secondary btn-sm"
          >
            <Download size={14} /> {t.reports.exportCsv}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-border flex items-center gap-3 overflow-x-auto">
        {[
          { id: 'debts', label: t.reports.tabDebts, icon: AlertCircle },
          { id: 'executors', label: t.reports.tabExecutors, icon: Users },
          { id: 'managers', label: t.reports.tabManagers, icon: Award },
          { id: 'payroll', label: t.reports.tabPayroll, icon: Wallet },
          { id: 'registry', label: t.reports.tabRegistry, icon: FileSpreadsheet }
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
                  : 'border-transparent text-brand-muted hover:text-brand-text'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Debts */}
      {activeTab === 'debts' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>№ Наряду</th>
                  <th>Авто / Держномер</th>
                  <th>Клієнт</th>
                  <th>Поточний етап</th>
                  <th className="text-right">Сума наряду</th>
                  <th className="text-right">Оплачено</th>
                  <th className="text-right">Борг до сплати</th>
                </tr>
              </thead>
              <tbody>
                {debts.map(d => (
                  <tr key={d.order_id}>
                    <td className="font-mono text-xs font-bold text-brand-muted">#{d.order_id}</td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold">{d.vehicle}</span>
                        <span className="font-mono text-xs text-brand-sand">{d.plate}</span>
                      </div>
                    </td>
                    <td className="text-xs">{d.customer}</td>
                    <td>
                      <span className="badge badge-accent text-xs">{d.stage}</span>
                    </td>
                    <td className="text-right font-mono text-xs">{formatMoney(d.total, currency)}</td>
                    <td className="text-right font-mono text-xs text-brand-green">{formatMoney(d.paid, currency)}</td>
                    <td className="text-right font-mono font-bold text-xs text-brand-orange">{formatMoney(d.debt, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Executors */}
      {activeTab === 'executors' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Спеціаліст цеху</th>
                  <th>Посада</th>
                  <th className="text-right">Виконано замовлень</th>
                  <th className="text-right">Відпрацьовано годин</th>
                  <th className="text-right">Обсяг робіт</th>
                  <th className="text-right">Нараховано</th>
                </tr>
              </thead>
              <tbody>
                {executors.map(e => (
                  <tr key={e.user_id}>
                    <td className="font-bold">{e.full_name}</td>
                    <td className="text-xs text-brand-muted">{e.position}</td>
                    <td className="text-right font-mono text-xs">{e.orders_completed}</td>
                    <td className="text-right font-mono text-xs">{e.hours_worked} год</td>
                    <td className="text-right font-mono text-xs font-semibold">{formatMoney(e.total_labor, currency)}</td>
                    <td className="text-right font-mono font-bold text-xs text-brand-green">{formatMoney(e.earnings, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Managers */}
      {activeTab === 'managers' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Майстер-приймальник</th>
                  <th className="text-right">Прийнято авто</th>
                  <th className="text-right">Видано авто</th>
                  <th className="text-right">Оборот робіт</th>
                  <th className="text-right">Конверсія</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(m => (
                  <tr key={m.user_id}>
                    <td className="font-bold">{m.full_name}</td>
                    <td className="text-right font-mono text-xs">{m.orders_taken}</td>
                    <td className="text-right font-mono text-xs">{m.orders_issued}</td>
                    <td className="text-right font-mono font-bold text-xs text-brand-green">{formatMoney(m.revenue_generated, currency)}</td>
                    <td className="text-right font-mono text-xs">{m.conversion_rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Payroll */}
      {activeTab === 'payroll' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Співробітник</th>
                  <th>Посада</th>
                  <th className="text-right">Базова ставка</th>
                  <th className="text-right">Премія / Відсоток</th>
                  <th className="text-right">До виплати</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map(p => (
                  <tr key={p.user_id}>
                    <td className="font-bold">{p.full_name}</td>
                    <td className="text-xs text-brand-muted">{p.position}</td>
                    <td className="text-right font-mono text-xs">{formatMoney(p.base_salary, currency)}</td>
                    <td className="text-right font-mono text-xs text-brand-sand">{formatMoney(p.commission, currency)}</td>
                    <td className="text-right font-mono font-bold text-xs text-brand-green">{formatMoney(p.total_payout, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Registry */}
      {activeTab === 'registry' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Автомобіль / Держномер</th>
                  <th>Клієнт</th>
                  <th>Статус</th>
                  <th className="text-right">Кошторис</th>
                </tr>
              </thead>
              <tbody>
                {registry.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono text-xs text-brand-muted">#{r.id}</td>
                    <td>
                      <span className="font-bold block">{r.brand} {r.model}</span>
                      <span className="font-mono text-xs text-brand-sand">{r.plate}</span>
                    </td>
                    <td className="text-xs">{r.customer_name}</td>
                    <td>
                      <span className="badge badge-accent text-xs">{r.status}</span>
                    </td>
                    <td className="text-right font-mono font-bold text-xs">
                      {formatMoney(r.grand_total, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
