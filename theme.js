(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'pflavio-theme';
  let theme = 'dark';
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (_) { /* The switch still works when storage is unavailable. */ }
  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const meta = document.querySelector('meta[name="theme-color"]');
    const language = root.lang;
    const labels = {
      'de': ['Heller Modus', 'Dunkler Modus', 'Zum hellen Modus wechseln', 'Zum dunklen Modus wechseln'],
      'pt-BR': ['Modo claro', 'Modo escuro', 'Mudar para o modo claro', 'Mudar para o modo escuro'],
      'en-US': ['Light mode', 'Dark mode', 'Switch to light mode', 'Switch to dark mode']
    };
    const words = labels[language] || labels['en-US'];
    const update = () => {
      root.dataset.theme = theme;
      if (meta) meta.content = theme === 'dark' ? '#172d45' : '#faf9f6';
      if (!button) return;
      const nextLight = theme === 'dark';
      button.querySelector('.theme-label').textContent = words[nextLight ? 0 : 1];
      button.setAttribute('aria-label', words[nextLight ? 2 : 3]);
    };
    update();
    if (button) {
      button.hidden = false;
      button.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        update();
        try { localStorage.setItem(key, theme); } catch (_) { /* Optional persistence. */ }
      });
    }
  });
})();
