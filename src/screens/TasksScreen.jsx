import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { api } from '../utils/api';
import {
  CheckSquare,
  Plus,
  Clock,
  User,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export function TasksScreen() {
  const { t } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const [tasksRes, usersRes] = await Promise.all([
        api.get('/company-tasks'),
        api.get('/admin/users')
      ]);
      setTasks(tasksRes || []);
      setUsers(usersRes || []);
      if (usersRes?.length > 0 && !assignedTo) {
        setAssignedTo(usersRes[0].full_name);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/company-tasks', {
        title: title.trim(),
        description: description.trim(),
        priority,
        assigned_to: assignedTo
      });
      setShowModal(false);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      alert(err.message || 'Помилка створення завдання');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'open' : 'completed';
    try {
      await api.patch(`/company-tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      alert('Помилка оновлення завдання');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-brand-text flex items-center gap-2">
            <CheckSquare size={22} className="text-brand-olive" />
            {t.tasks.companyTitle}
          </h1>
          <p className="text-xs text-brand-muted">
            Внутрішні виробничі доручення та операційні завдання персоналу
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm shadow-md shadow-brand-olive/20 self-start sm:self-auto"
        >
          <Plus size={16} /> {t.tasks.addTaskBtn}
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-brand-muted text-xs">
            {t.common.loading}
          </div>
        ) : tasks.length === 0 ? (
          <div className="card p-12 text-center text-brand-muted text-xs">
            Активних завдань немає
          </div>
        ) : (
          tasks.map(task => {
            const isCompleted = task.status === 'completed';
            return (
              <div
                key={task.id}
                className={`card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isCompleted ? 'opacity-60 bg-brand-surface2' : 'hover:border-brand-olive/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(task.id, task.status)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isCompleted ? 'bg-brand-green border-brand-green text-white' : 'border-brand-border hover:border-brand-olive'
                    }`}
                  >
                    {isCompleted && <CheckCircle2 size={14} />}
                  </button>

                  <div className="space-y-1">
                    <span className={`text-sm font-bold block ${isCompleted ? 'line-through text-brand-muted' : 'text-brand-text'}`}>
                      {task.title}
                    </span>
                    {task.description && (
                      <p className="text-xs text-brand-muted">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-brand-muted pt-1">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {task.assigned_to || 'Не призначено'}
                      </span>
                      <span className="font-mono text-[11px]">
                        {task.created_at ? task.created_at.slice(0, 10) : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className={`badge text-[11px] ${
                    task.priority === 'high' ? 'badge-red' : task.priority === 'low' ? 'badge-gray' : 'badge-yellow'
                  }`}>
                    {task.priority === 'high' ? t.tasks.priorityHigh : task.priority === 'low' ? t.tasks.priorityLow : t.tasks.priorityMedium}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Add Task */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-brand-text">{t.tasks.addTaskBtn}</h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Назва завдання</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="input text-xs"
                  placeholder="Замовити оливу для компресора..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Опис / Деталі</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="textarea text-xs"
                  placeholder="Детальний зміст доручення..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Пріоритет</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="select text-xs"
                  >
                    <option value="low">{t.tasks.priorityLow}</option>
                    <option value="medium">{t.tasks.priorityMedium}</option>
                    <option value="high">{t.tasks.priorityHigh}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-muted mb-1">Виконавець</label>
                  <select
                    value={assignedTo}
                    onChange={e => setAssignedTo(e.target.value)}
                    className="select text-xs"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.full_name}>{u.full_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
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
    </div>
  );
}
