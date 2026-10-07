import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { t } = useTranslation();
  const { user, sidebarCollapsed, toggleSidebar, isImpersonating } = useApp();
  const { currentPath, navigate } = useRouter();

  const isTechnician = user && [
    'механік', 
    'автоелектрик', 
    'кузовник', 
    'маляр', 
    'мийник'
  ].some(r => (user.position || '').toLowerCase().includes(r));

  // Base list of items
  const allNavItems = [
    { path: '/today', label: t.nav.today, icon: LayoutDashboard, primary: true },
    { path: '/board', label: t.nav.board, icon: Kanban, primary: true },
    { path: '/orders', label: t.nav.orders, icon: FileText, primary: true },
    { path: '/my-tasks', label: t.nav.myTasks, icon: CheckCheck, primary: true, highlight: true },
    { path: '/company-tasks', label: t.nav.companyTasks, icon: CheckSquare, primary: true },
    { path: '/bookings', label: t.nav.bookings, icon: Calendar, primary: true },
    { path: '/parking', label: t.nav.parking, icon: Car },
    { path: '/warehouse', label: t.nav.warehouse, icon: Boxes },
    { path: '/parts', label: t.nav.parts, icon: Wrench },
    { path: '/cash', label: t.nav.cash, icon: Wallet },
    { path: '/reports', label: t.nav.reports, icon: BarChart3 },
    { path: '/shifts', label: t.nav.shifts, icon: Clock },
    { path: '/employees', label: t.nav.employees, icon: Users },
    { path: '/settings', label: t.nav.settings, icon: Settings },
    { path: '/audit', label: t.nav.audit, icon: ShieldCheck }
  ];

  // If technician, put My Tasks near the top
  const navItems = isTechnician 
    ? [
        { path: '/today', label: t.nav.today, icon: LayoutDashboard },
        { path: '/my-tasks', label: t.nav.myTasks, icon: CheckCheck, highlight: true },
        { path: '/board', label: t.nav.board, icon: Kanban },
        { path: '/orders', label: t.nav.orders, icon: FileText },
        { path: '/company-tasks', label: t.nav.companyTasks, icon: CheckSquare },
        { path: '/bookings', label: t.nav.bookings, icon: Calendar },
        { path: '/parking', label: t.nav.parking, icon: Car },
        { path: '/parts', label: t.nav.parts, icon: Wrench },
        { path: '/shifts', label: t.nav.shifts, icon: Clock },
        { path: '/warehouse', label: t.nav.warehouse, icon: Boxes },
        { path: '/cash', label: t.nav.cash, icon: Wallet },
        { path: '/reports', label: t.nav.reports, icon: BarChart3 },
        { path: '/employees', label: t.nav.employees, icon: Users },
        { path: '/settings', label: t.nav.settings, icon: Settings },
        { path: '/audit', label: t.nav.audit, icon: ShieldCheck }
      ]
    : allNavItems;

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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-full lg:h-[calc(100vh-4rem)] bg-brand-surface border-r border-brand-border flex flex-col justify-between transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || 
              (item.path !== '/today' && currentPath.startsWith(item.path));

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-brand-olive text-white shadow-sm shadow-brand-olive/20'
                    : item.highlight && isTechnician
                    ? 'bg-brand-olive/15 text-brand-olive border border-brand-olive/30 hover:bg-brand-olive/25'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-surfaceHover'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={19} className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : item.highlight && isTechnician ? 'text-brand-olive' : 'text-brand-muted group-hover:text-brand-text'}`} />
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

        {/* Footer Active Employee & collapse button */}
        <div className="p-3 border-t border-brand-border bg-brand-surface2/30 flex items-center justify-between">
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
              <span className="text-[10px] text-brand-muted truncate">
                {user?.position || 'Власник'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-brand-surfaceHover text-brand-muted hover:text-brand-text transition-colors shrink-0"
            title={sidebarCollapsed ? "Розгорнути панель" : "Згорнути панель"}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}

