import React, { useState } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export function ProfileScreen() {
  const { t } = useTranslation();
  const { user } = useApp();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert('Пароль має містити щонайменше 6 символів');
      return;
    }
    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }
    setSuccess(true);
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
          <User size={22} className="text-brand-olive" />
          {t.nav.profile}
        </h1>
        <p className="text-xs text-brand-muted">
          Персональні дані облікового запису та безпека
        </p>
      </div>

      {/* User Info Card */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-olive text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-brand-olive/20">
            {user?.full_name ? user.full_name.charAt(0) : 'М'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-brand-text">
              {user?.full_name || 'Михайло Шевченко'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-accent text-xs">
                {user?.position || 'Власник'}
              </span>
              <span className={`badge text-xs ${user?.position === 'Власник' ? 'badge-green' : 'badge-yellow'}`}>
                {user?.position === 'Власник' ? 'Повний доступ (Власник)' : `Доступ: ${user?.position}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="card p-6 space-y-4">
        <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
          <KeyRound size={16} className="text-brand-sand" />
          Зміна пароля
        </h3>

        {success && (
          <div className="p-3 rounded-lg bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> Пароль успішно змінено!
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-brand-muted mb-1">Новий пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input text-xs"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-muted mb-1">Підтвердження нового пароля</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="input text-xs"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-primary btn-sm">
              Оновити пароль
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
