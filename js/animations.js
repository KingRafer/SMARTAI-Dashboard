/* Light scroll animations for landing */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('.card, .section-title, .hero-content');
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
