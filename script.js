// Theme toggle: follows the system setting until the visitor picks one.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return media.matches ? 'dark' : 'light';
  }

  function updateLabel() {
    if (!btn) return;
    btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      updateLabel();
    });
  }
  if (media.addEventListener) media.addEventListener('change', updateLabel);
  updateLabel();

  // Print the full news list, not just the visible part.
  window.addEventListener('beforeprint', function () {
    document.querySelectorAll('details').forEach(function (d) { d.setAttribute('open', ''); });
  });

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
