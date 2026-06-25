/* ══════════════════════════════════════════
   calendar.js — FocusFlow Calendar Page
   Tema e sidebar gerenciados por theme.js e sidebar.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Seleção de dia no calendário ──
  document.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
    day.addEventListener('click', () => {
      document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
    });
  });

  // ── Filtro de visualização (Month / Week / Day) ──
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
