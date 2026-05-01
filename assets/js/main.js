// === THEME ===
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon();
}
function updateThemeIcon() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const isLight = document.body.classList.contains('light');
  btn.innerHTML = icon(isLight ? 'moon' : 'sun');
}
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');

// === NAV SCROLL ===
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// === MOBILE MENU ===
function toggleMobileMenu() {
  document.getElementById('mobile-menu')?.classList.toggle('open');
}

// === SCROLL REVEAL ===
document.addEventListener('DOMContentLoaded', () => {
  updateThemeIcon();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

// === RENDER CAR CARD (shared) ===
function renderCarCard(c) {
  return `
    <a href="detail.html?id=${c.id}" class="car-card">
      <div class="img-wrap">
        <img src="${c.img}" alt="${c.model}" loading="lazy">
        <div class="img-grad"></div>
        <div class="badges">
          ${c.discount ? `<span class="badge-disc">−${disc(c)}%</span>` : ''}
          ${c.video?.length ? `<span class="badge-video">${icon('play')} Video</span>` : ''}
        </div>
        <div class="color-dot">
          <span class="dot" style="background:${c.color}"></span>
          <span class="name">${c.colorName}</span>
        </div>
      </div>
      <div class="card-body">
        <h3>${c.brand} ${c.model}</h3>
        <p class="meta">${c.year} · ${c.body}</p>
        <div class="specs">
          <span>${icon('zap')} ${c.hp} HP</span>
          <span>${icon('engine')} ${c.engine > 0 ? c.engine + 'L' : 'EV'}</span>
          <span>${icon('fuel')} ${c.fuel}</span>
        </div>
        <div class="price-row">
          <div>
            ${c.discount ? `<p class="old-price">${fmt(c.price)}</p>` : ''}
            <p class="final-price ${c.discount ? 'discounted' : ''}">${fmt(finalPrice(c))}</p>
          </div>
          <span class="detail-link">Batafsil ${icon('arrowRight')}</span>
        </div>
      </div>
    </a>`;
}
