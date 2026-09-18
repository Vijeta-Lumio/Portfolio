/* ===== Footer year ===== */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ===== Typing effect ===== */
(function initTypewriter() {
  const typedEl = document.querySelector('.typed');
  if (!typedEl) return;

  const roles = [
    'beautiful interfaces.',
    'seamless user flows.',
    'design systems.',
    'delightful experiences.',
    'accessible products.',
  ];
  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const HOLD_DELAY = 1500;
  const NEXT_WORD_DELAY = 300;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    typedEl.textContent = roles[roleIndex].slice(0, charIndex);

    if (deleting) {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(step, NEXT_WORD_DELAY);
      } else {
        setTimeout(step, DELETE_SPEED);
      }
      return;
    }

    charIndex++;
    if (charIndex > roles[roleIndex].length) {
      deleting = true;
      setTimeout(step, HOLD_DELAY);
    } else {
      setTimeout(step, TYPE_SPEED);
    }
  }

  step();
})();

/* ===== Scroll reveal ===== */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');

  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
})();

/* ===== Counter animation ===== */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const TOTAL_FRAMES = 60;

  if (!counters.length) return;
  if (!('IntersectionObserver' in window)) {
    counters.forEach((el) => (el.textContent = el.dataset.count));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.count) || 0;
        const step = target / TOTAL_FRAMES;
        let frame = 0;
        let value = 0;

        const tick = () => {
          frame++;
          value = Math.min(value + step, target);
          el.textContent = Math.round(value);
          if (frame < TOTAL_FRAMES) requestAnimationFrame(tick);
        };
        tick();
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => observer.observe(el));
})();

/* ===== Cursor glow (fine pointers only) ===== */
(function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  if (!window.matchMedia('(pointer: fine)').matches) {
    glow.style.display = 'none';
    return;
  }

  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      ticking = false;
    });
  });
})();

/* ===== Fire trail (fine pointers only) ===== */
(function initFireTrail() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const DOT_COUNT = 18;
  const dots = [];

  const base = document.createElement('span');
  base.className = 'trail-dot';
  base.style.width = '26px';
  base.style.height = '26px';
  document.body.appendChild(base);

  for (let i = 0; i < DOT_COUNT; i++) {
    const dot = document.createElement('span');
    dot.className = 'trail-dot';
    const t = i / (DOT_COUNT - 1);
    const size = 22 * (1 - t * 0.85);
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.opacity = String(0.85 * (1 - t));
    dot.style.left = '0px';
    dot.style.top = '0px';
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let tx = 0;
  let ty = 0;
  let hasMouse = false;
  const LERP = 0.18;

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!hasMouse) {
      hasMouse = true;
      base.style.left = tx + 'px';
      base.style.top = ty + 'px';
      dots.forEach((d) => { d.x = tx; d.y = ty; });
    }
  });

  function render() {
    if (!hasMouse) { requestAnimationFrame(render); return; }

    base.style.left = tx + 'px';
    base.style.top = ty + 'px';

    let px = tx;
    let py = ty;
    for (const dot of dots) {
      dot.x += (px - dot.x) * LERP;
      dot.y += (py - dot.y) * LERP;
      dot.el.style.left = dot.x + 'px';
      dot.el.style.top = dot.y + 'px';
      px = dot.x;
      py = dot.y;
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();

/* ===== Smooth scroll for in-page anchors ===== */
(function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ===== Scroll spy navigation ===== */
(function initScrollSpy() {
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  const NAV_IDS = ['home', 'experience', 'about', 'work', 'contact'];
  const sections = NAV_IDS
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let currentNav = 'home';

  const active = (id) => {
    if (id === currentNav) return;
    currentNav = id;
    links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
  };

  const onScroll = () => {
    const fromTop = window.scrollY + 130;
    let lastId = '';
    sections.forEach((s) => {
      if (s.offsetTop <= fromTop) lastId = s.id;
    });
    if (NAV_IDS.includes(lastId)) active(lastId);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
