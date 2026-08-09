const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.querySelector('.site-header');
const spotlight = document.getElementById('spotlight');
const typedCode = document.getElementById('typedCode');
const year = document.getElementById('year');

// Theme: respect saved choice first, then the user's system preference.
const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
setTheme(initialTheme);

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

// Mobile navigation.
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('menu-open');
  });
});

// Header state and active navigation.
const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];

function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 16);

  const marker = window.scrollY + window.innerHeight * 0.34;
  let current = 'home';
  sections.forEach(section => {
    if (marker >= section.offsetTop) current = section.id;
  });

  navAnchors.forEach(anchor => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

// Intersection-based entrance animations.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });

revealItems.forEach(item => revealObserver.observe(item));

// Cursor-following ambient light on desktop.
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', event => {
    spotlight.style.left = `${event.clientX}px`;
    spotlight.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Subtle 3D tilt for the code panel.
const tiltCard = document.querySelector('.tilt-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('pointermove', event => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 7}deg) rotateX(${y * -6}deg) translateY(-3px)`;
  });

  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = 'rotateY(-4deg) rotateX(2deg)';
  });
}

// Rotating developer statement in the hero code block.
const phrases = ['useful products', 'clean backends', 'responsive UIs', 'reliable workflows'];
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = true;

function typeLoop() {
  const phrase = phrases[phraseIndex];

  if (deleting) {
    charIndex -= 1;
    if (charIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  } else {
    charIndex += 1;
    if (charIndex >= phrases[phraseIndex].length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      typedCode.textContent = `"${phrases[phraseIndex]}"`;
      return;
    }
  }

  typedCode.textContent = `"${phrases[phraseIndex].slice(0, Math.max(charIndex, 0))}"`;
  setTimeout(typeLoop, deleting ? 42 : 68);
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setTimeout(typeLoop, 1200);
}

// Current year.
year.textContent = new Date().getFullYear();
