import React from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
import {
  LayoutDashboard,
  Kanban,
  FileText,
  Users,
  CheckCheck,
  Calendar,
  Boxes,
  Wrench,
  Menu
} from 'lucide-react';

export function BottomNav({ onOpenMobileMenu }) {
  const { user } = useApp();
  const { currentPath, navigate } = useRouter();

  const currentPos = (user?.position || '').toLowerCase();
  const isTechnician = [
    'механік',
    'автоелектрик',
    'кузовник',
    'маляр',
    'мийник'
  ].some(r => currentPos.includes(r));
  const isParts = currentPos.includes('запчастин');
  const isServiceAdvisor = currentPos.includes('приймальник');

  // Define mobile navigation tabs based on user role
  let tabs = [];

  if (isTechnician) {
    tabs = [
      { path: '/my-tasks', label: 'Завдання', icon: CheckCheck, primary: true },
      { path: '/board', label: 'Конвеєр', icon: Kanban },
      { path: '/orders', label: 'Наряди', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { action: onOpenMobileMenu, label: 'Меню', icon: Menu }
    ];
  } else if (isParts) {
    tabs = [
      { path: '/parts', label: 'Деталі', icon: Wrench, primary: true },
      { path: '/warehouse', label: 'Склад', icon: Boxes },
      { path: '/orders', label: 'Наряди', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { action: onOpenMobileMenu, label: 'Меню', icon: Menu }
    ];
  } else if (isServiceAdvisor) {
    tabs = [
      { path: '/board', label: 'Конвеєр', icon: Kanban },
      { path: '/orders', label: 'Наряди', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users, primary: true },
      { path: '/bookings', label: 'Запис', icon: Calendar },
      { action: onOpenMobileMenu, label: 'Меню', icon: Menu }
    ];
  } else {
    // Owner / Management
    tabs = [
      { path: '/today', label: 'Сьогодні', icon: LayoutDashboard, primary: true },
      { path: '/board', label: 'Конвеєр', icon: Kanban },
      { path: '/orders', label: 'Наряди', icon: FileText },
      { path: '/customers', label: 'Клієнти', icon: Users },
      { action: onOpenMobileMenu, label: 'Меню', icon: Menu }
    ];
  }

  return (
    <nav className="block lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1118]/95 backdrop-blur-xl border-t border-[#222534] shadow-[0_-8px_24px_rgba(0,0,0,0.5)] pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1 px-1">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = tab.path && (
            currentPath === tab.path || 
            (tab.path !== '/today' && tab.path !== '/' && currentPath.startsWith(tab.path))
          );

          if (tab.action) {
            return (
              <button
                key="menu-toggle"
                type="button"
                onClick={tab.action}
                className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-brand-muted hover:text-brand-text active:scale-95 transition-all select-none min-h-[48px]"
                aria-label="Відкрити меню"
              >
                <Icon size={20} className="mb-0.5 text-brand-muted" />
                <span className="text-[10px] font-bold tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              type="button"
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 select-none min-h-[48px] relative ${
                isActive
                  ? 'text-brand-olive font-extrabold'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={`mb-0.5 transition-transform ${
                    isActive ? 'scale-110 text-brand-olive drop-shadow-[0_0_8px_rgba(74,94,56,0.6)]' : ''
                  }`}
                />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-brand-olive animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'text-white font-extrabold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
