import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
import { CURRENCIES } from '../../utils/currency';
import {
  LayoutDashboard,
  Kanban,
  FileText,
  Calendar,
  Car,
  Boxes,
  Wrench,
  Wallet,
  BarChart3,
  CheckSquare,
  CheckCheck,
  Clock,
  Users,
  Settings,
  ShieldCheck,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  Sun,
  Moon,
  Coins
} from 'lucide-react';

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { t, lang, setLang } = useTranslation();
  const { user, sidebarCollapsed, toggleSidebar, isImpersonating, theme, toggleTheme, currency, changeCurrency } = useApp();
  const { currentPath, navigate } = useRouter();

  const currentPos = (user?.position || '').toLowerCase();
  const isOwner = currentPos.includes('власник') || currentPos.includes('директор');
  const isServiceAdvisor = currentPos.includes('приймальник');
  const isPartsSpecialist = currentPos.includes('запчастин');
  const isProductionManager = currentPos.includes('виробництв') || currentPos.includes('начальник');
  const isTechnician = [
    'механік', 
    'автоелектрик', 
    'кузовник', 
    'маляр', 
    'мийник'
  ].some(r => currentPos.includes(r));

  // Determine allowed items based on active role
  let navItems = [];

  if (isTechnician) {
    navItems = [
      { path: '/my-tasks', label: 'Мої завдання', icon: CheckCheck, highlight: true },
      { path: '/board', label: 'Конвеєр робіт', icon: Kanban },
      { path: '/orders', label: 'Замовлення', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { path: '/company-tasks', label: 'Завдання цеху', icon: CheckSquare },
      { path: '/profile', label: 'Профіль', icon: User }
    ];
  } else if (isPartsSpecialist) {
    navItems = [
      { path: '/parts', label: 'Запчастини', icon: Wrench, highlight: true },
      { path: '/warehouse', label: 'Склад деталей', icon: Boxes },
      { path: '/orders', label: 'Замовлення', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { path: '/my-tasks', label: 'Мої завдання', icon: CheckCheck },
      { path: '/company-tasks', label: 'Завдання цеху', icon: CheckSquare },
      { path: '/profile', label: 'Профіль', icon: User }
    ];
  } else if (isServiceAdvisor) {
    navItems = [
      { path: '/board', label: 'Конвеєр робіт', icon: Kanban },
      { path: '/orders', label: 'Замовлення', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users, highlight: true },
      { path: '/bookings', label: 'Запис на ремонт', icon: Calendar },
      { path: '/my-tasks', label: 'Мої завдання', icon: CheckCheck },
      { path: '/company-tasks', label: 'Завдання цеху', icon: CheckSquare },
      { path: '/parking', label: 'Парковка', icon: Car },
      { path: '/profile', label: 'Профіль', icon: User }
    ];
  } else if (isProductionManager) {
    navItems = [
      { path: '/board', label: 'Конвеєр робіт', icon: Kanban, highlight: true },
      { path: '/orders', label: 'Замовлення', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { path: '/shifts', label: 'Зміни в цеху', icon: Clock },
      { path: '/employees', label: 'Співробітники', icon: Users },
      { path: '/my-tasks', label: 'Мої завдання', icon: CheckCheck },
      { path: '/company-tasks', label: 'Завдання цеху', icon: CheckSquare },
      { path: '/profile', label: 'Профіль', icon: User }
    ];
  } else {
    // Owner / Full access
    navItems = [
      { path: '/today', label: 'Сервіс сьогодні', icon: LayoutDashboard },
      { path: '/board', label: 'Конвеєр робіт', icon: Kanban },
      { path: '/orders', label: 'Замовлення', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { path: '/bookings', label: 'Запис на ремонт', icon: Calendar },
      { path: '/warehouse', label: 'Склад', icon: Boxes },
      { path: '/cash', label: 'Каса та фінанси', icon: Wallet },
      { path: '/reports', label: 'Звіти', icon: BarChart3 },
      { path: '/parts', label: 'Запчастини', icon: Wrench },
      { path: '/my-tasks', label: 'Мої завдання', icon: CheckCheck },
      { path: '/company-tasks', label: 'Завдання сервісу', icon: CheckSquare },
      { path: '/employees', label: 'Співробітники', icon: Users },
      { path: '/shifts', label: 'Зміни в цеху', icon: Clock },
      { path: '/parking', label: 'Парковка', icon: Car },
      { path: '/settings', label: 'Налаштування', icon: Settings },
      { path: '/audit', label: 'Журнал аудиту', icon: ShieldCheck }
    ];
  }

  const handleNav = (path) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-full lg:h-[calc(100vh-4rem)] bg-brand-surface border-r border-brand-border flex flex-col justify-between transition-all duration-300 ease-in-out select-none ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-72 sm:w-80 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile-Only Header with close button */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-brand-border bg-brand-surface2/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-olive text-white flex items-center justify-center font-bold text-xs">
              MKV
            </div>
            <div>
              <div className="text-xs font-bold text-brand-text">Автосервіс</div>
              <div className="text-[10px] text-brand-muted">{user?.position || 'Власник'}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-brand-muted hover:text-white hover:bg-brand-surface"
            aria-label="Закрити меню"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-3 lg:py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || 
              (item.path !== '/today' && item.path !== '/' && currentPath.startsWith(item.path));

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-xl text-sm font-semibold transition-all group relative active:scale-[0.98] ${
                  isActive
                    ? 'bg-brand-olive text-white shadow-sm shadow-brand-olive/20'
                    : item.highlight && isTechnician
                    ? 'bg-brand-olive/15 text-brand-olive border border-brand-olive/30 hover:bg-brand-olive/25'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-surfaceHover'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={20} className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : item.highlight && isTechnician ? 'text-brand-olive' : 'text-brand-muted group-hover:text-brand-text'}`} />
                <span className={`truncate text-left transition-opacity duration-200 ${
                  sidebarCollapsed ? 'lg:hidden' : 'block'
                }`}>
                  {item.label}
                </span>

                {item.highlight && isTechnician && !sidebarCollapsed && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Quick Settings (Currency, Theme, Lang) */}
        <div className="block lg:hidden px-3 py-2.5 border-t border-brand-border bg-brand-surface2/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-muted text-[11px] font-semibold">Валюта та тема:</span>
            <div className="flex items-center gap-1.5">
              {/* Currency */}
              <div className="flex items-center bg-brand-surface border border-brand-border rounded-lg p-0.5 text-xs font-semibold">
                {Object.values(CURRENCIES).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => changeCurrency(c.code)}
                    className={`px-1.5 py-0.5 rounded text-[11px] ${
                      currency === c.code ? 'bg-brand-olive text-white' : 'text-brand-muted'
                    }`}
                  >
                    {c.symbol}
                  </button>
                ))}
              </div>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 rounded-lg bg-brand-surface border border-brand-border text-brand-muted"
                title="Змінити тему"
              >
                {theme === 'dark' ? <Sun size={14} className="text-brand-sand" /> : <Moon size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Active Employee & collapse button */}
        <div className="p-3 border-t border-brand-border bg-brand-surface2/40 flex items-center justify-between">
          <div 
            onClick={() => handleNav('/profile')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
            title="Переглянути профіль"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 text-white shadow-sm ${
              isImpersonating ? 'bg-amber-600 ring-2 ring-amber-400/50' : 'bg-brand-olive'
            }`}>
              {user?.full_name ? user.full_name.charAt(0) : 'М'}
            </div>
            <div className={`flex flex-col min-w-0 ${sidebarCollapsed ? 'lg:hidden' : 'block'}`}>
              <span className="text-xs font-bold text-brand-text truncate group-hover:text-brand-olive transition-colors">
                {user?.full_name || 'Михайло Шевченко'}
              </span>
              <span className="text-[11px] text-brand-muted truncate">
                {user?.position || 'Власник'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surfaceHover transition-colors ml-1"
            title={sidebarCollapsed ? 'Розгорнути меню' : 'Згорнути меню'}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}
