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
    const german = root.lang === 'de';
    const update = () => {
      root.dataset.theme = theme;
      if (meta) meta.content = theme === 'dark' ? '#172d45' : '#faf9f6';
      if (!button) return;
      const nextLight = theme === 'dark';
      button.querySelector('.theme-label').textContent = german
        ? (nextLight ? 'Heller Modus' : 'Dunkler Modus')
        : (nextLight ? 'Light mode' : 'Dark mode');
      button.setAttribute('aria-label', german
        ? (nextLight ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln')
        : (nextLight ? 'Switch to light mode' : 'Switch to dark mode'));
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
