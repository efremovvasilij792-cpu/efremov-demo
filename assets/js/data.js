/* Данные сайта: контакты, настройки отправки заявок, каталог.
   Цены и описания взяты с masterskayaefremova.ru (октябрь 2026). */

window.SITE = {
  name: 'Мастерская В.Ю. Ефремова',
  phone: '8 (926) 962-80-22',
  phoneHref: 'tel:+79269628022',
  email: 'pergola2023@mail.ru',
  address: 'Московская область, Ступинский район, Михнево, ул. Донбасская, 75',
  hours: 'Приём заявок ежедневно 8:00–22:00',
  workshopHours: 'Цех работает по индивидуальному графику',
  inn: '772608101955',
  owner: 'Ефремов Василий Юрьевич',
  links: {
    telegram: 'https://t.me/pergola2023',
    vk: 'https://vk.ru/pergola2023',
    avito: 'https://www.avito.ru/brands/i121839620/all?sellerId=93ffb4352f5f144061d53e659281e48b'
  },
  /* Куда уходят заказы и заявки: order.php на хостинге пересылает их на почту и в Telegram.
     Если order.php недоступен (демо на GitHub), сайт открывает готовое письмо на email выше. */
  orderEndpoint: 'order.php'
};

const COLORS = {
  'белый': '#f4f1ea',
  'графит': '#3d4043',
  'палисандр': '#6b3f2a',
  'без покраски': '#d9b98a'
};

const IMG = 'assets/img/products/';
const imgs = (base, n) => Array.from({ length: n }, (_, i) => `${IMG}${base}-${i + 1}.webp`);

const STANDARD_TEXT = 'Standard — это разумный выбор для тех, кто доверяет опыту. Для тех, кто ценит время, предсказуемость и проверенное качество. Чёткие сроки, фиксированная стоимость, максимальная прозрачность процесса и качество, которое мы гарантируем, потому что уже многократно его подтвердили.';

const paint = (painted, raw) => ({
  label: 'Цвет',
  values: [
    { name: 'белый', price: painted },
    { name: 'графит', price: painted },
    { name: 'палисандр', price: painted },
    { name: 'без покраски', price: raw }
  ]
});

window.CATEGORIES = [
  { id: 'arki', name: 'Арки-перголы' },
  { id: 'besedki', name: 'Беседки' },
  { id: 'mebel', name: 'Садовая мебель' },
  { id: 'blago', name: 'Благоустройство' }
];

window.PRODUCTS = [
  {
    id: 'arka-provans', cat: 'arki', hit: true,
    name: 'Арка-пергола в стиле ПРОВАНС',
    series: 'Standard', size: '210 × 110 × 60 см',
    desc: 'Размер (ВхШхГ) 210х110х60. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('arka110', 5), options: paint(20500, 14500)
  },
  {
    id: 'arka-classic', cat: 'arki',
    name: 'Арка-пергола КЛАССИК',
    series: 'Standard', size: '210 × 110 × 60 см',
    desc: 'Размер (ВхШхГ) 210х110х60. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('classic', 5), options: paint(27000, 22000)
  },
  {
    id: 'arka-wide', cat: 'arki',
    name: 'Арка-пергола в стиле ПРОВАНС (широкая)',
    series: 'Standard', size: '210 × 180 × 60 см',
    desc: 'Широкая версия классической арки. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('arka180', 5), options: paint(22500, 16500)
  },
  {
    id: 'arka-massive', cat: 'arki',
    name: 'Арка-пергола в стиле ПРОВАНС (массивная)',
    series: 'Standard', size: '210 × 180 × 100 см',
    desc: 'Размер (ВхШхГ) 210х180х100. Массив сосны (АБ). Столбы сечением 100×100 мм. Комплект для самостоятельной сборки по инструкции.',
    images: imgs('massive', 3), options: paint(43000, 35000)
  },
  {
    id: 'arka-closed', cat: 'arki',
    name: 'Арка-пергола в стиле ПРОВАНС (закрытая)',
    series: 'Standard', size: '210 × 180 × 60 см',
    desc: 'Размер (ВхШхГ) 210х180х60. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('closed', 4), options: paint(37000, 30000)
  },
  {
    id: 'arka-romb', cat: 'arki',
    name: 'Арка-пергола ПРОВАНС, рисунок «ромб»',
    series: 'Standard', size: '210 × 180 × 80 см',
    desc: 'Размер (ВхШхГ) 210х180х80. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('romb', 5), options: paint(26000, 20000)
  },
  {
    id: 'set-1', cat: 'arki', hit: true,
    name: 'Набор 1 (арка + лавочка + 2 кашпо)',
    series: 'Standard', size: 'Арка 210 × 180 × 60 см',
    desc: 'Арка 210х180х60, лавочка шириной 170 см, два кашпо 50х50х50. Массив сосны (АБ). Комплект для самостоятельной сборки по инструкции.',
    images: imgs('set1', 4), options: paint(50000, 37000)
  },
  {
    id: 'pergola-provans', cat: 'arki',
    name: 'Пергола «Прованс»',
    series: 'Standard', size: '210 × 300 × 200 см',
    desc: 'Размер (ВхШхГ) 210х300х200. Массив сосны (АБ). Столбы сечением 100×100 мм. Комплект для самостоятельной сборки по инструкции.',
    images: imgs('pergola', 2), options: paint(80000, 75000)
  },
  {
    id: 'swing-provans', cat: 'arki',
    name: 'Качели в стиле ПРОВАНС',
    series: 'Standard', size: '210 × 240 × 90 см',
    desc: 'Размер (ВхШхГ) 210х240х90. Массив сосны (АБ). Столбы сечением 100×100 мм. Комплект для самостоятельной сборки по инструкции.',
    images: imgs('swing', 4), options: paint(70000, 55000)
  },
  {
    id: 'besedka-square', cat: 'besedki',
    name: 'Беседка квадратная ПРОВАНС',
    series: 'Standard', size: '3 × 3 м',
    desc: 'Размер 3×3 м. Массив сосны (АБ).',
    images: imgs('besedka4', 2), price: 220000
  },
  {
    id: 'besedka-octa', cat: 'besedki', hit: true,
    name: 'Беседка восьмигранная ПРОВАНС',
    series: 'Standard', size: 'Диаметр 3 м',
    desc: 'Диаметр 3 м. Массив сосны (АБ).',
    images: imgs('besedka8', 2),
    options: {
      label: 'Комплектация',
      values: [
        { name: 'Полный комплект без покраски', price: 140000 },
        { name: 'Полный комплект с покраской', price: 185000 }
      ]
    }
  },
  {
    id: 'bench-table', cat: 'mebel',
    name: 'Скамья со столом ПРОВАНС',
    series: 'Standard', size: '50 × 50 × 50 см', note: 'Цвет палисандр',
    desc: 'Цвет палисандр. Массив сосны АБ. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('bench-table', 2), price: 12000
  },
  {
    id: 'kentucky', cat: 'mebel',
    name: 'Стул Кентукки',
    series: 'Standard', size: 'Брус 30 × 40 мм', note: 'Цвет палисандр',
    desc: 'Массив сосны АБ, брус 30×40, выдерживает нагрузку до 120 кг.',
    images: imgs('kentucky', 3), price: 5000
  },
  {
    id: 'bench-provans', cat: 'mebel',
    name: 'Скамья Прованс',
    series: 'Standard', size: 'Сиденье 150 × 40 см', note: 'Цвет палисандр',
    desc: 'Размер сиденья 150х40, массив сосны АБ, скруглённые края доски сиденья и подлокотников, зашлифована и готова к покраске. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('bench', 3), price: 12000
  },
  {
    id: 'bench-hex', cat: 'mebel',
    name: 'Скамья шестигранная Прованс',
    series: 'Standard', size: 'Секция 105 × 50 см',
    desc: 'Размер одной секции сиденья 105х50, массив сосны АБ, скруглённые края доски сиденья и подлокотников, зашлифована и готова к покраске. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('hexbench', 2),
    options: { label: 'Покраска', values: [{ name: 'без покраски', price: 45000 }, { name: 'с покраской', price: 65000 }] }
  },
  {
    id: 'kashpo', cat: 'blago',
    name: 'Кашпо деревянное уличное КЛАССИК',
    series: 'Standard', size: '50 × 50 × 50 см',
    desc: 'Размер 50х50х50, массив сосны АБ. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('kashpo', 4), options: paint(6000, 4000)
  },
  {
    id: 'shpalera', cat: 'blago', outOfStock: true, // нет в наличии — убрать строку outOfStock, когда появится
    name: 'Шпалера-пергола ПРОВАНС',
    series: 'Standard', size: 'На заказ', // когда появится цена: вернуть note: 'Цена за 1 кв. м'
    desc: 'Изготавливается на заказ по вашим размерам.',
    images: imgs('shpalera', 3),
    options: {
      label: 'Рисунок',
      values: [
        { name: 'прямая клетка 15×15', price: 2200 },
        { name: 'ромб 15×15', price: 2500 },
        { name: 'двойной ромб 15×15', price: 2900 }
      ]
    }
  },
  {
    id: 'composter', cat: 'blago',
    name: 'Компостер',
    series: 'Standard', size: '115×70×90 / 200×90×90 см',
    desc: 'Размер 115×70×90 (однокамерный) и 200×90×90 (двухкамерный), массив сосны АБ. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('composter', 3),
    options: {
      label: 'Вариант',
      values: [
        { name: 'однокамерный без покраски', price: 13000 },
        { name: 'однокамерный с покраской', price: 20000 },
        { name: 'двухкамерный без покраски', price: 26000 },
        { name: 'двухкамерный с покраской', price: 40000 }
      ]
    }
  },
  {
    id: 'gryadka', cat: 'blago',
    name: 'Грядка',
    series: 'Standard', size: '180 × 100 × 70 см',
    desc: 'Размер 180×100×70. Массив сосны АБ. Имитация бруса, планкен. Возможно изготовление на заказ по вашим размерам.',
    images: imgs('bed', 3),
    options: { label: 'Покраска', values: [{ name: 'без покраски', price: 12500 }, { name: 'с покраской', price: 20500 }] }
  }
];

window.PRODUCTS.forEach(p => {
  p.minPrice = p.options ? Math.min(...p.options.values.map(v => v.price)) : p.price;
  p.hasRange = !!p.options && p.options.values.some(v => v.price !== p.minPrice);
});
window.COLOR_SWATCH = COLORS;
window.STANDARD_TEXT = STANDARD_TEXT;

window.PORTFOLIO = [
  { img: 'assets/img/site/pf-besedka-vertolet.webp', title: 'Классическая беседка в коттеджном посёлке «Вертолёт»', series: 'Standard' },
  { img: 'assets/img/site/pf-arka-grafit.webp', title: 'Арка в модном графитовом цвете', series: 'Standard' },
  { img: 'assets/img/site/pf-pergola-japan.webp', title: 'Пергола как завершение японского сада', series: 'Exclusive' },
  { img: 'assets/img/site/pf-besedka-tula.webp', title: 'Классическая беседка в поместье Тульской области', series: 'Standard' },
  { img: 'assets/img/site/pf-arka-white.webp', title: 'Элегантная арка в белом цвете', series: 'Standard' },
  { img: 'assets/img/site/pf-pergola-excl.webp', title: 'Пергола по эксклюзивной технологии', series: 'Exclusive' },
  { img: 'assets/img/vk/vk-6.webp', title: 'Пергола в посёлке Greenwood: графит, массивные столбы, монтаж за час', series: 'Standard' },
  { img: 'assets/img/vk/vk-7.webp', title: 'Графитовая пергола на фоне современного фасада', series: 'Standard' },
  { img: 'assets/img/site/pf-extra2.webp', title: 'Белая арка с кашпо у входа в сад', series: 'Standard' },
  { img: 'assets/img/site/pf-extra4.webp', title: 'Арка-пергола для садовой церемонии', series: 'Standard' },
  { img: 'assets/img/vk/vk-3.webp', title: 'Шпалеры в процессе изготовления', series: 'Мастерская' },
  { img: 'assets/img/vk/vk-5.webp', title: 'Цех: шпалеры перед покраской', series: 'Мастерская' }
];

window.REVIEWS = [
  { name: 'Максим', text: 'Если коротко — безупречно. Редко встречаются продавцы, делающие что-то своими руками и получающие удовольствие от самого процесса: изготовления, продажи, общения с покупателем. Здесь редкий случай. Мы рады, что познакомились с таким производителем.' },
  { name: 'Наталья', text: 'Спасибо за отличную работу! Сразу поняли, что именно я хочу, помогли определиться с размером, заказывали спец RAL, доставку, сборку и крепления, быстро изготовили перголу, привезли и установили. Рекомендую как отличную мастерскую!' },
  { name: 'Богдан', text: 'Только уважение и восторг мастеру! Вчера купили арку для сада. Уже загружая в машину, было понятно, что везём домой удачную покупку. Сегодня собрали и установили! Великолепнейшее качество древесины и работы.' },
  { name: 'Алина', text: 'Заказала беседку с покраской. Реальность превзошла все мои ожидания. Аккуратное и бережное исполнение заказа. Все сроки и договорённости выдержаны. Я просто в восторге! А ещё Василий очень замечательный и порядочный человек.' }
];
