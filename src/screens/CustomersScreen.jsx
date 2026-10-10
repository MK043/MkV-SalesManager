import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { formatMoney } from '../utils/currency';
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Car,
  Calendar,
  FileText,
  Trash2,
  X,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Shield,
  FilePlus,
  Clock
} from 'lucide-react';

export function CustomersScreen() {
  const { customers, addCustomer, deleteCustomer, currency, setIsNewOrderModalOpen, user } = useApp();
  const { navigate } = useRouter();

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Form states for new customer
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+380 ');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [plate, setPlate] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const filteredCustomers = customers.filter(c => {
    const q = search.toLowerCase();
    return (
      (c.full_name || '').toLowerCase().includes(q) ||
      (c.phone || '').toLowerCase().includes(q) ||
      (c.car_brand || '').toLowerCase().includes(q) ||
      (c.car_model || '').toLowerCase().includes(q) ||
      (c.plate || '').toLowerCase().includes(q) ||
      (c.vin || '').toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setFullName('');
    setPhone('+380 ');
    setCarBrand('');
    setCarModel('');
    setPlate('');
    setYear('');
    setVin('');
    setNotes('');
    setError(null);
    setIsAddModalOpen(true);
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Вкажіть імʼя або ПІБ клієнта');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await addCustomer({
        full_name: fullName.trim(),
        phone: phone.trim(),
        car_brand: carBrand.trim(),
        car_model: carModel.trim(),
        plate: plate.trim().toUpperCase(),
        year: year ? Number(year) : null,
        vin: vin.trim().toUpperCase(),
        notes: notes.trim()
      });
      setIsAddModalOpen(false);
    } catch (err) {
      setError('Не вдалося зберегти клієнта: ' + (err.message || 'помилка сервера'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (custId, e) => {
    e.stopPropagation();
    if (window.confirm('Видалити цього клієнта з бази?')) {
      await deleteCustomer(custId);
      if (selectedCustomer?.id === custId) {
        setSelectedCustomer(null);
      }
    }
  };

  const handleCreateOrderForClient = (cust, e) => {
    e.stopPropagation();
    sessionStorage.setItem('mkv-prefill-customer', JSON.stringify({
      name: cust.full_name,
      phone: cust.phone,
      brand: cust.car_brand,
      model: cust.car_model,
      plate: cust.plate,
      year: cust.year
    }));
    setIsNewOrderModalOpen(true);
  };

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
              База клієнтів
            </h1>
            <span className="badge badge-accent text-xs">
              {customers.length} клієнтів
            </span>
          </div>
          <p className="text-xs text-brand-muted">
            Облік клієнтів автосервісу, закріплені автомобілі, контакти та історія звернень
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="btn btn-primary btn-md shadow-lg shadow-brand-olive/20 self-start sm:self-auto flex items-center gap-2 font-bold"
        >
          <UserPlus size={16} />
          <span>Додати клієнта</span>
        </button>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук за імʼям, телефоном, маркою авто, держномером або VIN..."
            className="input pl-10 pr-4 py-2.5 w-full text-xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Customers List / Table */}
      {filteredCustomers.length === 0 ? (
        <div className="card p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-surface2 mx-auto flex items-center justify-center text-brand-muted">
            <Users size={24} className="text-brand-olive" />
          </div>
          <h3 className="text-sm font-bold text-brand-text">
            Клієнтів не знайдено
          </h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            {search ? 'Спробуйте змінити пошуковий запит' : 'Додайте першого клієнта за допомогою кнопки вище'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((cust) => {
            const hasCar = Boolean(cust.car_brand || cust.plate);
            return (
              <div
                key={cust.id}
                onClick={() => setSelectedCustomer(cust)}
                className="card p-4 space-y-3.5 hover:border-brand-olive/50 cursor-pointer transition-all hover:shadow-md group relative"
              >
                {/* Client Name & Phone */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-brand-surface2 text-brand-olive font-extrabold text-sm flex items-center justify-center border border-brand-border shrink-0 group-hover:bg-brand-olive group-hover:text-white transition-colors">
                      {cust.full_name?.charAt(0) || 'К'}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-brand-text truncate group-hover:text-brand-olive transition-colors">
                        {cust.full_name}
                      </h3>
                      {cust.phone ? (
                        <a
                          href={`tel:${cust.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-brand-muted hover:text-emerald-400 flex items-center gap-1.5 truncate font-mono mt-0.5"
                          title="Зателефонувати клієнту"
                        >
                          <Phone size={12} className="shrink-0 text-emerald-400" />
                          <span>{cust.phone}</span>
                        </a>
                      ) : (
                        <div className="text-xs text-brand-muted">Телефон не вказано</div>
                      )}
                    </div>
                  </div>

                  {user?.position === 'Власник' && (
                    <button
                      type="button"
                      onClick={(e) => handleDelete(cust.id, e)}
                      className="text-brand-muted hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-colors"
                      title="Видалити клієнта"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {/* Vehicle Badge */}
                <div className="p-2.5 rounded-xl bg-brand-surface2/60 border border-brand-border space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-text flex items-center gap-1.5 truncate">
                      <Car size={13} className="text-brand-sand shrink-0" />
                      {hasCar ? `${cust.car_brand || ''} ${cust.car_model || ''} ${cust.year ? `(${cust.year})` : ''}` : 'Автомобіль не привʼязано'}
                    </span>
                    {cust.plate && (
                      <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-brand-surface text-brand-sand border border-brand-border shrink-0">
                        {cust.plate}
                      </span>
                    )}
                  </div>
                  {cust.vin && (
                    <div className="text-[10px] font-mono text-brand-muted truncate">
                      VIN: {cust.vin}
                    </div>
                  )}
                </div>

                {/* Notes if any */}
                {cust.notes && (
                  <p className="text-[11px] text-brand-muted italic line-clamp-2 bg-brand-surface px-2.5 py-1.5 rounded-lg border border-brand-border/60">
                    "{cust.notes}"
                  </p>
                )}

                {/* Actions */}
                <div className="pt-1 flex items-center justify-between border-t border-brand-border/60 text-xs">
                  <span className="text-brand-muted text-[11px]">
                    Замовлень: <strong className="text-brand-text">{cust.orders_count || 1}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleCreateOrderForClient(cust, e)}
                    className="btn btn-secondary btn-xs flex items-center gap-1 font-bold text-brand-olive hover:text-brand-text"
                  >
                    <FilePlus size={12} />
                    <span>Створити наряд</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Додати клієнта */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-brand-olive text-white">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-brand-text">
                    Новий клієнт
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Реєстрація клієнта та привʼязка автомобіля
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

            <form onSubmit={handleCreateCustomer} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-text">
                  ПІБ / Імʼя клієнта <span className="text-rose-400">*</span>
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

              <div className="pt-2 border-t border-brand-border">
                <h4 className="text-xs font-extrabold text-brand-sand uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Car size={13} />
                  Дані автомобіля
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted">
                      Марка авто
                    </label>
                    <input
                      type="text"
                      value={carBrand}
                      onChange={(e) => setCarBrand(e.target.value)}
                      placeholder="Toyota, BMW, Volkswagen..."
                      className="input w-full text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted">
                      Модель
                    </label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="Camry, X5, Passat..."
                      className="input w-full text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted">
                      Держномер
                    </label>
                    <input
                      type="text"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      placeholder="AA 1234 BC"
                      className="input w-full text-xs font-mono uppercase"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-muted">
                      Рік випуску
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2021"
                      className="input w-full text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1 mt-3">
                  <label className="text-xs font-semibold text-brand-muted">
                    VIN-код (номер кузова)
                  </label>
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    placeholder="17-значний номер кузова (опціонально)"
                    className="input w-full text-xs font-mono uppercase"
                    maxLength={17}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-muted">
                  Примітка / Коментар
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Особливості клієнта або автомобіля..."
                  className="input w-full text-xs"
                />
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
                  {submitting ? 'Збереження...' : 'Зберегти клієнта'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-olive text-white font-bold text-sm flex items-center justify-center">
                  {selectedCustomer.full_name?.charAt(0) || 'К'}
                </div>
                <div>
                  <h2 className="text-base font-bold text-brand-text">
                    {selectedCustomer.full_name}
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Карта постійного клієнта автосервісу
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 rounded-xl bg-brand-surface2 border border-brand-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-brand-muted">Телефон:</span>
                  <strong className="text-brand-text font-mono">{selectedCustomer.phone || '—'}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-muted">Автомобіль:</span>
                  <strong className="text-brand-text">{selectedCustomer.car_brand} {selectedCustomer.car_model} {selectedCustomer.year ? `(${selectedCustomer.year})` : ''}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-muted">Номерний знак:</span>
                  <span className="font-mono text-xs font-bold text-brand-sand">{selectedCustomer.plate || '—'}</span>
                </div>
                {selectedCustomer.vin && (
                  <div className="flex justify-between text-xs">
                    <span className="text-brand-muted">VIN:</span>
                    <span className="font-mono text-xs text-brand-muted">{selectedCustomer.vin}</span>
                  </div>
                )}
              </div>

              {selectedCustomer.notes && (
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-border text-xs text-brand-text">
                  <div className="text-[11px] font-bold text-brand-muted mb-1">Примітка:</div>
                  <p>{selectedCustomer.notes}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleCreateOrderForClient(selectedCustomer, e)}
                  className="btn btn-primary text-xs font-bold flex items-center gap-1.5"
                >
                  <FilePlus size={14} />
                  <span>Оформити замовлення-наряд</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="btn btn-secondary text-xs"
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
