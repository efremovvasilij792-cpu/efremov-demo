/* ===== Мастерская В.Ю. Ефремова — общий скрипт ===== */
(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const rub = n => n.toLocaleString('ru-RU') + ' ₽';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l6 8h-3l4 6H5l4-6H6l6-8zM12 17v4"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5"/><path d="M14.5 6.5L17 4l3 3-2.5 2.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    bag: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22h40l-3 32a4 4 0 0 1-4 3.6H19a4 4 0 0 1-4-3.6L12 22z"/><path d="M23 22v-5a9 9 0 0 1 18 0v5"/></svg>'
  };
  window.ICON = ICON;

  /* ---------- Шапка, меню, футер ---------- */
  const NAV = [
    ['index.html', 'Главная', 'home'],
    ['catalog.html', 'Каталог', 'catalog'],
    ['portfolio.html', 'Портфолио', 'portfolio'],
    ['contacts.html', 'Контакты', 'contacts']
  ];
  const brand = `<a class="brand" href="index.html" aria-label="На главную">
      <img src="assets/img/site/logo.webp" alt="Мастерская В.Ю. Ефремова" width="44" height="44">
      <span>Мастерская Ефремова<small>деревянная архитектура с 2023 г.</small></span></a>`;

  document.body.insertAdjacentHTML('afterbegin', `
    <header class="header" id="header">
      ${brand}
      <nav class="nav" aria-label="Основное меню">
        ${NAV.map(([h, t, k]) => `<a href="${h}" class="${k === 'catalog' ? 'nav-cta ' : ''}${k === page || (page === 'product' && k === 'catalog') ? 'active' : ''}">${k === 'catalog' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>' : ''}${t}</a>`).join('')}
      </nav>
      <div class="header-actions">
        <a class="cart-btn" href="cart.html" aria-label="Корзина">${ICON.cart}<span class="lbl">Корзина</span><span class="cart-count" id="cartCount">0</span></a>
        <a class="icon-btn phone" href="${S.phoneHref}" aria-label="Позвонить">${ICON.phone}</a>
        <button class="icon-btn burger" id="burger" aria-label="Меню"><span class="bars"><i></i><i></i></span></button>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      <button class="icon-btn mm-close" id="mmClose" aria-label="Закрыть меню">${ICON.close}</button>
      ${NAV.map(([h, t, k]) => `<a href="${h}"${k === 'catalog' ? ' class="mm-cta"' : ''}>${t}</a>`).join('')}
      <a href="cart.html">Корзина</a>
      <div class="mm-foot"><a href="${S.phoneHref}">${S.phone}</a><a href="mailto:${S.email}">${S.email}</a><span>${S.hours}</span></div>
    </div>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            ${brand}
            <p style="margin:22px 0 0;max-width:340px;color:rgba(233,239,230,.75)">Авторская деревянная архитектура для дома и сада: арки, перголы, беседки, садовая мебель. От эскиза — до воплощения в массиве.</p>
            <div class="socials">
              <a href="${S.links.telegram}" target="_blank" rel="noopener">Telegram</a>
              <a href="${S.links.vk}" target="_blank" rel="noopener">ВКонтакте</a>
              <a href="${S.links.avito}" target="_blank" rel="noopener">Авито</a>
            </div>
          </div>
          <div><h4>Разделы</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="cart.html">Корзина</a></li></ul></div>
          <div><h4>Покупателям</h4><ul>
            <li><a href="oferta.html">Публичная оферта</a></li>
            <li><a href="politika.html">Политика конфиденциальности</a></li>
            <li><a href="#" data-open-form>Обратная связь</a></li>
          </ul></div>
          <div><h4>Контакты</h4><ul>
            <li><a class="big" href="${S.phoneHref}">${S.phone}</a></li>
            <li><a href="mailto:${S.email}">${S.email}</a></li>
            <li>${S.hours}</li>
            <li>${S.address}</li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>${S.name} · 2023–2026 © ИНН ${S.inn}</span>
          <span>Все права защищены</span>
        </div>
      </div>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  const header = $('#header');
  // Шапка прячется при прокрутке вниз и плавно возвращается при прокрутке вверх.
  // «Запас хода» не даёт ей дёргаться от мелких движений пальца на телефоне.
  let lastY = scrollY, travel = 0, headerTick = false;
  const onHeader = () => {
    headerTick = false;
    // iPhone «пружинит» за краями страницы — такие сдвиги не считаем прокруткой
    const maxY = document.documentElement.scrollHeight - innerHeight;
    const y = Math.min(Math.max(0, scrollY), Math.max(0, maxY));
    const d = y - lastY;
    lastY = y;
    header.classList.toggle('is-solid', y > 40 || page !== 'home');
    if (y < 200) { travel = 0; header.classList.remove('is-hidden'); return; }
    // копим путь в одном направлении, при смене направления начинаем заново
    travel = (Math.sign(d) === Math.sign(travel)) ? travel + d : d;
    if (travel > 60) header.classList.add('is-hidden');
    else if (travel < -40) header.classList.remove('is-hidden');
  };
  addEventListener('scroll', () => { if (!headerTick) { headerTick = true; requestAnimationFrame(onHeader); } }, { passive: true });
  onHeader();
  $('#burger').onclick = () => $('#mobileMenu').classList.add('open');
  $('#mmClose').onclick = () => $('#mobileMenu').classList.remove('open');

  /* ---------- Корзина (localStorage) ---------- */
  const KEY = 'efremov_cart_v1';
  const Cart = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } },
    set(items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} Cart.badge(); },
    add(id, option, qty = 1) {
      const p = PRODUCTS.find(x => x.id === id);
      if (p.outOfStock) return; // товара нет в наличии — в корзину не кладём
      const price = option ? p.options.values.find(v => v.name === option).price : p.price;
      const items = Cart.get();
      const key = id + '|' + (option || '');
      const ex = items.find(i => i.key === key);
      if (ex) ex.qty += qty; else items.push({ key, id, option: option || null, price, qty });
      Cart.set(items);
      toast(p, option);
      const c = $('#cartCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    },
    count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
    total() { return Cart.get().reduce((s, i) => s + i.qty * i.price, 0); },
    badge() { const c = $('#cartCount'); const n = Cart.count(); c.textContent = n; c.classList.toggle('has', n > 0); }
  };
  window.Cart = Cart;
  Cart.badge();

  let toastTimer;
  function toast(p, option) {
    const t = $('#toast');
    t.innerHTML = `<img src="${p.images[0]}" alt=""><div><b>Добавлено в корзину</b><span>${esc(p.name)}${option ? ' · ' + esc(option) : ''}</span></div><a class="btn btn-light btn-sm" href="cart.html">В корзину</a>`;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
  }

  /* ---------- Модальные окна ---------- */
  function modal(html, cls = '') {
    const m = document.createElement('div');
    m.className = 'modal ' + cls;
    m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Закрыть">${ICON.close}</button>${html}</div>`;
    document.body.appendChild(m);
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => m.classList.add('open'));
    const close = () => {
      m.classList.remove('open');
      document.documentElement.style.overflow = '';
      setTimeout(() => m.remove(), 400);
      removeEventListener('keydown', onKey);
    };
    const onKey = e => e.key === 'Escape' && close();
    addEventListener('keydown', onKey);
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.modal-close')) close(); });
    return { el: m, close };
  }
  window.openModal = modal;

  /* ---------- Отправка заявок ---------- */
  async function sendLead(subject, data, text) {
    const payload = { subject, ...data, site: location.origin, date: new Date().toLocaleString('ru-RU') };
    try {
      const log = JSON.parse(localStorage.getItem('efremov_leads') || '[]');
      log.push(payload);
      localStorage.setItem('efremov_leads', JSON.stringify(log.slice(-20)));
    } catch {}
    if (S.orderEndpoint) {
      const r = await fetch(S.orderEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('send failed');
      return 'sent';
    }
    location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    return 'mailto';
  }
  window.sendLead = sendLead;

  const field = (name, label, type = 'text', req = false, extra = '') => `
    <div class="field">
      ${type === 'textarea'
        ? `<textarea id="f-${name}" name="${name}" placeholder=" " ${req ? 'required' : ''}></textarea>`
        : `<input id="f-${name}" name="${name}" type="${type}" placeholder=" " ${req ? 'required' : ''} ${extra}>`}
      <label for="f-${name}">${label}${req ? ' *' : ''}</label>
      <div class="msg"></div>
    </div>`;
  const checkbox = (name, html) => `
    <label class="check" data-check="${name}"><input type="checkbox" name="${name}"><span class="box">${ICON.check}</span><span>${html}</span></label>`;
  window.UI = { field, checkbox, rub, esc };

  function validate(form) {
    let ok = true;
    $$('.field', form).forEach(f => {
      const i = $('input,textarea', f);
      let msg = '';
      const v = i.value.trim();
      if (i.required && !v) msg = 'Заполните это поле';
      else if (v && i.type === 'tel' && v.replace(/\D/g, '').length < 11) msg = 'Укажите номер полностью';
      else if (v && i.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) msg = 'Проверьте адрес почты';
      f.classList.toggle('err', !!msg);
      $('.msg', f).textContent = msg;
      if (msg) ok = false;
    });
    $$('.check', form).forEach(c => {
      const i = $('input', c);
      const bad = !i.checked;
      c.classList.toggle('err', bad);
      if (bad) ok = false;
    });
    const firstErr = $('.err', form);
    if (firstErr) { const i = $('input,textarea', firstErr); i && i.focus(); }
    return ok;
  }
  window.validateForm = validate;

  // маска телефона +7 (___) ___-__-__
  document.addEventListener('input', e => {
    const i = e.target;
    if (i.type !== 'tel') return;
    let d = i.value.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    const p = d.slice(1);
    let out = '+7';
    if (p.length) out += ' (' + p.slice(0, 3);
    if (p.length >= 3) out += ') ' + p.slice(3, 6);
    if (p.length >= 6) out += '-' + p.slice(6, 8);
    if (p.length >= 8) out += '-' + p.slice(8, 10);
    i.value = out;
  });
  document.addEventListener('change', e => {
    const c = e.target.closest('.check');
    if (c && e.target.checked) c.classList.remove('err');
  });

  const successHTML = (title, text) => `
    <div class="success">
      <div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
      <h3 style="padding:0">${title}</h3>
      <p class="muted" style="margin-top:10px">${text}</p>
    </div>`;
  window.successHTML = successHTML;

  function feedbackForm(topic = '') {
    const m = modal(`
      <h3>Оставьте заявку</h3>
      <p class="muted">Ответим в течение дня, поможем с выбором размера, цвета и доставки.</p>
      <form class="form" novalidate>
        ${field('name', 'Ваше имя', 'text', true, 'autocomplete="name"')}
        ${field('phone', 'Ваш телефон', 'tel', true, 'autocomplete="tel" inputmode="tel"')}
        ${field('email', 'Ваш email', 'email', false, 'autocomplete="email"')}
        ${field('message', 'Что хотите обсудить?', 'textarea')}
        ${checkbox('agree', 'Согласен(на) на <a href="politika.html" target="_blank">обработку персональных данных</a>')}
        <button class="btn btn-dark btn-block" type="submit">Отправить заявку ${ICON.arrow}</button>
        <p class="note">Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных и <a href="politika.html" target="_blank">политикой конфиденциальности</a>.</p>
      </form>`);
    const form = $('form', m.el);
    if (topic) $('#f-message', form).value = topic;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate(form)) return;
      const d = Object.fromEntries(new FormData(form));
      const text = `Заявка с сайта\n\nИмя: ${d.name}\nТелефон: ${d.phone}\nEmail: ${d.email || '—'}\n\n${d.message || ''}`;
      const btn = $('button[type=submit]', form);
      btn.disabled = true;
      try {
        const how = await sendLead('Заявка с сайта — ' + d.name, { type: 'feedback', ...d }, text);
        $('.modal-box', m.el).innerHTML = `<button class="modal-close" aria-label="Закрыть">${ICON.close}</button>` +
          successHTML('Спасибо, заявка принята!', how === 'mailto'
            ? 'Мы открыли письмо с вашей заявкой — отправьте его, и мастер свяжется с вами. Или позвоните: ' + S.phone
            : 'Мастер свяжется с вами в ближайшее время. Приём заявок ежедневно с 8:00 до 22:00.');
      } catch {
        btn.disabled = false;
        alert('Не удалось отправить. Позвоните нам: ' + S.phone);
      }
    });
  }
  window.feedbackForm = feedbackForm;
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open-form]');
    if (!t) return;
    e.preventDefault();
    feedbackForm(t.dataset.openForm || '');
  });

  /* ---------- Выбор опции и быстрое добавление ---------- */
  const optButtons = (p, active) => p.options.values.map(v => {
    const sw = COLOR_SWATCH[v.name.toLowerCase()];
    return `<button type="button" class="opt ${sw ? '' : 'no-sw'} ${v.name === active ? 'active' : ''}" data-opt="${esc(v.name)}">${sw ? `<i class="sw" style="background:${sw}"></i>` : ''}${esc(v.name)}</button>`;
  }).join('');
  window.optButtons = optButtons;

  function quickAdd(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p.options) { Cart.add(id, null); return; }
    let sel = p.options.values[0].name;
    const priceOf = n => p.options.values.find(v => v.name === n).price;
    const m = modal(`
      <div style="display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:center;margin-bottom:22px">
        <img src="${p.images[0]}" alt="" style="width:96px;height:96px;border-radius:16px;object-fit:cover">
        <div><div class="p-series" style="font-size:12px;color:var(--green-2);font-weight:700;letter-spacing:.06em;text-transform:uppercase">Серия ${p.series}</div>
        <div style="font-weight:600;line-height:1.35;margin-top:4px">${esc(p.name)}</div></div>
      </div>
      <div class="opt-label">${p.options.label}: <b class="sel">${esc(sel)}</b></div>
      <div class="opts">${optButtons(p, sel)}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:26px;gap:12px">
        <div class="p-price-big" style="font-size:36px"><span class="pr">${rub(priceOf(sel))}</span></div>
        <button class="btn btn-dark add">В корзину ${ICON.arrow}</button>
      </div>`);
    m.el.addEventListener('click', e => {
      const b = e.target.closest('[data-opt]');
      if (b) {
        sel = b.dataset.opt;
        $$('.opt', m.el).forEach(o => o.classList.toggle('active', o === b));
        $('.sel', m.el).textContent = sel;
        $('.pr', m.el).textContent = rub(priceOf(sel));
      }
      if (e.target.closest('.add')) { Cart.add(id, sel); m.close(); }
    });
  }
  window.quickAdd = quickAdd;

  /* ---------- Карточка товара ---------- */
  // На телефоне и планшете фото в карточке листаются пальцем, на компьютере — меняются при наведении
  const touchLayout = () => matchMedia('(hover: none), (max-width: 900px)').matches;
  window.productCard = p => {
    const colors = p.options && p.options.values.map(v => COLOR_SWATCH[v.name.toLowerCase()]).filter(Boolean);
    const slides = p.images.slice(0, 5);
    const media = touchLayout() && slides.length > 1
      ? `<span class="p-slides" data-swipe>${slides.map((src, i) => `<img src="${src}" alt="${i ? '' : esc(p.name)}" loading="lazy">`).join('')}</span>`
      : `<img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy">
        ${p.images[1] ? `<img class="alt" src="${p.images[1]}" alt="" loading="lazy">` : ''}`;
    return `
    <article class="p-card reveal">
      <a class="p-media" data-dots-anchor href="product.html?id=${p.id}">
        ${p.outOfStock ? '<span class="p-badge p-badge-out">Нет в наличии</span>' : p.hit ? '<span class="p-badge">Хит продаж</span>' : ''}
        ${media}
        <span class="p-quick">${p.outOfStock
          ? `<button class="btn btn-light btn-block btn-sm" data-open-form="Сообщите о поступлении: ${esc(p.name)}">Узнать о поступлении</button>`
          : `<button class="btn btn-light btn-block btn-sm" data-quick="${p.id}">В корзину ${ICON.arrow}</button>`}</span>
      </a>
      <div class="p-info">
        <span class="p-series">Серия ${p.series}${p.note ? ' · ' + p.note : ''}</span>
        <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
        <div class="p-row">
          ${p.outOfStock ? '<span class="p-price-na">Нет в наличии</span>' : `<span class="p-price">${p.hasRange ? '<small>от</small>' : ''}${rub(p.minPrice)}</span>`}
          ${colors && colors.length ? `<span class="dots">${colors.map(c => `<i style="background:${c}"></i>`).join('')}</span>` : ''}
        </div>
      </div>
    </article>`;
  };
  document.addEventListener('click', e => {
    const q = e.target.closest('[data-quick]');
    if (!q) return;
    e.preventDefault();
    quickAdd(q.dataset.quick);
  });

  /* ---------- Лайтбокс ---------- */
  document.addEventListener('click', e => {
    const it = e.target.closest('[data-lightbox]');
    if (!it) return;
    modal(`<img src="${it.dataset.lightbox}" alt=""><p>${esc(it.dataset.caption || '')}</p>`, 'lightbox');
  });

  /* ---------- Анимации прокрутки ---------- */
  /* ---------- Листалки с кружками ---------- */
  // Любой контейнер с data-swipe листается пальцем; под ним появляются кружки,
  // текущий кадр подсвечен, нажатие на кружок перелистывает.
  window.initSwipers = (root = document) => {
    $$('[data-swipe]:not([data-swipe-ready])', root).forEach(track => {
      track.dataset.swipeReady = '1';
      const items = [...track.children];
      if (items.length < 2) return;
      const dots = document.createElement('div');
      dots.className = 'swipe-dots' + (track.dataset.swipe === 'mobile' ? ' mobile-only' : '');
      dots.innerHTML = items.map((_, i) => `<button type="button" aria-label="Кадр ${i + 1}" class="${i ? '' : 'on'}"></button>`).join('');
      (track.closest('[data-dots-anchor]') || track).after(dots);
      const step = () => items[1].offsetLeft - items[0].offsetLeft || track.clientWidth;
      let current = 0;
      const update = () => {
        const i = Math.max(0, Math.min(items.length - 1, Math.round(track.scrollLeft / step())));
        if (i === current) return;
        dots.children[current].classList.remove('on');
        dots.children[i].classList.add('on');
        current = i;
      };
      track.addEventListener('scroll', update, { passive: true });
      dots.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        e.preventDefault();
        const i = [...dots.children].indexOf(b);
        track.scrollTo({ left: i * step(), behavior: 'smooth' });
      });
    });
  };

  window.initReveal = (root = document) => {
    initSwipers(root);
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .14, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal:not(.in), .clip-reveal:not(.in), .split-line:not(.in)', root).forEach(el => io.observe(el));

    // счётчики: цифры «набегают» при появлении
    const co = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      co.unobserve(en.target);
      const el = en.target, to = +el.dataset.count, suf = el.dataset.suffix || '';
      const t0 = performance.now(), dur = 1800;
      const tick = t => {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: .6 });
    $$('[data-count]', root).forEach(el => co.observe(el));
  };

  let ticking = false;
  const parallax = () => {
    ticking = false;
    const vh = innerHeight;
    $$('[data-progress]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--p', Math.min(1, p * 1.6).toFixed(4));
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  addEventListener('resize', parallax);

  document.addEventListener('DOMContentLoaded', () => {
    parallax();
    initReveal();
  });
})();
