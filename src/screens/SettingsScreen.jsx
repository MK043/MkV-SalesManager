import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { CURRENCIES } from '../utils/currency';
import {
  Settings,
  Globe,
  Coins,
  Palette,
  Kanban,
  CheckSquare,
  Shield,
  Wallet,
  CheckCircle2
} from 'lucide-react';

export function SettingsScreen() {
  const { t, lang, setLang } = useTranslation();
  const { currency, changeCurrency, theme, toggleTheme, accent, changeAccent } = useApp();

  const [activeTab, setActiveTab] = useState('general'); // general, stages, checklists, roles
  const [stages, setStages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        setLoading(true);
        const [stagesRes, rolesRes] = await Promise.all([
          api.get('/admin/stages'),
          api.get('/admin/roles')
        ]);
        setStages(stagesRes || []);
        setRoles(rolesRes || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettingsData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
          <Settings size={22} className="text-brand-olive" />
          {t.settings.title}
        </h1>
        <p className="text-xs text-brand-muted">
          Персоналізація інтерфейсу, виробничих етапів конвеєра та фінансових налаштувань
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-border flex items-center gap-3 overflow-x-auto">
        {[
          { id: 'general', label: t.settings.tabGeneral, icon: Palette },
          { id: 'stages', label: t.settings.tabStages, icon: Kanban },
          { id: 'roles', label: t.settings.tabRoles, icon: Shield }
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

      {/* TAB 1: General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Language Selection */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <Globe size={16} className="text-brand-olive" />
              {t.settings.language}
            </h3>
            <p className="text-xs text-brand-muted">
              Оберіть мову інтерфейсу системи MKV Autostand
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLang('uk')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  lang === 'uk'
                    ? 'bg-brand-olive text-white border-brand-olive shadow-sm'
                    : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                }`}
              >
                <span>🇺🇦 Українська (Default)</span>
                {lang === 'uk' && <CheckCircle2 size={15} />}
              </button>

              <button
                type="button"
                onClick={() => setLang('en')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  lang === 'en'
                    ? 'bg-brand-olive text-white border-brand-olive shadow-sm'
                    : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                }`}
              >
                <span>🇬🇧 English</span>
                {lang === 'en' && <CheckCircle2 size={15} />}
              </button>
            </div>
          </div>

          {/* Operating Currency */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <Coins size={16} className="text-brand-sand" />
              {t.settings.currency}
            </h3>
            <p className="text-xs text-brand-muted">
              Основна валюта відображення цін, кошторисів та звітів
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {Object.values(CURRENCIES).map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => changeCurrency(c.code)}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currency === c.code
                      ? 'bg-brand-olive text-white border-brand-olive shadow-sm'
                      : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                  }`}
                >
                  <span className="font-mono text-base">{c.symbol}</span>
                  <span className="text-[11px]">{c.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Mode */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <Palette size={16} className="text-brand-olive" />
              {t.settings.theme}
            </h3>
            <p className="text-xs text-brand-muted">
              Колірний режим фону та карток
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  theme === 'dark'
                    ? 'bg-brand-olive text-white border-brand-olive shadow-sm'
                    : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                }`}
              >
                <span>{t.settings.themeDark}</span>
                {theme === 'dark' && <CheckCircle2 size={15} />}
              </button>

              <button
                type="button"
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                  theme === 'light'
                    ? 'bg-brand-olive text-white border-brand-olive shadow-sm'
                    : 'bg-brand-surface2 border-brand-border text-brand-muted hover:text-brand-text'
                }`}
              >
                <span>{t.settings.themeLight}</span>
                {theme === 'light' && <CheckCircle2 size={15} />}
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div className="card p-5 space-y-3">
            <h3 className="text-sm font-bold text-brand-text flex items-center gap-2">
              <Palette size={16} className="text-brand-sand" />
              {t.settings.accentColor}
            </h3>
            <p className="text-xs text-brand-muted">
              Фірмовий колір підсвічування кнопок та активних елементів
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                { id: 'olive', label: t.settings.accentOlive, color: '#4A5E38' },
                { id: 'sand', label: t.settings.accentSand, color: '#C8AD8D' },
                { id: 'blue', label: t.settings.accentBlue, color: '#2563EB' },
                { id: 'emerald', label: t.settings.accentEmerald, color: '#16A34A' },
                { id: 'orange', label: t.settings.accentOrange, color: '#EA580C' }
              ].map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => changeAccent(a.id)}
                  className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                    accent === a.id
                      ? 'border-brand-olive bg-brand-surface2 text-brand-text shadow-sm'
                      : 'border-brand-border text-brand-muted hover:text-brand-text'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="truncate">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Workflow Stages */}
      {activeTab === 'stages' && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-brand-text">Етапи виробничого конвеєра</h2>
              <p className="text-xs text-brand-muted">Послідовність стадій руху авто від прийомки до видачі</p>
            </div>
          </div>

          <div className="space-y-2">
            {stages.map((s, idx) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-brand-surface2 border border-brand-border">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brand-muted w-5">
                    {idx + 1}
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: s.color || '#4A5E38' }} />
                  <span className="font-bold text-sm text-brand-text">{s.name}</span>
                </div>
                <span className="badge badge-gray text-xs font-mono">
                  Позиція: {s.position}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Roles & Permissions */}
      {activeTab === 'roles' && (
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-brand-border bg-brand-surface2">
            <h2 className="text-sm font-bold text-brand-text">Матриця ролей та прав доступу</h2>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Роль</th>
                  <th>Дозволи (Permissions)</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(r => (
                  <tr key={r.id}>
                    <td className="font-bold text-sm text-brand-text">{r.name}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {r.permissions?.map((p, idx) => (
                          <span key={idx} className="badge badge-gray text-[10px] font-mono">
                            {p}
                          </span>
                        ))}
                      </div>
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
