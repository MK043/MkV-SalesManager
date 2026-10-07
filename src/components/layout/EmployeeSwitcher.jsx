import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  ChevronDown, 
  Check, 
  RotateCcw, 
  UserCheck, 
  Shield, 
  Wrench, 
  Briefcase, 
  Car, 
  Zap, 
  Paintbrush, 
  Sparkles,
  Layers
} from 'lucide-react';

const ROLE_ICONS = {
  'Власник': Shield,
  'Виконавчий директор': Briefcase,
  'Начальник виробництва': Layers,
  'Майстер-приймальник': UserCheck,
  'Менеджер із запчастин': Wrench,
  'Механік': Wrench,
  'Автоелектрик': Zap,
  'Кузовник': Car,
  'Маляр': Paintbrush,
  'Мийник': Sparkles
};

export function EmployeeSwitcher() {
  const { 
    user, 
    allUsers, 
    switchUser, 
    switchRole, 
    resetToOwner, 
    isImpersonating 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('employees'); // 'employees' | 'roles'
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList = [
    { name: 'Власник', desc: 'Повний контроль цеху, фінансів та персоналу' },
    { name: 'Приймальник', desc: 'Прийомка авто, запис, касові ордери, видача' },
    { name: 'Механік', desc: 'Ремонт, виконання робіт, заповнення чек-листів' },
    { name: 'Запчастинник', desc: 'Підбір деталей за VIN, склад, постачання' },
    { name: 'Нач. виробництва', desc: 'Контроль конвеєра, розподіл авто, зміни' },
    { name: 'Автоелектрик', desc: 'Компʼютерна діагностика, ремонт електрики' },
    { name: 'Кузовник', desc: 'Кузовний ремонт, геометрія, рихтування' },
    { name: 'Маляр', desc: 'Підготовка та фарбування деталей' },
    { name: 'Мийник', desc: 'Мийка, хімчистка та підготовка до видачі' }
  ];

  const handleSelectUser = async (userId) => {
    await switchUser(userId);
    setIsOpen(false);
  };

  const handleSelectRole = async (roleName) => {
    await switchRole(roleName);
    setIsOpen(false);
  };

  const handleReset = async () => {
    await resetToOwner();
    setIsOpen(false);
  };

  const currentPosition = user?.position || 'Власник';
  const IconComp = ROLE_ICONS[currentPosition] || Users;

  return (
    <div className="relative" ref={menuRef}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
          isImpersonating 
            ? 'bg-brand-olive/20 text-brand-olive border-brand-olive shadow-sm ring-1 ring-brand-olive/30' 
            : 'bg-brand-surface2 hover:bg-brand-surfaceHover text-brand-text border-brand-border'
        }`}
        title="Перемкнути обліковий запис співробітника"
      >
        <span className="text-brand-muted hidden xl:inline">Роль:</span>
        <span className={`inline-block w-2 h-2 rounded-full ${isImpersonating ? 'bg-amber-400 animate-pulse' : 'bg-brand-green'}`} />
        <span className="font-bold truncate max-w-[110px] sm:max-w-[140px]">
          {currentPosition}
        </span>
        <ChevronDown size={14} className={`text-brand-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-brand-surface border border-brand-border shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="p-3.5 border-b border-brand-border bg-brand-surface2/60 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-brand-text flex items-center gap-1.5">
                <Users size={14} className="text-brand-olive" />
                Перемикання акаунта
              </div>
              <div className="text-[11px] text-brand-muted">
                Оберіть працівника для відстеження та виконання завдань
              </div>
            </div>

            {isImpersonating && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] px-2 py-1 rounded bg-brand-surface hover:bg-brand-surfaceHover text-brand-sand border border-brand-border flex items-center gap-1 font-medium transition-colors"
                title="Повернутися до Власника"
              >
                <RotateCcw size={12} /> Власник
              </button>
            )}
          </div>

          {/* Tab switch: За працівниками / За ролями */}
          <div className="flex border-b border-brand-border text-xs bg-brand-surface2/30">
            <button
              type="button"
              onClick={() => setActiveTab('employees')}
              className={`flex-1 py-2 text-center font-bold transition-colors ${
                activeTab === 'employees'
                  ? 'text-brand-olive border-b-2 border-brand-olive bg-brand-surface'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Співробітники ({allUsers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('roles')}
              className={`flex-1 py-2 text-center font-bold transition-colors ${
                activeTab === 'roles'
                  ? 'text-brand-olive border-b-2 border-brand-olive bg-brand-surface'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              Швидкі ролі
            </button>
          </div>

          {/* List Content */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {activeTab === 'employees' ? (
              allUsers.map((u) => {
                const isSelected = user?.id === u.id;
                const RoleIcon = ROLE_ICONS[u.position] || Users;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleSelectUser(u.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-brand-olive text-white shadow-sm'
                        : 'hover:bg-brand-surfaceHover text-brand-text'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-brand-surface2 text-brand-olive border border-brand-border'
                      }`}>
                        {u.full_name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">
                          {u.full_name}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-brand-muted'}`}>
                          {u.position || u.role_name}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check size={15} className="shrink-0 ml-2" />}
                  </button>
                );
              })
            ) : (
              rolesList.map((r) => {
                const isSelected = user?.position?.toLowerCase().includes(r.name.toLowerCase());
                const RoleIcon = ROLE_ICONS[r.name] || Users;
                return (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => handleSelectRole(r.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-brand-olive text-white shadow-sm'
                        : 'hover:bg-brand-surfaceHover text-brand-text'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-brand-surface2 text-brand-sand border border-brand-border'
                      }`}>
                        <RoleIcon size={14} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">
                          {r.name}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-white/80' : 'text-brand-muted'}`}>
                          {r.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check size={15} className="shrink-0 ml-2" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer info */}
          <div className="p-2.5 bg-brand-surface2/50 border-t border-brand-border text-[11px] text-brand-muted flex items-center justify-between">
            <span>Активний сеанс: <strong className="text-brand-text">{user?.full_name}</strong></span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border">
              {currentPosition}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
