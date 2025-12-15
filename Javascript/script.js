// Header mobile toggle (accessible)
(function(){
  const btn = document.getElementById('btn-mobile');
  const menu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (menu.hasAttribute('hidden')) {
      menu.removeAttribute('hidden');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    } else {
      menu.setAttribute('hidden', '');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  });

  // Keyboard: close mobile menu on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  });

      // Update footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();

// Small enhancement: prefer-reduced-motion respect
(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('reduce-motion');
  }
})();

//-----------------------------------------------------------------------------------------------------










