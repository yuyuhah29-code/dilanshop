/* =========================================================
   Dilan Shop — app.js
   Handles: language switching, icon rendering, product grids,
   cart drawer (localStorage), wishlist, WhatsApp checkout.
========================================================= */

const WHATSAPP_NUMBER = "9647504100202"; // +964 750 410 0202
const CURRENCY = "IQD";

/* ---------------- Icon set (hand-drawn, brand-neutral) ---------------- */
const ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7.5-4.9-10-9.2C.4 8.2 2 4.5 5.6 4c2-.3 3.9.7 6.4 3.3C14.5 4.7 16.4 3.7 18.4 4c3.6.5 5.2 4.2 3.6 7.8C19.5 16.1 12 21 12 21z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h11v8H2z"/><path d="M13 11h4l4 3v2h-8z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 7.7-8 9-4.5-1.3-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0115-6.7M21 12a9 9 0 01-15 6.7"/><path d="M17 3v5h-5M7 21v-5h5"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="2.5" y="13" width="4" height="6" rx="1.5"/><rect x="17.5" y="13" width="4" height="6" rx="1.5"/><path d="M20 19v1a3 3 0 01-3 3h-3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 12.3L12 20.9 3 12V3h9l8.6 9.3z"/><circle cx="7.5" cy="7.5" r="1.3"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9.5h19"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 14s1.3 2 3.5 2 3.5-2 3.5-2"/><path d="M9 9h.01M15 9h.01"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.5.1-.2 0-.4 0-.5C10.4 9.3 10 8.1 9.7 7.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.7.5 0 1.6-.6 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4z"/><path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1120.2 12 8.2 8.2 0 0112 20.2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4l2 5-2.5 1.5a12 12 0 006 6L15 14l5 2v4a1 1 0 01-1 1C9.6 21 3 14.4 3 5a1 1 0 011-1z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 8h2V5h-2a4 4 0 00-4 4v2H9v3h2v7h3v-7h2.2l.8-3H14V9c0-.6.4-1 1-1z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 3c.3 1.8 1.5 3 3.5 3.2V9c-1.3 0-2.5-.4-3.5-1.1V15a5 5 0 11-4.2-4.9v2.7A2.3 2.3 0 1012 15V3h2z"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3c2.5 0 4 2 4 4.5 0 1 0 2 .3 2.6.4.1 1 0 1.4-.2.3-.1.8 0 .8.5 0 .6-.8.9-1.4 1.1-.2 0-.3.2-.2.4.3.7 1.2 1.6 2.4 1.9.2 0 .3.3.1.5-.4.5-1.3.7-2 .8-.1.3-.2.7-.3 1-2 .3-2.1 1.4-4.1 1.4s-2.1-1.1-4.1-1.4c-.1-.3-.2-.7-.3-1-.7-.1-1.6-.3-2-.8-.2-.2-.1-.5.1-.5 1.2-.3 2.1-1.2 2.4-1.9.1-.2 0-.4-.2-.4-.6-.2-1.4-.5-1.4-1.1 0-.5.5-.6.8-.5.4.2 1 .3 1.4.2.3-.6.3-1.6.3-2.6C8 5 9.5 3 12 3z"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9C9 9 8 6.5 9.5 5S12 6 12 9zM12 9c3 0 4-2.5 2.5-4S12 6 12 9z"/></svg>',
  // product-art icons
  bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M9 7h6l1.5 3v9a2 2 0 01-2 2h-5a2 2 0 01-2-2v-9L9 7z"/></svg>',
  lipstick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 3h6l1 6-4 3-4-3 1-6z"/><rect x="8" y="12" width="8" height="9" rx="2"/></svg>',
  lipgloss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="9" y="2" width="6" height="7" rx="2"/><path d="M9 9h6l1 11a2 2 0 01-2 2H10a2 2 0 01-2-2L9 9z"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="7.5" cy="9" r="1.4"/><circle cx="12" cy="9" r="1.4"/><circle cx="16.5" cy="9" r="1.4"/><circle cx="7.5" cy="13.5" r="1.4"/><circle cx="12" cy="13.5" r="1.4"/><circle cx="16.5" cy="13.5" r="1.4"/></svg>',
  mascara: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="9" y="2" width="6" height="5" rx="1"/><path d="M10.5 7v3M13.5 7v3"/><path d="M8 10h8l-1 11H9L8 10z"/></svg>',
  dropper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2v6"/><rect x="9" y="8" width="6" height="4" rx="1"/><path d="M9.5 12l-2 7a2.5 2.5 0 004.9.7L12 15l-.4 4.7a2.5 2.5 0 004.9-.7l-2-7z"/></svg>',
  perfume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="7" y="9" width="10" height="12" rx="2"/><rect x="10" y="4" width="4" height="5" rx="1"/><path d="M12 4V2"/></svg>',
  jar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="6" y="9" width="12" height="11" rx="2"/><rect x="7" y="5" width="10" height="4" rx="1"/></svg>',
  brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M15 3l6 6-8 8-6-6 8-8z"/><path d="M9 15l-6 6"/></svg>'
};
function ic(name, cls){ return `<span class="ic ${cls||''}">${ICONS[name]||''}</span>`; }

/* ---------------- Category → icon map ---------------- */
const CATEGORY_ICON = { makeup:'lipstick', skincare:'dropper', haircare:'jar', perfume:'perfume', accessories:'brush', brands:'tag', campaigns:'gift' };

/* ---------------- State helpers ---------------- */
function getLang(){ return localStorage.getItem('dilan_lang') || 'tr'; }
function setLang(l){ localStorage.setItem('dilan_lang', l); }
function getCart(){ try{ return JSON.parse(localStorage.getItem('dilan_cart')) || {}; }catch(e){ return {}; } }
function setCart(c){ localStorage.setItem('dilan_cart', JSON.stringify(c)); }
function getWishlist(){ try{ return JSON.parse(localStorage.getItem('dilan_wishlist')) || []; }catch(e){ return []; } }
function setWishlist(w){ localStorage.setItem('dilan_wishlist', JSON.stringify(w)); }

function fmtPrice(n){ return n.toLocaleString('en-US'); }

function t(path){
  const lang = getLang();
  const dict = I18N[lang] || I18N.tr;
  return path.split('.').reduce((o,k)=> (o && o[k] !== undefined) ? o[k] : null, dict);
}

/* ---------------- Apply language to static [data-i18n] nodes ---------------- */
function applyStaticI18n(){
  const lang = getLang();
  const dict = I18N[lang];
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dict.dir);

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const val = t(el.getAttribute('data-i18n'));
    if (val !== null) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const val = t(el.getAttribute('data-i18n-placeholder'));
    if (val !== null) el.setAttribute('placeholder', val);
  });
  document.querySelectorAll('.lang-menu button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  const currentLabel = document.getElementById('currentLangLabel');
  if (currentLabel){
    const names = { tr:'Türkçe', ar:'العربية', ku:'کوردی', en:'English' };
    currentLabel.textContent = names[lang];
  }
}

/* ---------------- Render: categories row ---------------- */
function renderCategories(){
  const el = document.querySelector('[data-render="categories"]');
  if (!el) return;
  const cats = ['makeup','skincare','haircare','perfume','accessories','brands','campaigns'];
  el.innerHTML = cats.map(c => `
    <a class="category-card" href="products.html?category=${c==='campaigns'?'all':c}">
      <span class="category-circle">${ic(CATEGORY_ICON[c])}</span>
      <span>${t('categories.'+c)}</span>
    </a>`).join('');
}

/* ---------------- Render: product card ---------------- */
function productCard(p){
  const wl = getWishlist();
  const isFav = wl.includes(p.id);
  const media = p.photo
    ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">`
    : `<span style="color:${p.accent}">${ICONS[p.icon] || ICONS.bottle}</span>`;
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-thumb" style="background:${hexToBlush(p.accent)}">
      <button class="product-fav ${isFav?'active':''}" data-action="fav" data-id="${p.id}" aria-label="wishlist">${ic('heart')}</button>
      ${media}
    </div>
    <div class="product-body">
      <span class="product-brand">${p.brand}</span>
      <span class="product-name">${p.name}</span>
      <span class="product-price">${fmtPrice(p.price)} ${t('price')}</span>
      <button class="product-add" data-action="add" data-id="${p.id}">${ic('bag')}<span>${t('addToCart')}</span></button>
    </div>
  </div>`;
}
function hexToBlush(hex){
  // light tinted background derived from accent color
  return `linear-gradient(160deg, ${hex}1a, ${hex}05)`;
}

/* ---------------- Render: homepage bestsellers ---------------- */
function renderBestsellers(){
  const el = document.querySelector('[data-render="bestsellers"]');
  if (!el) return;
  const items = PRODUCTS.filter(p=>p.bestseller).slice(0,6);
  el.innerHTML = items.map(productCard).join('');
}

/* ---------------- Products page ---------------- */
function initProductsPage(){
  const grid = document.querySelector('[data-render="products-page"]');
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  let activeCat = params.get('category') || 'all';
  let sort = 'default';

  const filterList = document.querySelector('[data-render="filter-list"]');
  const cats = ['all','makeup','skincare','haircare','perfume','accessories'];

  function renderFilters(){
    filterList.innerHTML = cats.map(c=>{
      const label = c==='all' ? t('productsPage.filterAll') : t('categories.'+c);
      const count = c==='all' ? PRODUCTS.length : PRODUCTS.filter(p=>p.category===c).length;
      return `<button class="${activeCat===c?'active':''}" data-cat="${c}"><span>${label}</span><span>${count}</span></button>`;
    }).join('');
    filterList.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        activeCat = btn.dataset.cat;
        history.replaceState(null,'', activeCat==='all' ? 'products.html' : `products.html?category=${activeCat}`);
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid(){
    let items = activeCat==='all' ? [...PRODUCTS] : PRODUCTS.filter(p=>p.category===activeCat);
    if (sort==='low') items.sort((a,b)=>a.price-b.price);
    if (sort==='high') items.sort((a,b)=>b.price-a.price);
    grid.innerHTML = items.map(productCard).join('');
    const countEl = document.querySelector('[data-render="results-count"]');
    if (countEl) countEl.textContent = `${items.length} ${t('productsPage.results')}`;
    const titleText = activeCat==='all' ? t('productsPage.title') : t('categories.'+activeCat);
    const titleEl = document.querySelector('[data-render="page-title"]');
    if (titleEl) titleEl.textContent = titleText;
    const crumbEl = document.querySelector('[data-render="page-title-crumb"]');
    if (crumbEl) crumbEl.textContent = titleText;
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect){
    sortSelect.innerHTML = `
      <option value="default">${t('productsPage.sortDefault')}</option>
      <option value="low">${t('productsPage.sortLow')}</option>
      <option value="high">${t('productsPage.sortHigh')}</option>`;
    sortSelect.addEventListener('change', ()=>{ sort = sortSelect.value; renderGrid(); });
  }

  renderFilters();
  renderGrid();

  window._refreshProductsPage = ()=>{ renderFilters(); renderGrid(); if(sortSelect){ sortSelect.innerHTML = `
      <option value="default">${t('productsPage.sortDefault')}</option>
      <option value="low">${t('productsPage.sortLow')}</option>
      <option value="high">${t('productsPage.sortHigh')}</option>`; } };
}

/* ---------------- Cart drawer ---------------- */
function cartCount(){
  const c = getCart();
  return Object.values(c).reduce((a,b)=>a+b,0);
}
function updateCartBadge(){
  document.querySelectorAll('[data-render="cart-badge"]').forEach(b=> b.textContent = cartCount());
  document.querySelectorAll('[data-render="wishlist-badge"]').forEach(b=> b.textContent = getWishlist().length);
}
function renderCartDrawer(){
  const list = document.getElementById('cartItems');
  if (!list) return;
  const cart = getCart();
  const ids = Object.keys(cart);
  if (ids.length===0){
    list.innerHTML = `<p class="cart-empty">${t('cartDrawer.empty')}</p>`;
  } else {
    list.innerHTML = ids.map(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      if (!p) return '';
      const qty = cart[id];
      return `
      <div class="cart-row" data-id="${id}">
        <div class="thumb" style="color:${p.accent}">${ICONS[p.icon]}</div>
        <div class="info">
          <div class="nm">${p.name}</div>
          <div class="pr">${fmtPrice(p.price)} ${t('price')}</div>
          <div class="qty-ctrl">
            <button data-action="dec" data-id="${id}">${ic('minus')}</button>
            <span>${qty}</span>
            <button data-action="inc" data-id="${id}">${ic('plus')}</button>
          </div>
        </div>
        <button class="cart-remove" data-action="remove" data-id="${id}">${t('cartDrawer.remove')}</button>
      </div>`;
    }).join('');
  }
  const total = ids.reduce((sum,id)=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return sum + (p ? p.price * cart[id] : 0);
  },0);
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = `${fmtPrice(total)} ${t('price')}`;
  updateCartBadge();
}

function addToCart(id){
  const cart = getCart();
  cart[id] = (cart[id]||0) + 1;
  setCart(cart);
  renderCartDrawer();
  showToast(t('addToCart'));
}
function changeQty(id, delta){
  const cart = getCart();
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  setCart(cart);
  renderCartDrawer();
}
function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  setCart(cart);
  renderCartDrawer();
}
function toggleWishlist(id){
  let wl = getWishlist();
  if (wl.includes(id)) wl = wl.filter(x=>x!==id);
  else wl.push(id);
  setWishlist(wl);
  updateCartBadge();
  document.querySelectorAll(`.product-fav[data-id="${id}"]`).forEach(btn=> btn.classList.toggle('active', wl.includes(id)));
}

function openCart(){ document.getElementById('cartDrawer').classList.add('open'); document.getElementById('overlay').classList.add('open'); }
function closeCart(){ document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('overlay').classList.remove('open'); }

function whatsappCheckout(){
  const cart = getCart();
  const ids = Object.keys(cart);
  if (ids.length===0) return;
  let lines = ids.map(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return `• ${p.name} x${cart[id]} — ${fmtPrice(p.price*cart[id])} ${CURRENCY}`;
  });
  const total = ids.reduce((sum,id)=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return sum + (p ? p.price*cart[id] : 0);
  },0);
  const msg = `Merhaba Dilan Shop! Sipariş vermek istiyorum:\n\n${lines.join('\n')}\n\nToplam: ${fmtPrice(total)} ${CURRENCY}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function whatsappQuickOrder(){
  const url = `https://wa.me/${WHATSAPP_NUMBER}`;
  window.open(url, '_blank');
}

/* ---------------- Toast ---------------- */
let toastTimer;
function showToast(text){
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.remove('show'), 1800);
}

/* ---------------- Global event delegation ---------------- */
function bindGlobalEvents(){
  document.body.addEventListener('click', (e)=>{
    const addBtn = e.target.closest('[data-action="add"]');
    if (addBtn){ addToCart(addBtn.dataset.id); return; }
    const favBtn = e.target.closest('[data-action="fav"]');
    if (favBtn){ toggleWishlist(favBtn.dataset.id); return; }
    const incBtn = e.target.closest('[data-action="inc"]');
    if (incBtn){ changeQty(incBtn.dataset.id, 1); return; }
    const decBtn = e.target.closest('[data-action="dec"]');
    if (decBtn){ changeQty(decBtn.dataset.id, -1); return; }
    const remBtn = e.target.closest('[data-action="remove"]');
    if (remBtn){ removeFromCart(remBtn.dataset.id); return; }
  });

  const cartTrigger = document.getElementById('cartTrigger');
  if (cartTrigger) cartTrigger.addEventListener('click', (e)=>{ e.preventDefault(); openCart(); });
  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeCart);
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', ()=>{ closeCart(); closeMobileNav(); });
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', whatsappCheckout);
  document.querySelectorAll('[data-action="whatsapp-quick"]').forEach(b=> b.addEventListener('click', whatsappQuickOrder));

  // lang switch
  const langBtn = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  if (langBtn && langMenu){
    langBtn.addEventListener('click', (e)=>{ e.stopPropagation(); langMenu.classList.toggle('open'); });
    document.addEventListener('click', ()=> langMenu.classList.remove('open'));
    langMenu.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', ()=>{
        setLang(b.dataset.lang);
        refreshAll();
        langMenu.classList.remove('open');
      });
    });
  }

  // mobile nav
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  if (burger && mobileNav){
    burger.addEventListener('click', ()=>{ mobileNav.classList.add('open'); overlay.classList.add('open'); });
  }
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

  // newsletter (front-end only)
  document.querySelectorAll('.newsletter-form').forEach(f=>{
    f.addEventListener('submit', (e)=>{
      e.preventDefault();
      showToast(t('newsletter.cta') + ' ✓');
      f.reset();
    });
  });
}
function closeMobileNav(){
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  if (mobileNav) mobileNav.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

/* ---------------- Static icon placeholders ---------------- */
function renderIconPlaceholders(){
  document.querySelectorAll('[data-icon]').forEach(el=>{
    const name = el.getAttribute('data-icon');
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });
}

/* ---------------- Master refresh (on load + language change) ---------------- */
function refreshAll(){
  applyStaticI18n();
  renderCategories();
  renderBestsellers();
  renderCartDrawer();
  updateCartBadge();
  if (window._refreshProductsPage) window._refreshProductsPage();
}

document.addEventListener('DOMContentLoaded', ()=>{
  bindGlobalEvents();
  renderIconPlaceholders();
  initProductsPage();
  refreshAll();
  // Swap in the live catalog from the backend once it's ready (falls back
  // to the defaults above if the API is unreachable).
  if (typeof loadProductsFromAPI === 'function'){
    loadProductsFromAPI().then(refreshAll);
  }
});