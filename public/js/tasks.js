/* ══════════════════════════════════════════
   tasks.js — FocusFlow Tasks Page
   Tema e sidebar gerenciados por theme.js e sidebar.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────
  // 1. STATE
  // ─────────────────────────────────────────
  let tasks = JSON.parse(localStorage.getItem('ff_tasks') || '[]');
  let history = JSON.parse(localStorage.getItem('ff_history') || '[]');
  let editingId = null;
  let currentFilter = 'all';
  let currentSort = 'date';
  let searchQuery = '';

  if (tasks.length === 0) {
    tasks = [
      {
        id: uid(),
        title: 'Finalize Q3 Marketing Assets',
        description: 'Review banners and update Figma files based on client feedback.',
        priority: 'high',
        date: todayDate(),
        time: '14:00',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: uid(),
        title: 'Team Sync Presentation',
        description: 'Prepare slides for the weekly team sync.',
        priority: 'medium',
        date: tomorrowDate(),
        time: '10:00',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: uid(),
        title: 'Update project documentation',
        description: '',
        priority: 'low',
        date: tomorrowDate(),
        time: '16:00',
        completed: true,
        createdAt: new Date().toISOString()
      }
    ];
    saveTasks();
  }

  // ─────────────────────────────────────────
  // 2. HELPERS
  // ─────────────────────────────────────────
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }
  function todayDate() {
    return new Date().toISOString().split('T')[0];
  }
  function tomorrowDate() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }
  function saveTasks() {
    localStorage.setItem('ff_tasks', JSON.stringify(tasks));
  }
  function saveHistory() {
    localStorage.setItem('ff_history', JSON.stringify(history));
  }
  function addHistory(type, taskTitle) {
    history.unshift({ type, title: taskTitle, at: new Date().toISOString() });
    if (history.length > 50) history.pop();
    saveHistory();
    renderHistory();
  }
  function formatDate(dateStr, timeStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const label = `${d}/${m}/${y}`;
    return timeStr ? `${label} às ${timeStr}` : label;
  }
  function formatHistoryTime(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function priorityOrder(p) {
    return { high: 0, medium: 1, low: 2 }[p] ?? 3;
  }
  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function showToast(msg, icon = 'check_circle', color = '#0057cd') {
    const toast = document.getElementById('tasks-toast');
    if (!toast) return;
    toast.querySelector('.toast-icon').textContent = icon;
    toast.querySelector('.toast-icon').style.color = color;
    toast.querySelector('.toast-text').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ─────────────────────────────────────────
  // 3. STATS
  // ─────────────────────────────────────────
  function renderStats() {
    document.getElementById('stat-total').textContent = tasks.length;
    document.getElementById('stat-completed').textContent = tasks.filter(t => t.completed).length;
    document.getElementById('stat-pending').textContent = tasks.filter(t => !t.completed).length;
    document.getElementById('stat-high').textContent = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  }

  // ─────────────────────────────────────────
  // 4. RENDER TASK LIST
  // ─────────────────────────────────────────
  function getFilteredTasks() {
    let list = [...tasks];
    if (currentFilter === 'pending')   list = list.filter(t => !t.completed);
    if (currentFilter === 'completed') list = list.filter(t => t.completed);
    if (currentFilter === 'high')      list = list.filter(t => t.priority === 'high' && !t.completed);
    if (currentFilter === 'today')     list = list.filter(t => t.date === todayDate() && !t.completed);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
      );
    }

    if (currentSort === 'priority') list.sort((a, b) => priorityOrder(a.priority) - priorityOrder(b.priority));
    if (currentSort === 'date') {
      list.sort((a, b) => {
        const da = a.date || '9999', db = b.date || '9999';
        if (da !== db) return da.localeCompare(db);
        return (a.time || '').localeCompare(b.time || '');
      });
    }
    if (currentSort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    list.sort((a, b) => Number(a.completed) - Number(b.completed));
    return list;
  }

  function priorityBadge(p) {
    const map = {
      high:   `<span class="badge-high">High</span>`,
      medium: `<span class="badge-medium">Medium</span>`,
      low:    `<span class="badge-low">Low</span>`
    };
    return map[p] || '';
  }

  function renderTasks() {
    const list = getFilteredTasks();
    const container = document.getElementById('task-list');
    const empty = document.getElementById('empty-state');
    container.innerHTML = '';

    if (list.length === 0) {
      empty.classList.add('visible');
      renderStats();
      return;
    }
    empty.classList.remove('visible');

    list.forEach(task => {
      const div = document.createElement('div');
      div.className = `task-item${task.completed ? ' completed' : ''}`;
      div.dataset.id = task.id;
      div.innerHTML = `
        <button class="task-cb${task.completed ? ' checked' : ''}" data-action="toggle" title="Concluir">
          ${task.completed ? '<span class="material-symbols-outlined" style="font-size:13px;color:#0057cd">check</span>' : ''}
        </button>
        <div class="flex-grow-1 min-w-0">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-1 flex-wrap">
            <span class="task-item-title">${escHtml(task.title)}</span>
            ${priorityBadge(task.priority)}
          </div>
          ${task.description ? `<div class="task-item-desc">${escHtml(task.description)}</div>` : ''}
          <div class="task-item-meta">
            ${task.date ? `<span class="d-flex align-items-center gap-1">
              <span class="material-symbols-outlined" style="font-size:13px">calendar_today</span>
              ${formatDate(task.date, task.time)}
            </span>` : ''}
          </div>
        </div>
        <div class="task-item-actions">
          <button class="btn-item-action edit" data-action="edit" title="Editar">
            <span class="material-symbols-outlined" style="font-size:18px">edit</span>
          </button>
          <button class="btn-item-action delete" data-action="delete" title="Excluir">
            <span class="material-symbols-outlined" style="font-size:18px">delete</span>
          </button>
        </div>
      `;
      container.appendChild(div);
    });

    renderStats();
  }

  // ─────────────────────────────────────────
  // 5. TASK LIST ACTIONS (event delegation)
  // ─────────────────────────────────────────
  document.getElementById('task-list').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const item = btn.closest('.task-item');
    const id = item?.dataset.id;
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (btn.dataset.action === 'toggle') {
      task.completed = !task.completed;
      saveTasks();
      addHistory(task.completed ? 'completed' : 'restored', task.title);
      showToast(
        task.completed ? 'Tarefa concluída!' : 'Tarefa reaberta.',
        task.completed ? 'check_circle' : 'replay',
        task.completed ? '#1a7a3c' : '#0057cd'
      );
      renderTasks();
    }

    if (btn.dataset.action === 'edit') openModal(task);

    if (btn.dataset.action === 'delete') {
      if (confirm(`Excluir "${task.title}"?`)) {
        addHistory('deleted', task.title);
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        showToast('Tarefa excluída.', 'delete', '#ba1a1a');
        renderTasks();
      }
    }
  });

  // ─────────────────────────────────────────
  // 6. MODAL (add / edit)
  // ─────────────────────────────────────────
  const modalEl = document.getElementById('taskModal');
  const bsModal = new bootstrap.Modal(modalEl);
  let selectedPriority = 'medium';

  function openModal(task = null) {
    editingId = task ? task.id : null;
    selectedPriority = task ? task.priority : 'medium';

    document.getElementById('modal-title').textContent = task ? 'Editar Tarefa' : 'Nova Tarefa';
    document.getElementById('field-title').value = task ? task.title : '';
    document.getElementById('field-desc').value = task ? task.description || '' : '';
    document.getElementById('field-date').value = task ? task.date || '' : todayDate();
    document.getElementById('field-time').value = task ? task.time || '' : '';

    document.querySelectorAll('.priority-option').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.priority === selectedPriority);
    });

    bsModal.show();
    setTimeout(() => document.getElementById('field-title').focus(), 300);
  }

  document.querySelectorAll('.priority-option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPriority = btn.dataset.priority;
      document.querySelectorAll('.priority-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal());
  });

  document.getElementById('btn-save-task').addEventListener('click', () => {
    const titleEl = document.getElementById('field-title');
    const title = titleEl.value.trim();
    if (!title) {
      titleEl.focus();
      titleEl.style.borderColor = '#ba1a1a';
      return;
    }
    titleEl.style.borderColor = '';

    const payload = {
      title,
      description: document.getElementById('field-desc').value.trim(),
      priority: selectedPriority,
      date: document.getElementById('field-date').value,
      time: document.getElementById('field-time').value
    };

    if (editingId) {
      const idx = tasks.findIndex(t => t.id === editingId);
      tasks[idx] = { ...tasks[idx], ...payload };
      addHistory('edited', payload.title);
      showToast('Tarefa atualizada!', 'edit', '#a63b00');
    } else {
      tasks.unshift({ id: uid(), ...payload, completed: false, createdAt: new Date().toISOString() });
      addHistory('added', payload.title);
      showToast('Tarefa adicionada!', 'check_circle', '#0057cd');
    }

    saveTasks();
    renderTasks();
    bsModal.hide();
  });

  // ─────────────────────────────────────────
  // 7. FILTERS, SORT, SEARCH
  // ─────────────────────────────────────────
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTasks();
    });
  });

  document.getElementById('sort-select')?.addEventListener('change', e => {
    currentSort = e.target.value;
    renderTasks();
  });

  document.getElementById('search-input')?.addEventListener('input', e => {
    searchQuery = e.target.value;
    renderTasks();
  });

  document.getElementById('btn-clear-completed')?.addEventListener('click', () => {
    const n = tasks.filter(t => t.completed).length;
    if (!n) { showToast('Nenhuma tarefa concluída.', 'info', '#727787'); return; }
    if (confirm(`Remover ${n} tarefa(s) concluída(s)?`)) {
      tasks.filter(t => t.completed).forEach(t => addHistory('deleted', t.title));
      tasks = tasks.filter(t => !t.completed);
      saveTasks();
      showToast(`${n} tarefa(s) removida(s).`, 'delete', '#ba1a1a');
      renderTasks();
    }
  });

  // ─────────────────────────────────────────
  // 8. HISTORY
  // ─────────────────────────────────────────
  const historyIcons = {
    added:     { label: 'Adicionada' },
    completed: { label: 'Concluída'  },
    restored:  { label: 'Reaberta'   },
    edited:    { label: 'Editada'    },
    deleted:   { label: 'Excluída'   }
  };

  function renderHistory() {
    const container = document.getElementById('history-list');
    if (!container) return;
    if (history.length === 0) {
      container.innerHTML = `<div class="history-empty">Nenhuma ação registrada ainda.</div>`;
      return;
    }
    container.innerHTML = history.slice(0, 20).map(h => {
      const meta = historyIcons[h.type] || historyIcons.added;
      return `
        <div class="history-item">
          <span class="history-dot ${h.type}"></span>
          <div class="flex-grow-1">
            <div class="history-action"><strong>${meta.label}:</strong> ${escHtml(h.title)}</div>
            <div class="history-time">${formatHistoryTime(h.at)}</div>
          </div>
        </div>`;
    }).join('');
  }

  document.getElementById('btn-clear-history')?.addEventListener('click', () => {
    if (confirm('Limpar todo o histórico?')) {
      history = [];
      saveHistory();
      renderHistory();
      showToast('Histórico limpo.', 'delete_sweep', '#727787');
    }
  });

  // ─────────────────────────────────────────
  // 9. INITIAL RENDER
  // ─────────────────────────────────────────
  renderTasks();
  renderHistory();
});
