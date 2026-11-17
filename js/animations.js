/* Light scroll + pop animations for landing */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if ('IntersectionObserver' in window) {
    var els = document.querySelectorAll('.card, .section-title, .hero-copy, .hero-visual, .monitor-card');
    if (els.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in-view', 'revealed');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      els.forEach(function (el) { io.observe(el); });
    }
  }

  var cards = document.querySelectorAll('.card');
  cards.forEach(function (el, i) {
    el.style.setProperty('--delay', (i % 6) * 80 + 'ms');
  });
})();
