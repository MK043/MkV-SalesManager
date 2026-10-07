import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { api } from '../utils/api';
import {
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Play,
  Square
} from 'lucide-react';

export function ShiftsScreen() {
  const { t } = useTranslation();

  const [activeShifts, setActiveShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShifts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/shifts/active');
      setActiveShifts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleStartShift = async () => {
    try {
      await api.post('/shifts/start');
      fetchShifts();
    } catch (err) {
      alert('Помилка відкриття зміни');
    }
  };

  const handleCloseShift = async (id) => {
    try {
      await api.post(`/shifts/${id}/close`);
      fetchShifts();
    } catch (err) {
      alert('Помилка закриття зміни');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Clock size={22} className="text-brand-olive" />
            {t.shifts.title}
          </h1>
          <p className="text-xs text-brand-muted">
            Облік виходу співробітників на робочу зміну та контроль присутності в цеху
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartShift}
          className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 self-start sm:self-auto"
        >
          <Play size={15} /> {t.shifts.startShift}
        </button>
      </div>

      {/* Shifts Table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-brand-border bg-brand-surface2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-brand-text">
            {t.shifts.activeNow} ({activeShifts.length})
          </h2>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Спеціаліст</th>
                <th>Час виходу на зміну</th>
                <th>Статус</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : activeShifts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-brand-muted text-xs">
                    Наразі ніхто не зафіксований на зміні
                  </td>
                </tr>
              ) : (
                activeShifts.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-olive/20 text-brand-olive font-bold text-xs flex items-center justify-center">
                          {s.user_name ? s.user_name.charAt(0) : 'М'}
                        </div>
                        <span className="font-bold text-sm text-brand-text">{s.user_name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-brand-muted">
                      {s.start_time ? new Date(s.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:00'}
                    </td>
                    <td>
                      <span className="badge badge-green text-xs">
                        На зміні
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleCloseShift(s.id)}
                        className="btn btn-secondary btn-sm text-xs text-brand-red hover:bg-brand-red/10"
                      >
                        <Square size={13} /> {t.shifts.closeShift}
                      </button>
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
