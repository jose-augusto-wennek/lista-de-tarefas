/**
 * sidebar.js — Sidebar mobile compartilhado entre todas as páginas.
 * Não usa body.style.overflow diretamente; usa classe CSS para evitar
 * conflito com qualquer outro JS da página.
 */
(function () {
  'use strict';

  function init() {
    var sidebar = document.getElementById('sidebar');
    var btn = document.getElementById('mobileMenuBtn');
    var overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !btn) return;

    function open() {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.classList.add('sidebar-open');
    }

    function close() {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) close();
      else open();
    });

    if (overlay) {
      overlay.addEventListener('click', close);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
