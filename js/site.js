/* Smart AI site shell — theme, mobile menu, navbar scroll */
(function () {
  var html = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var nav = document.querySelector('.navbar');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  try {
    var saved = localStorage.getItem('theme') || localStorage.getItem('smartai_theme');
    if (saved) applyTheme(saved);
  } catch (e) {}

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var cur = html.getAttribute('data-theme') || 'dark';
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  window.closeMenu = function () {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  window.toggleFaq = function (btn) {
    var item = btn.parentElement;
    var was = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('active');
    });
    if (!was) item.classList.add('active');
  };
})();
