import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
import { CURRENCIES } from '../../utils/currency';
import { 
  Plus, 
  Sun, 
  Moon, 
  Menu, 
  Globe, 
  Coins, 
  User, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

import { EmployeeSwitcher } from './EmployeeSwitcher';

export function Header({ onMobileMenuToggle }) {
  const { t, lang, setLang } = useTranslation();
  const { user, currency, changeCurrency, theme, toggleTheme, setIsNewOrderModalOpen, isImpersonating, resetToOwner } = useApp();
  const { navigate } = useRouter();

  return (
    <header className="sticky top-0 z-40 h-16 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-brand-muted hover:text-white rounded-lg hover:bg-brand-surface2"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div 
          onClick={() => navigate('/today')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img 
            src="/brand/logo.png" 
            alt="MKV Production" 
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/brand/favicon.svg';
            }}
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-extrabold text-base tracking-wide text-brand-text flex items-center gap-1.5">
              MKV <span className="text-brand-olive font-bold">AUTO STAND</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-olive/20 text-brand-olive border border-brand-olive/30 font-semibold tracking-wider">PRO</span>
            </span>
            <span className="text-[11px] text-brand-muted -mt-0.5">
              {t.brandTagline}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Impersonation Banner if active */}
      {isImpersonating && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold animate-pulse">
          <span>Режим працівника: <strong>{user?.full_name}</strong> ({user?.position})</span>
          <button
            type="button"
            onClick={resetToOwner}
            className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-white font-bold ml-1 transition-colors"
          >
            Скинути
          </button>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role & Employee Account Switcher */}
        <EmployeeSwitcher />

        {/* New Order Button */}
        <button
          type="button"
          onClick={() => setIsNewOrderModalOpen(true)}
          className="btn btn-primary btn-sm sm:btn-md shadow-lg shadow-brand-olive/20"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">{t.orders.createBtn}</span>
          <span className="sm:hidden">{t.common.create}</span>
        </button>


        {/* Secondary Toggles (Visible on desktop/tablet, available in menu on mobile) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Currency Selector */}
          <div className="flex items-center bg-brand-surface2 border border-brand-border rounded-lg p-0.5 text-xs font-semibold">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => changeCurrency(c.code)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  currency === c.code 
                    ? 'bg-brand-olive text-white shadow-sm' 
                    : 'text-brand-muted hover:text-brand-text'
                }`}
                title={c.label}
              >
                {c.symbol}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-brand-surface2 border border-brand-border rounded-lg p-0.5 text-xs font-bold font-mono">
            <button
              type="button"
              onClick={() => setLang('uk')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'uk' 
                  ? 'bg-brand-olive text-white shadow-sm' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-md transition-colors ${
                lang === 'en' 
                  ? 'bg-brand-olive text-white shadow-sm' 
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-brand-muted hover:text-brand-text rounded-lg bg-brand-surface2 border border-brand-border transition-colors"
            title={theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-brand-sand" /> : <Moon size={17} />}
          </button>
        </div>

        {/* Profile Chip */}
        <div 
          onClick={() => navigate('/profile')}
          className="hidden md:flex items-center gap-2.5 pl-2 py-1 pr-3 rounded-lg bg-brand-surface2 hover:bg-brand-surfaceHover border border-brand-border cursor-pointer transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-brand-olive text-white font-bold text-xs flex items-center justify-center">
            {user?.full_name ? user.full_name.charAt(0) : 'М'}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-brand-text leading-tight truncate max-w-[120px]">
              {user?.full_name || 'Михайло Шевченко'}
            </span>
            <span className="text-[10px] text-brand-muted leading-tight">
              {user?.position || 'Власник'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
