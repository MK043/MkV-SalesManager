import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
import { 
  Users, 
  ChevronDown, 
  Check, 
  UserPlus, 
  UserCheck, 
  Shield, 
  Wrench, 
  Briefcase, 
  Car, 
  Zap, 
  Paintbrush, 
  Sparkles,
  Layers,
  X,
  User,
  Phone
} from 'lucide-react';

const PRESET_ROLES = [
  { key: 'Власник', label: 'Власник', desc: 'Повний доступ до всіх функцій та фінансів' },
  { key: 'Приймальник', label: 'Приймальник', desc: 'Прийом авто, наряди, клієнти та запис' },
  { key: 'Механік', label: 'Механік', desc: 'Виконання робіт, чек-листи та прогрес' },
  { key: 'Запчастинник', label: 'Запчастинник', desc: 'Склад деталей, наявність та підбір' },
  { key: 'Нач. виробництва', label: 'Нач. виробництва', desc: 'Контроль конвеєра та координація цеху' },
  { key: 'Автоелектрик', label: 'Автоелектрик', desc: 'Діагностика та ремонт автоелектрики' },
  { key: 'Кузовник', label: 'Кузовник', desc: 'Кузовний ремонт, геометрія та рихтування' },
  { key: 'Мийник', label: 'Мийник', desc: 'Мийка, хімчистка та видача авто' }
];

export function EmployeeSwitcher() {
  const { 
    user, 
    allUsers, 
    switchUser, 
    switchRole, 
    resetToOwner, 
    addUser,
    isImpersonating 
  } = useApp();
  const { navigate } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [expandedRole, setExpandedRole] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Registration modal states
  const [regName, setRegName] = useState('');
  const [regPosition, setRegPosition] = useState('Механік');
  const [regPhone, setRegPhone] = useState('+380 ');
  const [regRate, setRegRate] = useState('200');
  const [submitting, setSubmitting] = useState(false);
  const [regError, setRegError] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setExpandedRole(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter users by role
  const getUsersByRole = (roleKey) => {
    const q = roleKey.toLowerCase();
    return allUsers.filter(u => {
      const pos = (u.position || '').toLowerCase();
      const rName = (u.role_name || '').toLowerCase();
      if (q === 'нач. виробництва') {
        return pos.includes('виробництв') || pos.includes('начальник');
      }
      if (q === 'запчастинник') {
        return pos.includes('запчастин');
      }
      return pos.includes(q) || rName.includes(q);
    });
  };

  const handleSelectRole = async (roleObj) => {
    const matchingUsers = getUsersByRole(roleObj.key);
    
    // If there is more than 1 user for this role, toggle expansion so user can choose specific person
    if (matchingUsers.length > 1 && expandedRole !== roleObj.key) {
      setExpandedRole(roleObj.key);
      return;
    }

    // Otherwise switch to this role directly
    await switchRole(roleObj.key);
    setIsOpen(false);
    setExpandedRole(null);

    // If technician, automatically jump to My Tasks
    const pos = roleObj.key.toLowerCase();
    if (['механік', 'автоелектрик', 'кузовник', 'мийник'].some(r => pos.includes(r))) {
      navigate('/my-tasks');
    }
  };

  const handleSelectUser = async (userId, userPosition) => {
    await switchUser(userId);
    setIsOpen(false);
    setExpandedRole(null);

    const pos = (userPosition || '').toLowerCase();
    if (['механік', 'автоелектрик', 'кузовник', 'мийник'].some(r => pos.includes(r))) {
      navigate('/my-tasks');
    }
  };

  const handleRegisterEmployee = async (e) => {
    e.preventDefault();
    if (!regName.trim()) {
      setRegError('Вкажіть імʼя працівника');
      return;
    }

    try {
      setSubmitting(true);
      setRegError(null);
      const created = await addUser({
        full_name: regName.trim(),
        position: regPosition,
        role_name: regPosition === 'Власник' ? 'Власник' : 'Цеховий фахівець',
        phone: regPhone.trim(),
        hourly_rate: Number(regRate) || 0
      });

      setIsRegisterModalOpen(false);
      // Automatically switch to the newly registered employee
      await switchUser(created.id);
      setIsOpen(false);
    } catch (err) {
      setRegError('Не вдалося зареєструвати: ' + (err.message || 'помилка'));
    } finally {
      setSubmitting(false);
    }
  };

  const currentRoleDisplay = user?.position || 'Власник';

  return (
    <>
      <div className="relative select-none" ref={menuRef}>
        {/* Toggle Button formatted like Image 1: "Роль: [Владелец  ▼]" */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isImpersonating
              ? 'bg-[#1b2218] border-brand-olive text-emerald-400 ring-1 ring-brand-olive/40'
              : 'bg-[#15171e] hover:bg-[#1a1d26] text-brand-text border-brand-border'
          }`}
          title="Вибір активної ролі працівника"
        >
          <span className="text-brand-muted font-normal">Роль:</span>
          <span className="font-bold text-white max-w-[120px] truncate">
            {currentRoleDisplay}
          </span>
          <ChevronDown
            size={14}
            className={`text-brand-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu (Vertical list of roles like Image 1) */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-[18rem] sm:w-72 rounded-xl bg-[#14161f] border border-[#232734] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="p-1.5 space-y-0.5 max-h-96 overflow-y-auto">
              {PRESET_ROLES.map((r) => {
                const usersInRole = getUsersByRole(r.key);
                const isCurrentRole = (user?.position || '').toLowerCase().includes(r.key.toLowerCase());
                const isExpanded = expandedRole === r.key;

                return (
                  <div key={r.key} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleSelectRole(r)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors ${
                        isCurrentRole
                          ? 'bg-brand-olive text-white font-bold shadow-sm'
                          : 'text-gray-300 hover:text-white hover:bg-[#1c202c]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate">{r.label}</span>
                        {usersInRole.length > 1 && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isCurrentRole ? 'bg-white/20 text-white' : 'bg-[#232736] text-brand-sand'
                          }`}>
                            {usersInRole.length}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCurrentRole && <Check size={14} className="text-white shrink-0" />}
                        {usersInRole.length > 1 && (
                          <ChevronDown
                            size={12}
                            className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Sub-list if role has multiple registered employees */}
                    {isExpanded && usersInRole.length > 0 && (
                      <div className="pl-4 pr-1 py-1 space-y-1 bg-[#0f1118] rounded-lg border border-[#1f2330]">
                        <div className="text-[10px] text-brand-muted px-2 pt-1 font-semibold uppercase tracking-wider">
                          Працівники з роллю «{r.label}»:
                        </div>
                        {usersInRole.map((u) => {
                          const isThisUser = user?.id === u.id;
                          return (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => handleSelectUser(u.id, u.position)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left text-xs transition-colors ${
                                isThisUser
                                  ? 'bg-brand-olive text-white font-bold'
                                  : 'text-gray-300 hover:text-white hover:bg-[#191c28]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <User size={12} className={isThisUser ? 'text-white' : 'text-brand-muted'} />
                                <span className="truncate">{u.full_name}</span>
                              </div>
                              {isThisUser && <Check size={12} />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Action: Register New Employee */}
            <div className="p-2 border-t border-[#232734] bg-[#11131a] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsRegisterModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-brand-sand hover:text-white bg-[#191d29] hover:bg-brand-olive/40 border border-[#262b3a] transition-all"
              >
                <UserPlus size={13} />
                <span>+ Зареєструвати працівника</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Fast Employee Registration */}
      {isRegisterModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-olive text-white">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-brand-text">
                    Реєстрація працівника
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Створення облікового запису та закріплення ролі
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegisterEmployee} className="p-6 space-y-4">
              {regError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {regError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  ПІБ працівника <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="наприклад: Ковальчук Василь Іванович"
                  className="input w-full text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  Роль у сервісі <span className="text-rose-400">*</span>
                </label>
                <select
                  value={regPosition}
                  onChange={(e) => setRegPosition(e.target.value)}
                  className="input w-full text-xs"
                >
                  <option value="Механік">Механік (Цеховий ремонт)</option>
                  <option value="Автоелектрик">Автоелектрик (Діагностика & електрика)</option>
                  <option value="Кузовник">Кузовник (Рихтування & геометрія)</option>
                  <option value="Маляр">Маляр (Фарбування & підготовка)</option>
                  <option value="Мийник">Мийник (Детейлінг & мийка)</option>
                  <option value="Майстер-приймальник">Майстер-приймальник (Прийомка & наряди)</option>
                  <option value="Запчастинник">Запчастинник (Склад деталей)</option>
                  <option value="Начальник виробництва">Начальник виробництва (Контроль цеху)</option>
                  <option value="Власник">Власник (Повний доступ)</option>
                </select>
                <p className="text-[11px] text-brand-muted">
                  Можна зареєструвати необмежену кількість працівників на кожну роль.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  Номер телефону
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+380 50 123 4567"
                  className="input w-full text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  Годинна ставка (₴/год)
                </label>
                <input
                  type="number"
                  value={regRate}
                  onChange={(e) => setRegRate(e.target.value)}
                  placeholder="200"
                  className="input w-full text-xs font-mono"
                />
              </div>

              <div className="pt-3 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="btn btn-secondary text-xs"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary text-xs font-bold"
                >
                  {submitting ? 'Реєстрація...' : 'Зареєструвати'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
