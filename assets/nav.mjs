const root = document.documentElement;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (header && toggle && nav) {
  root.classList.add('nav-ready');
  const close = () => { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded','false'); };
  const open = () => { header.classList.add('nav-open'); toggle.setAttribute('aria-expanded','true'); };
  toggle.addEventListener('click', () => header.classList.contains('nav-open') ? close() : open());
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); toggle.focus(); } });
  document.addEventListener('click', event => { if (header.classList.contains('nav-open') && !header.contains(event.target)) close(); });
}
