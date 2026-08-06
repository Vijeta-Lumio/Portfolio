// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Typing effect =====
const roles = ['beautiful interfaces.', 'seamless user flows.', 'design systems.', 'delightful experiences.', 'accessible products.'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.querySelector('.typed');

function type() {
  const word = roles[roleIndex];
  typedEl.textContent = word.slice(0, charIndex);
  if (!deleting) {
    charIndex++;
    if (charIndex > word.length) { deleting = true; setTimeout(type, 1500); return; }
    setTimeout(type, 70);
  } else {
    charIndex--;
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(type, 300); return; }
    setTimeout(type, 40);
  }
}
type();

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Skill bars animate when visible =====
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.bar span').forEach(el => barObserver.observe(el));

// ===== Counter animation =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      const step = target / 60;
      const tick = () => {
        const val = Math.ceil(+el.textContent + step);
        el.textContent = val >= target ? target : val;
        if (val < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== Cursor glow (desktop only) =====
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
} else {
  glow.style.display = 'none';
}

// ===== Contact form =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thanks! Your message has been sent. I\'ll reply within 24 hours.';
  this.reset();
});
