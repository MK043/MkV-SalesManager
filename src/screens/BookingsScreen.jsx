import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import {
  Calendar,
  Plus,
  Clock,
  Car,
  User,
  ArrowRight,
  Trash2,
  CheckCircle2,
  Phone
} from 'lucide-react';

export function BookingsScreen() {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+38050');
  const [carBrand, setCarBrand] = useState('BMW');
  const [carModel, setCarModel] = useState('X5');
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [visitTime, setVisitTime] = useState('11:00');
  const [service, setService] = useState('Діагностика та планове ТО');
  const [comment, setComment] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.get('/bookings');
      setBookings(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', {
        customer_name: customerName,
        customer_phone: customerPhone,
        car_brand: carBrand,
        car_model: carModel,
        visit_date: visitDate,
        visit_time: visitTime,
        service,
        comment
      });
      setShowModal(false);
      setCustomerName('');
      fetchBookings();
    } catch (err) {
      alert(err.message || 'Помилка створення запису');
    }
  };

  const handleConvert = async (id) => {
    try {
      const res = await api.post(`/bookings/${id}/convert`);
      if (res.order_id) {
        navigate(`/orders/${res.order_id}`);
      }
    } catch (err) {
      alert(err.message || 'Помилка конвертації запису');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити запис?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      alert(err.message || 'Помилка видалення');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Calendar size={22} className="text-brand-olive" />
            {t.bookings.title}
          </h1>
          <p className="text-xs text-brand-muted">
            {t.bookings.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 self-start sm:self-auto"
        >
          <Plus size={16} /> {t.bookings.newBookingBtn}
        </button>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-brand-muted text-xs">
            {t.common.loading}
          </div>
        ) : bookings.length === 0 ? (
          <div className="col-span-full card p-12 text-center text-brand-muted text-xs">
            Записів на ремонт наразі немає
          </div>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="card p-5 space-y-4 flex flex-col justify-between hover:border-brand-olive/50 transition-colors">
              <div className="space-y-3">
                {/* Date & Time chip */}
                <div className="flex items-center justify-between">
                  <span className="badge badge-accent font-mono text-xs flex items-center gap-1.5">
                    <Clock size={12} />
                    {b.visit_date} • {b.visit_time || '10:00'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(b.id)}
                    className="text-brand-muted hover:text-brand-red p-1 rounded"
                    title="Видалити запис"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Car & Customer */}
                <div>
                  <h3 className="text-base font-bold text-brand-text flex items-center gap-2">
                    <Car size={16} className="text-brand-olive" />
                    {b.car_brand} {b.car_model}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
                    <User size={13} />
                    <span className="font-semibold text-brand-text">{b.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-muted font-mono mt-0.5">
                    <Phone size={13} />
                    <span>{b.customer_phone}</span>
                  </div>
                </div>

                {/* Service requested */}
                <div className="p-2.5 rounded-lg bg-brand-surface2 text-xs border border-brand-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                    Послуга:
                  </span>
                  <span className="font-semibold text-brand-text block">
                    {b.service}
                  </span>
                  {b.comment && (
                    <p className="text-[11px] text-brand-subtle italic">
                      "{b.comment}"
                    </p>
                  )}
                </div>
              </div>

              {/* 1-Click Convert to Order */}
              <button
                type="button"
                onClick={() => handleConvert(b.id)}
                className="w-full btn btn-primary btn-sm text-xs justify-center shadow-sm"
              >
                <CheckCircle2 size={14} /> {t.bookings.convertOrderBtn}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal: New Booking */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text flex items-center gap-2">
              <Calendar size={18} className="text-brand-olive" />
              {t.bookings.newBookingBtn}
            </h3>

            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Марка авто</label>
                  <input
                    type="text"
                    required
                    value={carBrand}
                    onChange={e => setCarBrand(e.target.value)}
                    className="input text-xs"
                    placeholder="BMW, Audi..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Модель авто</label>
                  <input
                    type="text"
                    required
                    value={carModel}
                    onChange={e => setCarModel(e.target.value)}
                    className="input text-xs"
                    placeholder="X5, A6..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">ПІБ Клієнта</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="input text-xs"
                  placeholder="Ковальчук Василь"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Телефон</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="input text-xs font-mono"
                  placeholder="+380..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Дата візиту</label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Час</label>
                  <input
                    type="time"
                    required
                    value={visitTime}
                    onChange={e => setVisitTime(e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Послуга / Причина звернення</label>
                <input
                  type="text"
                  required
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="input text-xs"
                  placeholder="Заміна гальмівних колодок..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Коментар</label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="textarea text-xs"
                  placeholder="Додаткові побажання..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Зберегти запис
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
