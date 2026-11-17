/* Smart AI site shell */
(function () {
  var themeToggle = document.getElementById('theme-toggle');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('smartai_theme', theme); } catch (e) {}
  }

  try {
    var saved = localStorage.getItem('smartai_theme');
    if (saved) applyTheme(saved);
  } catch (e) {}

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  window.closeMenu = function () {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
  }
})();
