/**
 * CerradoNews — js/ui.js
 * Interações de interface:
 * - Masthead sticky com blur ao scroll
 * - Destaque de link ativo na navbar via IntersectionObserver
 * - Bind dos botões de aba de cidade (Tempo)
 * - Newsletter feedback
 */

'use strict';

/* ── Masthead scroll ──────────────────────────────────────── */
function initMasthead() {
  const masthead = document.getElementById('masthead');
  if (!masthead) return;

  window.addEventListener('scroll', () => {
    masthead.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── Active nav on scroll ─────────────────────────────────── */
function initActiveNav() {
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').replace('#', '');
    const el = document.getElementById(targetId);
    if (el) observer.observe(el);
  });
}

/* ── City tabs (weather) ──────────────────────────────────── */
function initWeatherTabs() {
  const tabs = document.querySelectorAll('.weather-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const city = tab.dataset.city;
      if (city) selectCity(tab, city);
    });
  });
}

/* ── Newsletter form feedback ─────────────────────────────── */
function initNewsletter() {
  const form  = document.querySelector('.newsletter-form');
  const input = document.querySelector('.newsletter-input');
  const btn   = document.querySelector('.newsletter-btn');
  if (!form || !input || !btn) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.borderColor = '#FF6B6B';
      input.focus();
      return;
    }
    /* Feedback de sucesso */
    btn.textContent = '✓ Inscrito!';
    btn.style.background = '#4F7C3A';
    btn.disabled = true;
    input.value = '';
    input.style.borderColor = '';

    setTimeout(() => {
      btn.textContent = 'Assinar';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });

  /* Limpa borda vermelha ao digitar */
  input.addEventListener('input', () => {
    input.style.borderColor = '';
  });
}

/* ── Current date in masthead ─────────────────────────────── */
function initDate() {
  const el = document.getElementById('current-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day:     '2-digit',
    month:   'short',
    year:    'numeric',
  });
}
