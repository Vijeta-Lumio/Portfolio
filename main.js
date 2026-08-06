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

/* ===== Skill bars animate when visible ===== */
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar span');

  if (!bars.length) return;
  if (!('IntersectionObserver' in window)) {
    bars.forEach((el) => (el.style.width = el.dataset.level + '%'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + '%';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((el) => observer.observe(el));
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

/* ===== Contact form ===== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = "Thanks! Your message has been sent. I'll reply within 24 hours.";
    form.reset();
  });
})();
