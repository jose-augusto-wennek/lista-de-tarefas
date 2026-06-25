/**
 * theme.js — Dark mode compartilhado entre todas as páginas.
 * Deve ser carregado ANTES de qualquer outro script da página
 * para evitar flash de tema errado.
 */
(function () {
  'use strict';

  // Aplica tema salvo imediatamente (antes do DOMContentLoaded)
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode-pending');
  }

  function initTheme() {
    var btn = document.getElementById('themeToggle');

    // Aplica dark-mode no body se estava pendente
    if (document.documentElement.classList.contains('dark-mode-pending')) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.remove('dark-mode-pending');
    }

    // Atualiza ícone conforme tema atual
    function updateIcon() {
      if (!btn) return;
      var icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = document.body.classList.contains('dark-mode')
          ? 'light_mode'
          : 'dark_mode';
      }
    }

    updateIcon();

    if (btn) {
      btn.addEventListener('click', function () {
        var isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcon();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
