/* ==========================================================================
   MkV Sales Manager CRM — Interactive Client Logic
   Author: Багин Михайло Михайлович, ФІТ УжНУ (ІПЗ-1, 2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initWaveformSimulator();
  initChecklists();
  initCampaignSwitches();
  initHookSelectors();
  initTabNavigation();
});

// Toast Notifications System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
  if (type === 'success') {
    icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
  } else if (type === 'warning') {
    icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Waveform Audio Simulator for AI Voiceover
function initWaveformSimulator() {
  const playBtns = document.querySelectorAll('.waveform-play-btn');
  playBtns.forEach(btn => {
    let isPlaying = false;
    let interval = null;
    const waveContainer = btn.closest('.waveform-container');
    const bars = waveContainer ? waveContainer.querySelectorAll('.wave-bar') : [];

    btn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        btn.style.background = '#10b981';
        showToast('Відтворення синтезованого ШІ-голосу (Voice: Ava, Speed: 1.1x)', 'success');
        
        interval = setInterval(() => {
          bars.forEach(bar => {
            const h = Math.floor(Math.random() * 18) + 4;
            bar.style.height = `${h}px`;
          });
        }, 150);
      } else {
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        btn.style.background = '#6366f1';
        clearInterval(interval);
        bars.forEach(bar => bar.style.height = '6px');
      }
    });
  });
}

// Interactive Checklists (CAPI, TikTok Spark, Anti-ban)
function initChecklists() {
  const steps = document.querySelectorAll('.checklist-step');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      step.classList.toggle('completed');
      updateChecklistProgress(step.closest('.checklist-group'));
    });
  });

  // Calculate initial progress
  document.querySelectorAll('.checklist-group').forEach(group => {
    updateChecklistProgress(group);
  });
}

function updateChecklistProgress(group) {
  if (!group) return;
  const total = group.querySelectorAll('.checklist-step').length;
  const completed = group.querySelectorAll('.checklist-step.completed').length;
  const fill = group.querySelector('.progress-bar-fill');
  const countSpan = group.querySelector('.completed-count');

  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  if (fill) fill.style.width = `${pct}%`;
  if (countSpan) countSpan.textContent = `${completed}/${total} (${pct}%)`;

  if (completed === total && total > 0) {
    showToast('Всі технічні налаштування модуля виконано успішно!', 'success');
  }
}

// Campaign Switch Toggles
function initCampaignSwitches() {
  const switches = document.querySelectorAll('.campaign-toggle');
  switches.forEach(sw => {
    sw.addEventListener('change', (e) => {
      const row = e.target.closest('tr');
      const campaignName = row ? row.querySelector('.campaign-name')?.textContent.trim() : 'Кампанія';
      const statusPill = row ? row.querySelector('.status-pill') : null;

      if (e.target.checked) {
        if (statusPill) {
          statusPill.className = 'status-pill active';
          statusPill.textContent = 'Active';
        }
        showToast(`Кампанію «${campaignName}» активовано в рекламній мережі`, 'success');
      } else {
        if (statusPill) {
          statusPill.className = 'status-pill paused';
          statusPill.textContent = 'Paused';
        }
        showToast(`Кампанію «${campaignName}» поставлено на паузу`, 'warning');
      }
    });
  });
}

// Hook Options in AI Studio
function initHookSelectors() {
  const hookCards = document.querySelectorAll('.hook-option-card');
  hookCards.forEach(card => {
    card.addEventListener('click', () => {
      hookCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const hookName = card.querySelector('.hook-title')?.childNodes[0].textContent.trim();
      showToast(`Обрано маркетинговий гачок: ${hookName}`, 'info');
    });
  });
}

// Master SPA Tab Navigation
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.page-tab-btn[data-target]');
  const views = document.querySelectorAll('.page-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Also sync sidebar
      document.querySelectorAll('.sidebar .nav-item[data-target]').forEach(nav => {
        if (nav.getAttribute('data-target') === targetId) {
          nav.classList.add('active');
        } else {
          nav.classList.remove('active');
        }
      });

      views.forEach(v => {
        if (v.id === targetId) {
          v.style.display = 'block';
        } else {
          v.style.display = 'none';
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Sidebar link clicks in SPA
  document.querySelectorAll('.sidebar .nav-item[data-target]').forEach(nav => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = nav.getAttribute('data-target');
      const matchingTab = document.querySelector(`.page-tab-btn[data-target="${targetId}"]`);
      if (matchingTab) matchingTab.click();
    });
  });
}

// Modal helper
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}
