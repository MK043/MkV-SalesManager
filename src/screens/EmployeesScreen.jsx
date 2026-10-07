import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import {
  Users,
  Plus,
  Phone,
  Shield,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

export function EmployeesScreen() {
  const { t } = useTranslation();
  const { user, switchUser } = useApp();


  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const [usersRes, rolesRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/roles')
      ]);
      setUsers(usersRes || []);
      setRoles(rolesRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Users size={22} className="text-brand-olive" />
            {t.employees.title}
          </h1>
          <p className="text-xs text-brand-muted">
            Реєстр фахівців, майстрів цеху, приймальників та рівнів доступу
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Співробітник</th>
                <th>Посада</th>
                <th>Телефон</th>
                <th>Логін</th>
                <th>Статус</th>
                <th className="text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-muted text-xs">
                    {t.common.loading}
                  </td>
                </tr>
              ) : (
                users.map(u => {
                  const isCurrent = user?.id === u.id;
                  return (
                    <tr key={u.id} className={isCurrent ? 'bg-brand-olive/10' : ''}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                            isCurrent ? 'bg-amber-600 ring-2 ring-amber-400' : 'bg-brand-olive'
                          }`}>
                            {u.full_name ? u.full_name.charAt(0) : 'М'}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-brand-text block">
                              {u.full_name}
                            </span>
                            <span className="text-[11px] font-mono text-brand-muted">
                              ID: {u.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-accent text-xs">
                          {u.position || 'Фахівець'}
                        </span>
                      </td>
                      <td className="font-mono text-xs text-brand-muted">
                        {u.phone || '+380501112233'}
                      </td>
                      <td className="font-mono text-xs text-brand-sand font-semibold">
                        {u.web_login || 'user'}
                      </td>
                      <td>
                        <span className="badge badge-green text-xs flex items-center gap-1 w-max">
                          <CheckCircle2 size={12} /> Активний
                        </span>
                      </td>
                      <td className="text-right">
                        {isCurrent ? (
                          <span className="text-xs font-bold text-brand-olive px-2.5 py-1 rounded bg-brand-olive/20 border border-brand-olive/30">
                            Поточний акаунт
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => switchUser(u.id)}
                            className="btn btn-secondary btn-sm text-xs font-bold"
                            title="Перемкнутися на цей акаунт для відстеження та виконання"
                          >
                            <UserCheck size={14} /> Увійти як {u.position || 'працівник'}
                          </button>
                        )}
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
