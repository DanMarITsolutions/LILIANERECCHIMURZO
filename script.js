/* ============================================================
   LILIANE RECCHIMURZO · PORTFOLIO — script.js
   ============================================================ */

'use strict';

/* ── Navbar scroll effect ── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Active nav link ── */
const navLinks = document.querySelectorAll('.nav-links a');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath) link.classList.add('active');
});

/* ── Mobile nav toggle ── */
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-links');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navList.classList.toggle('open');
  });
  // close on link click
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navList.classList.remove('open');
    });
  });
}

/* ── Scroll reveal ── */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ── Hide scroll indicator after scroll ── */
const scrollInd = document.querySelector('.scroll-indicator');
if (scrollInd) {
  window.addEventListener('scroll', () => {
    scrollInd.style.opacity = window.scrollY > 120 ? '0' : '1';
    scrollInd.style.pointerEvents = window.scrollY > 120 ? 'none' : 'auto';
  }, { passive: true });
}

/* ── Contact form (mock submit) ── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviado ✓';
    btn.disabled = true;
    btn.style.background = 'var(--red)';
    btn.style.color = 'var(--cream)';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3500);
  });
}

/* ── Project card hover tilt (subtle) ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
