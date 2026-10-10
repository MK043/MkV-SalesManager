import React, { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useRouter } from '../../router/Router';
import { api } from '../../utils/api';
import { X, Car, User, Wrench, Calendar, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function NewOrderModal() {
  const { t } = useTranslation();
  const { isNewOrderModalOpen, setIsNewOrderModalOpen, customers, addCustomer } = useApp();
  const { navigate } = useRouter();

  const [brand, setBrand] = useState('Toyota');
  const [model, setModel] = useState('Camry');
  const [plate, setPlate] = useState('AO 7788 MK');
  const [year, setYear] = useState('2021');
  const [color, setColor] = useState('Чорний');
  const [customerName, setCustomerName] = useState('Мельник Тарас Григорович');
  const [customerPhone, setCustomerPhone] = useState('+380501234567');
  const [requestType, setRequestType] = useState('Слюсарний ремонт');
  const [workItems, setWorkItems] = useState(['Комп’ютерна діагностика', 'Заміна моторної оливи та фільтрів']);
  const [newWorkItem, setNewWorkItem] = useState('');
  const [estimatedTotal, setEstimatedTotal] = useState('3800');
  const [comment, setComment] = useState('Клієнт скаржиться на легкий стукіт у передній підвісці');
  const [deadlineDays, setDeadlineDays] = useState('2');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (isNewOrderModalOpen) {
      const stored = sessionStorage.getItem('mkv-prefill-customer');
      if (stored) {
        try {
          const c = JSON.parse(stored);
          if (c.name) setCustomerName(c.name);
          if (c.phone) setCustomerPhone(c.phone);
          if (c.brand) setBrand(c.brand);
          if (c.model) setModel(c.model);
          if (c.plate) setPlate(c.plate);
          if (c.year) setYear(String(c.year));
          sessionStorage.removeItem('mkv-prefill-customer');
        } catch (e) {}
      }
    }
  }, [isNewOrderModalOpen]);

  const handleSelectExistingClient = (e) => {
    const custId = Number(e.target.value);
    if (!custId) return;
    const c = customers.find(x => x.id === custId);
    if (c) {
      setCustomerName(c.full_name);
      if (c.phone) setCustomerPhone(c.phone);
      if (c.car_brand) setBrand(c.car_brand);
      if (c.car_model) setModel(c.car_model);
      if (c.plate) setPlate(c.plate);
      if (c.year) setYear(String(c.year));
    }
  };

  if (!isNewOrderModalOpen) return null;

  const handleAddWorkItem = () => {
    if (newWorkItem.trim()) {
      setWorkItems(prev => [...prev, newWorkItem.trim()]);
      setNewWorkItem('');
    }
  };

  const handleRemoveWorkItem = (idx) => {
    setWorkItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const deadline = new Date(Date.now() + Number(deadlineDays) * 86400000).toISOString();

    try {
      // Auto-save client if new
      if (customerName.trim() && !customers.some(c => (c.full_name || '').toLowerCase() === customerName.trim().toLowerCase())) {
        try {
          await addCustomer({
            full_name: customerName.trim(),
            phone: customerPhone.trim(),
            car_brand: brand,
            car_model: model,
            plate: plate.toUpperCase(),
            year: Number(year) || null
          });
        } catch (errCust) {
          console.warn('Customer auto-create warning:', errCust);
        }
      }

      const created = await api.post('/orders', {
        brand,
        model,
        plate: plate.toUpperCase(),
        year: Number(year) || 2020,
        color,
        customer_name: customerName,
        customer_phone: customerPhone,
        request_type: requestType,
        work_list: workItems,
        grand_total: Number(estimatedTotal) || 3500,
        comment,
        deadline_at: deadline
      });

      setIsNewOrderModalOpen(false);
      window.dispatchEvent(new CustomEvent('mkv-order-created', { detail: created }));
      navigate(`/orders/${created.id}`);
    } catch (err) {
      setError(err.message || 'Не вдалося створити наряд');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-olive text-white">
              <Car size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-brand-text">
                {t.orders.newOrderTitle}
              </h2>
              <p className="text-xs text-brand-muted">
                MKV Production • Швидке оформлення прийомки
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsNewOrderModalOpen(false)}
            className="p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Section: Vehicle */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
              <Car size={14} className="text-brand-olive" /> Дані автомобіля
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Марка</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="input"
                  placeholder="Toyota, BMW..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Модель</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="input"
                  placeholder="Camry, X5..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Держномер</label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={e => setPlate(e.target.value)}
                  className="input font-mono uppercase font-bold"
                  placeholder="AO 1234 MK"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Рік випуску</label>
                <input
                  type="number"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  className="input font-mono"
                  placeholder="2021"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Колір кузова</label>
                <input
                  type="text"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="input"
                  placeholder="Чорний, Білий..."
                />
              </div>
            </div>
          </div>

          {/* Section: Customer */}
          <div className="space-y-3 pt-2 border-t border-brand-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
                <User size={14} className="text-brand-olive" /> Клієнт
              </h3>
              {customers.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-brand-muted">Обрати з бази:</span>
                  <select
                    onChange={handleSelectExistingClient}
                    className="select py-1 text-xs max-w-[220px]"
                    defaultValue=""
                  >
                    <option value="" disabled>-- Постійний клієнт --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.full_name} {c.car_brand ? `(${c.car_brand})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">ПІБ Клієнта</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="input"
                  placeholder="Прізвище Ім'я По батькові"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Номер телефону</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="input font-mono"
                  placeholder="+380..."
                />
              </div>
            </div>
          </div>

          {/* Section: Works & Services */}
          <div className="space-y-3 pt-2 border-t border-brand-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
              <Wrench size={14} className="text-brand-olive" /> Роботи та вартість
            </h3>
            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1">Напрямок ремонту</label>
              <select
                value={requestType}
                onChange={e => setRequestType(e.target.value)}
                className="select"
              >
                <option value="Слюсарний ремонт">Слюсарний ремонт</option>
                <option value="Планове ТО">Планове технічне обслуговування (ТО)</option>
                <option value="Комп'ютерна діагностика">Комп'ютерна діагностика</option>
                <option value="Ремонт ходової частини">Ремонт ходової частини</option>
                <option value="Кузовний ремонт">Кузовний ремонт та фарбування</option>
                <option value="Автоелектрика">Автоелектрика та електронні блоки</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1">Перелік узгоджених робіт</label>
              <div className="space-y-1.5 mb-2">
                {workItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-brand-surface2 text-xs">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveWorkItem(idx)}
                      className="text-brand-muted hover:text-brand-red p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newWorkItem}
                  onChange={e => setNewWorkItem(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddWorkItem())}
                  placeholder="Додати найменування послуги..."
                  className="input text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddWorkItem}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus size={14} /> Додати
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Орієнтовна вартість (₴)</label>
                <input
                  type="number"
                  value={estimatedTotal}
                  onChange={e => setEstimatedTotal(e.target.value)}
                  className="input font-mono font-bold"
                  placeholder="3500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Термін виконання (днів)</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={deadlineDays}
                  onChange={e => setDeadlineDays(e.target.value)}
                  className="input font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1">Примітки та скарги клієнта</label>
              <textarea
                rows={2}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="textarea text-xs"
                placeholder="Додаткова інформація..."
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsNewOrderModalOpen(false)}
              className="btn btn-ghost text-xs"
              disabled={loading}
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary text-xs shadow-md shadow-brand-olive/20"
            >
              {loading ? t.common.loading : 'Оформити та відкрити наряд'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
