/* ============================================
   MFIS Portfolio — Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Typing animation ===== */
  const roles = [
    'CS PhD Researcher',
    'Privacy-Preserving AI',
    'Generative AI Forensics',
    'Federated Learning',
    'Trustworthy ML',
  ];
  const typedEl = document.getElementById('typed');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (isDeleting) {
      typedEl.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        charIdx = 0;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 35);
    } else {
      typedEl.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 80);
    }
  }
  type();

  /* ===== Navigation ===== */
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle?.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ===== Cursor glow ===== */
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    function animate() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ===== Reveal on scroll ===== */
  const revealEls = document.querySelectorAll(
    '.section, .timeline-item, .pub-item, .research-card, .ed-card, .info-card'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ===== Footer year ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
