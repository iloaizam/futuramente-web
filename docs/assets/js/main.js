// Año automático en el footer
document.getElementById('y').textContent = new Date().getFullYear();

// Menú móvil accesible
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

toggle?.addEventListener('click', () => {
  const open = menu.style.display === 'flex';
  menu.style.display = open ? 'none' : 'flex';
  toggle.setAttribute('aria-expanded', String(!open));
  if (!open) {
    menu.style.flexDirection = 'column';
    menu.style.position = 'absolute';
    menu.style.top = '64px';
    menu.style.right = '20px';
    menu.style.background = '#0e1520';
    menu.style.border = '1px solid #1d2a3a';
    menu.style.borderRadius = '12px';
    menu.style.padding = '10px';
  }
});

// Cerrar menú al navegar (en móvil)
menu?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    if (window.innerWidth <= 620) {
      menu.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  })
);
// ===== Slider básico accesible (autoplay + dots + flechas) =====
(function(){
  const slider = document.querySelector('[data-slider]') || document.getElementById('home-slider');
  if(!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');

  // crear dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Ir al banner ${i+1}`);
    b.setAttribute('role', 'tab');
    if(i === 0) b.setAttribute('aria-selected', 'true');
    b.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('button'));
  let current = 0;
  const AUTOPLAY_MS = 5000;
  let timer = start();

  function start(){
    return setInterval(next, AUTOPLAY_MS);
  }
  function stop(){
    clearInterval(timer); timer = null;
  }

  function goTo(index, user = false){
    if(index === current) return;
    slides[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
    // si el usuario interactúa, reiniciamos el autoplay suave
    if(user){ stop(); timer = start(); }
  }
  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  nextBtn?.addEventListener('click', () => next());
  prevBtn?.addEventListener('click', () => prev());

  // Pausar al pasar el mouse/foco
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', () => { if(!timer) timer = start(); });
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', () => { if(!timer) timer = start(); });

  // Pausar si se cambia de pestaña
  document.addEventListener('visibilitychange', () => {
    if(document.hidden){ stop(); } else if(!timer){ timer = start(); }
  });
})();

// ===== Drawer lateral (hamburguesa) =====
(function(){
  const openBtn = document.getElementById('drawer-open');
  const closeBtn = document.getElementById('drawer-close');
  const drawer   = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  if(!openBtn || !drawer) return;

  const open = () => {
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    drawer.querySelector('a')?.focus();
  };
  const close = () => {
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// Iniciales automáticas para instituciones sin logo
(function(){
  const cards = document.querySelectorAll('.inst-card');
  if(!cards.length) return;

  const hasBg = el => /url\(/.test(el.style.backgroundImage || "");
  const initials = name => (name||"FM").split(/\s+/).filter(Boolean).slice(0,3).map(w=>w[0].toUpperCase()).join('');
  const hueFrom = str => ([...(str||'FM')].reduce((a,c)=>a+c.charCodeAt(0),0)) % 360;

  cards.forEach(card=>{
    const cover = card.querySelector('.inst-cover');
    if(!cover) return;
    if(hasBg(cover)) return; // ya tiene logo

    const name = card.getAttribute('data-name') || card.querySelector('h3')?.textContent?.trim() || 'FuturaMente';
    const h = hueFrom(name);
    cover.style.background = `linear-gradient(135deg, hsl(${h},70%,55%), hsl(${(h+40)%360},70%,45%))`;
    cover.innerHTML = `<span class="inst-initials" aria-hidden="true">${initials(name)}</span>`;
    card.classList.add('no-cover');
  });
})();


// Lightbox simple para #galeria
(function(){
  const grid = document.querySelector('#galeria .gallery-grid');
  const lb   = document.getElementById('lightbox');
  if(!grid || !lb) return;

  const lbImg = lb.querySelector('.lb-image');
  const lbCap = lb.querySelector('.lb-caption');
  const prevB = lb.querySelector('.lb-prev');
  const nextB = lb.querySelector('.lb-next');
  const closeB= lb.querySelector('.lb-close');

  let items = Array.from(grid.querySelectorAll('.gallery-item'));
  let current = 0;

  function open(i){
    current = (i + items.length) % items.length;
    const fig = items[current];
    const img = fig.querySelector('img');
    lbImg.src = img.getAttribute('data-full') || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = fig.querySelector('figcaption')?.textContent || '';
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    lbImg.src = ''; lbCap.textContent = '';
  }
  const next = () => open(current + 1);
  const prev = () => open(current - 1);

  items.forEach((fig, i)=>{
    fig.querySelector('img').addEventListener('click', ()=>open(i));
  });
  nextB.addEventListener('click', next);
  prevB.addEventListener('click', prev);
  closeB.addEventListener('click', close);
  lb.addEventListener('click', (e)=>{ if(e.target === lb) close(); });
  document.addEventListener('keydown', (e)=>{
    if(lb.getAttribute('aria-hidden') === 'true') return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });
})();
