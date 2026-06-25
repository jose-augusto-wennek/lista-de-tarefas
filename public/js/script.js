document.addEventListener('DOMContentLoaded', () => {
  // Tema e sidebar: gerenciados por theme.js e sidebar.js

  // ── Task checkboxes ──
  const toast = document.getElementById('toast');

  document.querySelectorAll('.task-checkbox').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('checked');
      btn.innerHTML = btn.classList.contains('checked')
        ? '<span class="material-symbols-outlined" style="font-size:14px;color:#0057cd">check</span>'
        : '';
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }
    });
  });

  // ── Filter buttons ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
