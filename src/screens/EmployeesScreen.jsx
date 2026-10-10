import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import {
  Users,
  UserPlus,
  Phone,
  Shield,
  CheckCircle2,
  UserCheck,
  Trash2,
  X,
  Search,
  Briefcase
} from 'lucide-react';

export function EmployeesScreen() {
  const { t } = useTranslation();
  const { user, switchUser, addUser, deleteUser, allUsers } = useApp();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('Механік');
  const [phone, setPhone] = useState('+380 ');
  const [hourlyRate, setHourlyRate] = useState('200');
  const [percentBonus, setPercentBonus] = useState('10');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.get('/admin/users');
      setUsers(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [allUsers]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Вкажіть ПІБ працівника');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await addUser({
        full_name: fullName.trim(),
        position: position.trim(),
        role_name: position === 'Власник' ? 'Власник' : 'Цеховий фахівець',
        phone: phone.trim(),
        hourly_rate: Number(hourlyRate) || 0,
        percent_bonus: Number(percentBonus) || 0
      });

      setIsAddModalOpen(false);
      setFullName('');
      setPhone('+380 ');
      fetchUsers();
    } catch (err) {
      setError('Не вдалося зареєструвати: ' + (err.message || 'помилка'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Видалити співробітника ${userName}?`)) {
      try {
        await deleteUser(userId);
        fetchUsers();
      } catch (err) {
        alert('Помилка видалення співробітника');
      }
    }
  };

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.full_name || '').toLowerCase().includes(q) ||
      (u.position || '').toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-brand-surface border border-brand-border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-olive text-white">
              <Users size={22} />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text">
              Співробітники та ролі
            </h1>
            <span className="badge badge-accent text-xs">
              {users.length} співробітників
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            Управління кадрами, реєстрація кількох людей на кожну роль та перемикання сесій
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError(null);
            setIsAddModalOpen(true);
          }}
          className="btn btn-primary btn-md shadow-lg shadow-brand-olive/20 self-start sm:self-auto flex items-center gap-2 font-bold"
        >
          <UserPlus size={16} />
          <span>Додати співробітника</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за ПІБ, посадою чи телефоном..."
          className="input pl-10 pr-4 py-2 w-full text-xs"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Співробітник</th>
                <th>Роль / Посада</th>
                <th>Телефон</th>
                <th>Ставка / Бонус</th>
                <th>Статус</th>
                <th className="text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-muted text-xs">
                    Завантаження списку працівників...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-brand-muted text-xs">
                    Співробітників не знайдено
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => {
                  const isCurrent = user?.id === u.id;
                  return (
                    <tr key={u.id} className={isCurrent ? 'bg-brand-olive/10' : ''}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white shrink-0 ${
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
                        {u.phone || '+380 ...'}
                      </td>
                      <td className="text-xs text-brand-text">
                        {u.hourly_rate ? `${u.hourly_rate} ₴/год` : '—'}
                      </td>
                      <td>
                        <span className="badge badge-green text-xs flex items-center gap-1 w-max">
                          <CheckCircle2 size={12} /> Активний
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isCurrent ? (
                            <span className="text-xs font-bold text-brand-olive px-2.5 py-1 rounded bg-brand-olive/20 border border-brand-olive/30">
                              Поточний
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => switchUser(u.id)}
                              className="btn btn-secondary btn-xs text-xs font-bold flex items-center gap-1"
                              title="Активувати інтерфейс цього співробітника"
                            >
                              <UserCheck size={13} />
                              <span>Увійти</span>
                            </button>
                          )}

                          {u.position !== 'Власник' && user?.position === 'Власник' && (
                            <button
                              type="button"
                              onClick={() => handleDelete(u.id, u.full_name)}
                              className="text-brand-muted hover:text-rose-400 p-1.5 rounded hover:bg-rose-500/10 transition-colors"
                              title="Видалити співробітника"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Додати співробітника */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-olive text-white">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-brand-text">
                    Новий співробітник
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Реєстрація працівника в системі автосервісу
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  ПІБ працівника <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="наприклад: Ковальчук Андрій Васильович"
                  className="input w-full text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  Роль у сервісі <span className="text-rose-400">*</span>
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="input w-full text-xs"
                >
                  <option value="Механік">Механік (Цеховий ремонт)</option>
                  <option value="Автоелектрик">Автоелектрик (Діагностика & проводка)</option>
                  <option value="Кузовник">Кузовник (Рихтування & геометрія)</option>
                  <option value="Маляр">Маляр (Фарбування деталей)</option>
                  <option value="Мийник">Мийник (Детейлінг & підготовка до видачі)</option>
                  <option value="Майстер-приймальник">Майстер-приймальник (Прийомка & наряди)</option>
                  <option value="Запчастинник">Запчастинник (Склад деталей)</option>
                  <option value="Начальник виробництва">Начальник виробництва (Контроль конвеєра)</option>
                  <option value="Власник">Власник (Повний доступ)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  Номер телефону
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 50 123 4567"
                  className="input w-full text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text">
                    Годинна ставка (₴/год)
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="200"
                    className="input w-full text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-text">
                    Бонус від робіт (%)
                  </label>
                  <input
                    type="number"
                    value={percentBonus}
                    onChange={(e) => setPercentBonus(e.target.value)}
                    placeholder="10"
                    className="input w-full text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-secondary text-xs"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary text-xs font-bold"
                >
                  {submitting ? 'Збереження...' : 'Зберегти співробітника'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
