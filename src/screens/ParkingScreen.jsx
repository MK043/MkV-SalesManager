import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { useRouter } from '../router/Router';
import { api } from '../utils/api';
import {
  Car,
  ParkingSquare,
  Clock,
  ArrowRight,
  User,
  Wrench,
  CheckCircle2
} from 'lucide-react';

export function ParkingScreen() {
  const { t } = useTranslation();
  const { navigate } = useRouter();

  const [parkedOrders, setParkedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParking = async () => {
    try {
      setLoading(true);
      const data = await api.get('/orders/parking');
      setParkedOrders(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParking();
  }, []);

  const handleRelease = async (orderId) => {
    try {
      await api.post(`/orders/${orderId}/release-from-parking`);
      fetchParking();
    } catch (err) {
      alert(err.message || 'Помилка повернення зі стоянки');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
          <ParkingSquare size={22} className="text-brand-sand" />
          {t.parking.title}
        </h1>
        <p className="text-xs text-brand-muted">
          {t.parking.subtitle}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full text-center py-12 text-brand-muted text-xs">
            {t.common.loading}
          </div>
        ) : parkedOrders.length === 0 ? (
          <div className="col-span-full card p-12 text-center text-brand-muted text-xs space-y-2">
            <ParkingSquare size={32} className="mx-auto text-brand-muted/40" />
            <p>{t.parking.emptyParking}</p>
          </div>
        ) : (
          parkedOrders.map((o) => {
            const daysOnLot = Math.max(1, Math.floor((Date.now() - new Date(o.created_at || Date.now()).getTime()) / 86400000));
            return (
              <div
                key={o.id}
                className="card p-5 space-y-4 flex flex-col justify-between hover:border-brand-sand/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wide text-brand-sand">
                      {o.plate}
                    </span>
                    <span className="badge badge-yellow text-[10px] flex items-center gap-1">
                      <Clock size={11} /> {daysOnLot} {t.parking.daysOnParking}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-brand-text">
                      {o.brand} {o.model}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted mt-1">
                      <User size={13} />
                      <span>{o.customer_name}</span>
                    </div>
                  </div>

                  {o.comment && (
                    <div className="p-2.5 rounded-lg bg-brand-surface2 text-xs border border-brand-border italic text-brand-subtle">
                      "{o.comment}"
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRelease(o.id)}
                    className="flex-1 btn btn-primary btn-sm text-xs justify-center"
                  >
                    <Wrench size={14} /> {t.parking.takeToWork}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/orders/${o.id}`)}
                    className="btn btn-secondary btn-sm text-xs"
                    title="Картка замовлення"
                  >
                    Картка →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
