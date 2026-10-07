import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import {
  ShieldCheck,
  Clock,
  User,
  FileText
} from 'lucide-react';

export function AuditScreen() {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAudit = async () => {
    try {
      setLoading(true);
      const data = await api.get('/audit/actions');
      setActions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
          <ShieldCheck size={22} className="text-brand-olive" />
          {t.nav.audit}
        </h1>
        <p className="text-xs text-brand-muted">
          Незмінний журнал системних операцій, фінансових проведень та виробничих дій
        </p>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Час та дата</th>
                <th>Співробітник</th>
                <th>Тип дії</th>
                <th>Опис виконаної дії</th>
                <th>Замовлення</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : actions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-brand-muted text-xs">
                    Записів аудиту немає
                  </td>
                </tr>
              ) : (
                actions.map(a => (
                  <tr key={a.id}>
                    <td className="font-mono text-xs text-brand-muted">
                      {a.created_at ? a.created_at.slice(0, 19).replace('T', ' ') : '—'}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-olive text-white text-[10px] font-bold flex items-center justify-center">
                          {a.user_name ? a.user_name.charAt(0) : 'М'}
                        </div>
                        <span className="font-bold text-xs">{a.user_name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-accent text-[11px] font-mono">
                        {a.action}
                      </span>
                    </td>
                    <td className="text-xs text-brand-text">
                      {a.description}
                    </td>
                    <td>
                      {a.order_id ? (
                        <button
                          type="button"
                          onClick={() => navigate(`/orders/${a.order_id}`)}
                          className="text-xs font-mono text-brand-sand hover:underline font-bold"
                        >
                          #{a.order_id}
                        </button>
                      ) : (
                        <span className="text-xs text-brand-muted">—</span>
                      )}
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
