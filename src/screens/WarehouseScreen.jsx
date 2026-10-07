import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';
import { formatMoney } from '../utils/currency';
import {
  Boxes,
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  Package,
  Layers
} from 'lucide-react';

export function WarehouseScreen() {
  const { t } = useTranslation();
  const { currency } = useApp();

  const [activeTab, setActiveTab] = useState('stock'); // stock, docs
  const [items, setItems] = useState([]);
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemSku, setItemSku] = useState('');
  const [itemCategory, setItemCategory] = useState('Запчастини');
  const [itemQty, setItemQty] = useState('10');
  const [itemBuyPrice, setItemBuyPrice] = useState('600');
  const [itemSellPrice, setItemSellPrice] = useState('950');

  const [showDocModal, setShowDocModal] = useState(false);
  const [docType, setDocType] = useState('receipt');
  const [docAmount, setDocAmount] = useState('12000');
  const [docComment, setDocComment] = useState('Постачання від дистриб’ютора');

  const fetchWarehouseData = async () => {
    try {
      setLoading(true);
      const [itemsRes, docsRes] = await Promise.all([
        api.get('/warehouse/items'),
        api.get('/warehouse/docs')
      ]);
      setItems(itemsRes || []);
      setDocs(docsRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouseData();
  }, []);

  const handleCreateItem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/warehouse/items', {
        name: itemName,
        sku: itemSku || `SKU-${Math.floor(Math.random()*90000 + 10000)}`,
        category: itemCategory,
        quantity: Number(itemQty) || 0,
        unit: 'шт',
        buy_price: Number(itemBuyPrice) || 0,
        sell_price: Number(itemSellPrice) || 0
      });
      setShowItemModal(false);
      setItemName('');
      fetchWarehouseData();
    } catch (err) {
      alert(err.message || 'Помилка створення позиції');
    }
  };

  const handleCreateDoc = async (e) => {
    e.preventDefault();
    try {
      await api.post('/warehouse/docs', {
        doc_type: docType,
        total_amount: Number(docAmount) || 0,
        comment: docComment
      });
      setShowDocModal(false);
      fetchWarehouseData();
    } catch (err) {
      alert(err.message || 'Помилка створення накладної');
    }
  };

  const handlePostDoc = async (id) => {
    try {
      await api.post(`/warehouse/docs/${id}/post`);
      fetchWarehouseData();
    } catch (err) {
      alert(err.message || 'Помилка проведення документа');
    }
  };

  const handleUnpostDoc = async (id) => {
    try {
      await api.post(`/warehouse/docs/${id}/unpost`);
      fetchWarehouseData();
    } catch (err) {
      alert(err.message || 'Помилка скасування');
    }
  };

  const filteredItems = items.filter(i => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (i.name && i.name.toLowerCase().includes(s)) ||
           (i.sku && i.sku.toLowerCase().includes(s)) ||
           (i.category && i.category.toLowerCase().includes(s));
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <Boxes size={22} className="text-brand-olive" />
            {t.warehouse.title}
          </h1>
          <p className="text-xs text-brand-muted">
            Складські залишки, накладні приходу, списання та рух матеріалів
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'stock' ? (
            <button
              type="button"
              onClick={() => setShowItemModal(true)}
              className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20"
            >
              <Plus size={16} /> Новий товар
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDocModal(true)}
              className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20"
            >
              <Plus size={16} /> {t.warehouse.newDocBtn}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-brand-border flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('stock')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'stock'
              ? 'border-brand-olive text-brand-olive bg-brand-olive/5'
              : 'border-transparent text-brand-muted hover:text-brand-text'
          }`}
        >
          <Package size={15} /> {t.warehouse.tabStock} ({items.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'docs'
              ? 'border-brand-olive text-brand-olive bg-brand-olive/5'
              : 'border-transparent text-brand-muted hover:text-brand-text'
          }`}
        >
          <FileText size={15} /> {t.warehouse.tabDocs} ({docs.length})
        </button>
      </div>

      {/* TAB 1: Stock Inventory */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="card p-3 max-w-sm">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Пошук за назвою або артикулом..."
                className="input pl-8 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t.warehouse.itemName}</th>
                    <th>{t.warehouse.article}</th>
                    <th>{t.warehouse.category}</th>
                    <th className="text-right">{t.warehouse.inStock}</th>
                    <th className="text-right">{t.warehouse.buyPrice}</th>
                    <th className="text-right">{t.warehouse.sellPrice}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id}>
                      <td className="font-bold text-brand-text">{item.name}</td>
                      <td className="font-mono text-xs text-brand-sand">{item.sku}</td>
                      <td>
                        <span className="badge badge-gray text-xs">{item.category}</span>
                      </td>
                      <td className="text-right font-mono font-bold text-brand-text">
                        {item.quantity} {item.unit || 'шт'}
                      </td>
                      <td className="text-right font-mono text-xs text-brand-muted">
                        {formatMoney(item.buy_price, currency)}
                      </td>
                      <td className="text-right font-mono text-xs font-bold text-brand-green">
                        {formatMoney(item.sell_price, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Documents */}
      {activeTab === 'docs' && (
        <div className="card overflow-hidden">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>№ Документа</th>
                  <th>{t.warehouse.docType}</th>
                  <th>Дата</th>
                  <th>{t.warehouse.docStatus}</th>
                  <th className="text-right">Сума накладної</th>
                  <th>Коментар</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(doc => (
                  <tr key={doc.id}>
                    <td className="font-mono font-bold text-xs text-brand-sand">
                      {doc.doc_number}
                    </td>
                    <td>
                      <span className="badge badge-accent text-xs">
                        {doc.doc_type === 'receipt' ? t.warehouse.docIncome :
                         doc.doc_type === 'dispatch' ? t.warehouse.docOutcome :
                         doc.doc_type === 'writeoff' ? t.warehouse.docWriteoff : t.warehouse.docInventory}
                      </span>
                    </td>
                    <td className="text-xs font-mono text-brand-muted">
                      {doc.date ? doc.date.slice(0, 10) : '—'}
                    </td>
                    <td>
                      {doc.status === 'posted' ? (
                        <span className="badge badge-green text-xs flex items-center gap-1 w-max">
                          <CheckCircle2 size={12} /> {t.warehouse.docPosted}
                        </span>
                      ) : (
                        <span className="badge badge-yellow text-xs flex items-center gap-1 w-max">
                          <Clock size={12} /> {t.warehouse.docDraft}
                        </span>
                      )}
                    </td>
                    <td className="text-right font-mono font-bold text-xs">
                      {formatMoney(doc.total_amount, currency)}
                    </td>
                    <td className="text-xs text-brand-muted">{doc.comment || '—'}</td>
                    <td>
                      {doc.status === 'draft' ? (
                        <button
                          type="button"
                          onClick={() => handlePostDoc(doc.id)}
                          className="btn btn-primary btn-sm text-[11px]"
                        >
                          {t.warehouse.postDoc}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUnpostDoc(doc.id)}
                          className="btn btn-secondary btn-sm text-[11px]"
                        >
                          {t.warehouse.unpostDoc}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: New Item */}
      {showItemModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text">Додати товар на склад</h3>
            <form onSubmit={handleCreateItem} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Найменування</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  className="input text-xs"
                  placeholder="Олива моторна 5W-30..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Артикул / SKU</label>
                  <input
                    type="text"
                    value={itemSku}
                    onChange={e => setItemSku(e.target.value)}
                    className="input text-xs font-mono"
                    placeholder="Auto..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Категорія</label>
                  <select
                    value={itemCategory}
                    onChange={e => setItemCategory(e.target.value)}
                    className="select text-xs"
                  >
                    <option value="Запчастини">Запчастини</option>
                    <option value="Мастила та рідини">Мастила та рідини</option>
                    <option value="Фільтри">Фільтри</option>
                    <option value="Гальмівна система">Гальмівна система</option>
                    <option value="Витратні матеріали">Витратні матеріали</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Кількість</label>
                  <input
                    type="number"
                    value={itemQty}
                    onChange={e => setItemQty(e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Закупка (₴)</label>
                  <input
                    type="number"
                    value={itemBuyPrice}
                    onChange={e => setItemBuyPrice(e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Продаж (₴)</label>
                  <input
                    type="number"
                    value={itemSellPrice}
                    onChange={e => setItemSellPrice(e.target.value)}
                    className="input text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowItemModal(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Doc */}
      {showDocModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text">{t.warehouse.newDocBtn}</h3>
            <form onSubmit={handleCreateDoc} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Тип документа</label>
                <select
                  value={docType}
                  onChange={e => setDocType(e.target.value)}
                  className="select text-xs"
                >
                  <option value="receipt">Прибуткова накладна (Прихід)</option>
                  <option value="dispatch">Відвантаження в наряд</option>
                  <option value="writeoff">Списання матеріалів</option>
                  <option value="inventory">Інвентаризація</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Сума накладної (₴)</label>
                <input
                  type="number"
                  required
                  value={docAmount}
                  onChange={e => setDocAmount(e.target.value)}
                  className="input font-mono font-bold text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Коментар</label>
                <textarea
                  rows={2}
                  value={docComment}
                  onChange={e => setDocComment(e.target.value)}
                  className="textarea text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowDocModal(false)} className="btn btn-ghost btn-sm">
                  Скасувати
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Створити накладну
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
