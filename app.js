/* ============================================================================
   KazLine — single-file app (vanilla JS, hash router)
   Two-file architecture: index.html + app.js
   The API layer below uses localStorage-backed mock data and is structured to
   be swapped for a Python REST backend later (see `api` object — replace each
   method body with a fetch() call to your endpoints).
   ============================================================================ */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ icons */
  const I = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M18 3v18"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.3 7.3L4 21l1.7-5.7A8 8 0 1 1 21 12z"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3"/>',
    quiz: '<path d="M9.1 9a3 3 0 1 1 4.5 2.6c-.9.5-1.6 1.2-1.6 2.4"/><circle cx="12" cy="17.5" r=".6" fill="currentColor"/><circle cx="12" cy="12" r="9"/>',
    flame: '<path d="M12 3c1 3-1.5 4-1.5 6.5A2.5 2.5 0 0 0 13 12c.6-1 .3-2.2 1-3 1.8 1.4 3 3.4 3 6a5 5 0 1 1-10 0c0-3.2 2-5.2 3.5-7.5C11.3 6 12 4.6 12 3z"/>',
    star: '<path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    play: '<path d="M6 4v16l14-8z"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.5 3.5 0 0 1 0 6.9M21.5 20a6 6 0 0 0-4-5.6"/>',
    gauge: '<path d="M12 13 16 9"/><circle cx="12" cy="13" r="9"/><path d="M3 13h2M19 13h2M12 4v0"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 2.6 14H2a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 4.6V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H22a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    speak: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12"/>',
    trash: '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M9.9 5.1A10 10 0 0 1 22 12a16 16 0 0 1-3 3.6M6.6 6.6A16 16 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4-.8M3 3l18 18"/>',
  };
  function icon(name, cls) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="${cls || "w-5 h-5"}">${I[name] || ""}</svg>`;
  }

  /* ----------------------------------------------------------------- helpers */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function toast(msg, kind) {
    const root = $("#toast");
    const colors = { ok: "bg-ok", bad: "bg-bad", brand: "bg-brand", gold: "bg-gold" };
    const el = document.createElement("div");
    el.className = `anim-pop pointer-events-auto rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lift ${colors[kind] || "bg-ink"}`;
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(() => { el.style.transition = "opacity .3s, transform .3s"; el.style.opacity = "0"; el.style.transform = "translateY(8px)"; }, 2200);
    setTimeout(() => el.remove(), 2600);
  }

  function confetti() {
    const wrap = document.createElement("div");
    wrap.className = "confetti";
    const cols = ["#0e7bc4", "#e8a90c", "#1ca672", "#e0506b", "#3479f6"];
    for (let i = 0; i < 90; i++) {
      const s = document.createElement("i");
      s.style.left = Math.random() * 100 + "%";
      s.style.background = cols[i % cols.length];
      s.style.animationDelay = Math.random() * 0.5 + "s";
      s.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
      s.style.transform = `rotate(${Math.random() * 360}deg)`;
      wrap.appendChild(s);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 3200);
  }

  /* ============================================================== MOCK DATA */
  const SEED = {
    levels: [
      { id: "A0", name: "Алғашқы қадам", sub: "Знакомство с языком" },
      { id: "A1", name: "Бастауыш", sub: "Базовый уровень" },
      { id: "A2", name: "Орташа", sub: "Элементарный" },
      { id: "B1", name: "Орта деңгей", sub: "Пороговый уровень" },
      { id: "B2", name: "Жоғары орта", sub: "Рубежный уровень" },
      { id: "C1", name: "Жоғары деңгей", sub: "Продвинутый уровень" },
      { id: "C2", name: "Кәсіби деңгей", sub: "Профессиональный уровень" },
    ],
    lessons: [
      { id: "l1", level: "A0", title: "Әліппе және дыбыстар", sub: "Алфавит и звуки", icon: "book", xp: 30 },
      { id: "l2", level: "A0", title: "Сәлемдесу", sub: "Приветствия", icon: "chat", xp: 30 },
      { id: "l3", level: "A0", title: "Сандар 1–10", sub: "Числа", icon: "bolt", xp: 35 },
      { id: "l4", level: "A1", title: "Отбасы", sub: "Семья", icon: "users", xp: 40 },
      { id: "l5", level: "A1", title: "Түстер", sub: "Цвета", icon: "sparkle", xp: 40 },
      { id: "l6", level: "A1", title: "Тағам", sub: "Еда и напитки", icon: "star", xp: 45 },
      { id: "l7", level: "A2", title: "Уақыт", sub: "Время и дни недели", icon: "gauge", xp: 50 },
      { id: "l8", level: "A2", title: "Қалада", sub: "В городе", icon: "home", xp: 55 },
      { id: "l9", level: "A1", title: "Тәуелдік жалғауы", sub: "Грамматика: принадлежность", icon: "book", xp: 50 },
      { id: "l10", level: "A2", title: "Жедел өткен шақ", sub: "Грамматика: прошедшее время", icon: "bolt", xp: 50 },
      { id: "l11", level: "B1", title: "Шартты рай", sub: "Грамматика: условное наклонение", icon: "sparkle", xp: 55 },
      { id: "l12", level: "B2", title: "Бейнелеуіш сөздер", sub: "Грамматика: изобразительные слова", icon: "star", xp: 55 },
      { id: "l13", level: "C1", title: "Тұрақты тіркестер", sub: "Грамматика: фразеологизмы", icon: "trophy", xp: 60 },
      { id: "l14", level: "C2", title: "Ресми стиль", sub: "Грамматика: офиц.-деловой стиль", icon: "gauge", xp: 60 },
    ],
    exercises: {
      l1: [
        { type: "flash", kk: "Сәлем", ru: "Привет", hint: "Неформальное приветствие" },
        { type: "choice", q: "Как переводится «Сәлем»?", opts: ["Пока", "Привет", "Спасибо"], answer: 1 },
        { type: "build", ru: "Доброе утро", answer: ["Қайырлы", "таң"], pool: ["Қайырлы", "таң", "кеш", "түн"] },
        { type: "write", ru: "Спасибо", answer: "Рахмет" },
        { type: "match", pairs: [["Сәлем", "Привет"], ["Рахмет", "Спасибо"], ["Иә", "Да"], ["Жоқ", "Нет"]] },
      ],
      l2: [
        { type: "flash", kk: "Қайырлы таң", ru: "Доброе утро", hint: "Утреннее приветствие" },
        { type: "choice", q: "«Сау бол» означает…", opts: ["Здравствуй", "До свидания", "Извини"], answer: 1 },
        { type: "write", ru: "Как дела?", answer: "Қалың қалай?" },
        { type: "match", pairs: [["Қайырлы кеш", "Добрый вечер"], ["Сау бол", "Пока"], ["Кешіріңіз", "Извините"]] },
      ],
      l3: [
        { type: "flash", kk: "Бір, екі, үш", ru: "Один, два, три", hint: "Считаем по порядку" },
        { type: "choice", q: "Сколько будет «бес»?", opts: ["3", "5", "7"], answer: 1 },
        { type: "build", ru: "Десять книг", answer: ["он", "кітап"], pool: ["он", "кітап", "бес", "алма"] },
        { type: "match", pairs: [["Бір", "1"], ["Үш", "3"], ["Жеті", "7"], ["Он", "10"]] },
      ],
      l4: [
        { type: "flash", kk: "Отбасы", ru: "Семья", hint: "Самое важное слово" },
        { type: "choice", q: "«Ана» — это…", opts: ["Отец", "Мама", "Брат"], answer: 1 },
        { type: "write", ru: "Папа", answer: "Әке" },
        { type: "match", pairs: [["Ана", "Мама"], ["Әке", "Папа"], ["Аға", "Старший брат"], ["Апа", "Старшая сестра"]] },
      ],
      l5: [
        { type: "flash", kk: "Қызыл", ru: "Красный", hint: "Цвет флага" },
        { type: "choice", q: "«Көк» — это…", opts: ["Зелёный", "Синий", "Жёлтый"], answer: 1 },
        { type: "match", pairs: [["Қызыл", "Красный"], ["Көк", "Синий"], ["Сары", "Жёлтый"], ["Ақ", "Белый"]] },
      ],
      l6: [
        { type: "flash", kk: "Нан", ru: "Хлеб", hint: "На столе каждый день" },
        { type: "choice", q: "«Су» означает…", opts: ["Чай", "Вода", "Молоко"], answer: 1 },
        { type: "write", ru: "Чай", answer: "Шай" },
        { type: "match", pairs: [["Нан", "Хлеб"], ["Су", "Вода"], ["Шай", "Чай"], ["Ет", "Мясо"]] },
      ],
      l7: [
        { type: "flash", kk: "Бүгін", ru: "Сегодня", hint: "Про время" },
        { type: "choice", q: "«Ертең» — это…", opts: ["Вчера", "Завтра", "Сейчас"], answer: 1 },
        { type: "match", pairs: [["Бүгін", "Сегодня"], ["Ертең", "Завтра"], ["Кеше", "Вчера"], ["Қазір", "Сейчас"]] },
      ],
      l8: [
        { type: "flash", kk: "Дүкен", ru: "Магазин", hint: "Туда ходят за продуктами" },
        { type: "choice", q: "«Көше» означает…", opts: ["Улица", "Дом", "Парк"], answer: 0 },
        { type: "write", ru: "Город", answer: "Қала" },
        { type: "match", pairs: [["Дүкен", "Магазин"], ["Көше", "Улица"], ["Аурухана", "Больница"], ["Мектеп", "Школа"]] },
      ],
      l9: [
        { type: "theory", title: "Тәуелдік жалғауы", kk: "Заттың кімге тиесілі екенін білдіру үшін Тәуелдік жалғауы қолданылады: Менің (-ым/-ім/-м), Сенің (-ың/-ің/-ң), Сіздің (-ыңыз/-іңіз/-ңыз/-ңіз), Оның (-ы/-і/-сы/-сі).",
          ru: "Притяжательные окончания выражают принадлежность: Менің — мой (-ым/-ім/-м), Сенің — твой (-ың/-ің/-ң), Сіздің — Ваш (-ыңыз/-іңіз/-ңыз/-ңіз), Оның — его/её (-ы/-і/-сы/-сі)." },
        { type: "choice", q: "«Бұл – менің досы...» (Это мой друг)", opts: ["-ың", "-ым", "-ы"], answer: 1 },
        { type: "choice", q: "«Оның әке... жұмыста.» (Его/её отец на работе)", opts: ["-сі", "-міз", "-ңіз"], answer: 0 },
        { type: "match", pairs: [["Менің", "үйім (мой дом)"], ["Сенің", "анаң (твоя мама)"], ["Оның", "қаласы (его/её город)"]] },
        { type: "match", pairs: [["Сенің атың кім?", "Менің атым – Джон."], ["Ол қайда тұрады?", "Ол Астанада тұрады."], ["Сен неше жастасың?", "Мен жиырма жастамын."]] },
        { type: "write", ru: "«Сенің кітабы... үстелде жатыр.» — впиши окончание", answer: "ң" },
        { type: "write", ru: "«Сіздің жұмысы... маған ұнайды.» — впиши окончание", answer: "ңыз" },
      ],
      l10: [
        { type: "theory", title: "Жедел өткен шақ", kk: "Жедел өткен шақ іс-әрекеттің анық, көзбен көріп орындалғанын білдіреді. Жасалуы: Етістік түбірі + -ды/-ді, -ты/-ті + Жіктік жалғауы.",
          ru: "Очевидное прошедшее время обозначает действие, точно произошедшее в прошлом. Формула: корень глагола + -ды/-ді/-ты/-ті + личное окончание." },
        { type: "choice", q: "Какое предложение в прошедшем времени?", opts: ["Біз ертең мұражайға барамыз.", "Олар бүгін кино көрді.", "Мен қазір хат жазып отырмын."], answer: 1 },
        { type: "choice", q: "«Кеше біз дүкеннен жемістер ...»", opts: ["сатып алдық", "сатып аламыз", "сатып алып жатырмыз"], answer: 0 },
        { type: "match", pairs: [["Кеше", "келдім (пришёл)"], ["Қазір", "жазып отырмын (пишу)"], ["Ертең", "барамын (пойду)"]] },
        { type: "match", pairs: [["Дәмді тамақ", "Дәмхана / Кафе"], ["Жылы ауа райы", "Табиғат / Природа"], ["Жүйрік автобус", "Көлік / Транспорт"]] },
        { type: "write", ru: "«Ол бүгін таңертең кофе (ішу) ... .» — впиши глагол", answer: "ішті" },
        { type: "write", ru: "«Біз кеше сабаққа (келу) ... .» — впиши глагол", answer: "келдік" },
      ],
      l11: [
        { type: "theory", title: "Шартты рай", kk: "Шартты рай іс-әрекеттің орындалу шартын білдіреді, көбіне «егер» сөзімен қолданылады. Жасалуы: Етістік түбірі + -са/-се + Жіктік жалғауы.",
          ru: "Условное наклонение выражает условие, часто со словом «если» (егер). Формула: корень глагола + -са/-се + личное окончание." },
        { type: "choice", q: "Найдите предложение в условном наклонении", opts: ["Егер жаңбыр жауса, үйде қаламыз.", "Мен ертең жұмысқа баруым керек.", "Біз бұл жобаны аяқтадық."], answer: 0 },
        { type: "choice", q: "«Сен көп оқысаң, емтиханды ...»", opts: ["тапсыра алмадың", "жақсы тапсырасың", "тапсырып жатырсың"], answer: 1 },
        { type: "match", pairs: [["Спортпен айналыссаң,", "денсаулығың жақсы болады."], ["Таксимен барсаң,", "тез жетесің."], ["Көп еңбектенсең,", "табысқа жетесің."]] },
        { type: "match", pairs: [["Дәрігер", "Адамдарды емдейді."], ["Мұғалім", "Балаларға білім береді."], ["Аспаз", "Дәмді тағам дайындайды."]] },
        { type: "write", ru: "«Егер мен (білу) ..., саған айтар едім.» — впиши глагол", answer: "білсем" },
        { type: "write", ru: "«Уақытың болса, маған ... .» — впиши «позвони»", answer: "хабарлас" },
      ],
      l12: [
        { type: "theory", title: "Бейнелеуіш сөздер", kk: "Бейнелеуіш сөздер дыбысқа еліктеуден (тарс-тұрс, сылдыр) немесе көрінетін бейнеден (жалт-жулт, жарқ) туады, көбіне «етті» етістігімен тіркеседі.",
          ru: "Изобразительные слова передают звуки (тарс-тұрс, сылдыр) или зрительные образы (жалт-жулт, жарқ), часто употребляются со вспомогательным глаголом «етті»." },
        { type: "choice", q: "Слово, описывающее блеск/мерцание?", opts: ["тарс-тұрс", "жалт-жулт", "сарт-сурт"], answer: 1 },
        { type: "choice", q: "«Найзағай ... етті.» (молния … вспыхнула)", opts: ["гүрс", "жарқ", "сырт"], answer: 1 },
        { type: "match", pairs: [["Жарқ-жұрк", "Есіктің қатты жабылуы"], ["Дүрсіл", "Жүректің соғуы"], ["Сыбдыр", "Күзгі жапырақтардың дыбысы"]] },
        { type: "match", pairs: [["Ғажайып", "Керемет, таңғажайып"], ["Тұманды", "Көмескі, бұлыңғыр"], ["Тұнық", "Мөлдір, таза"]] },
        { type: "write", ru: "Слово, передающее журчание воды", answer: "сылдыр" },
        { type: "write", ru: "Слово, передающее сильный стук сердца", answer: "дүрс" },
      ],
      l13: [
        { type: "theory", title: "Тұрақты тіркестер", kk: "Тұрақты тіркестер (фразеологизмдер) — бөлінбейтін бір мағынаны білдіретін сөз тіркестері, мысалы «тайға таңба басқандай» — өте анық дегенді білдіреді.",
          ru: "Фразеологизмы — устойчивые сочетания с единым переносным значением, напр. «тайға таңба басқандай» — предельно ясно." },
        { type: "choice", q: "«Төбем көкке жеткендей болды» дегеніміз?", opts: ["Қатты қорықтым", "Өте қатты қуандым", "Төбеге шықтым"], answer: 1 },
        { type: "choice", q: "«Тайға таңба басқандай» мағынасы?", opts: ["Өте анық, айқын", "Көмескі, белгісіз", "Қиын, күрделі"], answer: 0 },
        { type: "match", pairs: [["Мұрнын шүйіру", "Менсінбеу, тәкаппарлану"], ["Жерге қарау", "Қатты ұялу, қысылу"], ["Қол қусырып отыру", "Ештеңе істемей бейқам отыру"]] },
        { type: "match", pairs: [["Мемлекеттік кәсіпорын", "Мемлекет меншігіндегі мекеме"], ["Келісімшарт", "Тараптардың келісімі жазылған құжат"], ["Қаулы", "Билік қабылдаған ресми шешім"]] },
        { type: "write", ru: "«Залда ине ... орын болмады.» — впиши слово (яблоку негде упасть)", answer: "шанышар" },
        { type: "write", ru: "«Көз шырымын алу» — одним глаголом", answer: "ұйықтау" },
      ],
      l14: [
        { type: "theory", title: "Ресми-іс қағаздар стилі", kk: "С2 деңгейде ресми-іс қағаздар стилінің тұрақты оралымдарын (заңның күшіне енуі), тавтологиядан қашуды және көнерген сөздерді (баж, уәзір, сарбаз) білу қажет.",
          ru: "На уровне C2 важно знать устойчивые юридические обороты (вступление закона в силу), избегать тавтологии и понимать архаизмы (баж — налог, уәзір — министр, сарбаз — воин)." },
        { type: "choice", q: "Заңның күшіне енуін білдіретін тіркес?", opts: ["Заңның күшіне енуі", "Заңның қол қойылуы", "Заңның талқылануы"], answer: 0 },
        { type: "choice", q: "«Директор мырза бұл бұйрықты өз қолымен қол қойды» — қате?", opts: ["«Директор мырза» деп айтуға болмайды", "«Бұл бұйрықты» деген сөз артық", "«Өз қолымен қол қойды» – тавтология"], answer: 2 },
        { type: "match", pairs: [["Баж", "Салық"], ["Уәзір", "Министр, кеңесші"], ["Сарбаз", "Әскер, жауынгер"]] },
        { type: "match", pairs: [["Заңды", "Заңсыз"], ["Мойындау", "Жоққа шығару, теріске шығару"], ["Ақтау", "Айыптау"]] },
        { type: "write", ru: "«Шарттың мерзімі өткендіктен, ол өз күшін ... .» — впиши «утратил»", answer: "жойды" },
        { type: "write", ru: "Документ для иска в суд — впиши термин", answer: "талап арыз" },
      ],
    },
    quizzes: [
      { id: "q1", title: "Приветствия", sub: "5 вопросов", icon: "chat", xp: 50,
        questions: [
          { q: "«Сәлеметсіз бе» — это…", opts: ["Спасибо", "Здравствуйте", "Пока"], answer: 1 },
          { q: "Как сказать «До свидания»?", opts: ["Сау болыңыз", "Рахмет", "Кешіріңіз"], answer: 0 },
          { q: "«Қалыңыз қалай?» означает…", opts: ["Сколько вам лет?", "Как ваши дела?", "Где вы живёте?"], answer: 1 },
          { q: "Ответ «Жақсы» значит…", opts: ["Плохо", "Хорошо", "Так себе"], answer: 1 },
          { q: "«Кешіріңіз» — это…", opts: ["Извините", "Поздравляю", "Пожалуйста"], answer: 0 },
        ] },
      { id: "q2", title: "Числа", sub: "5 вопросов", icon: "bolt", xp: 50,
        questions: [
          { q: "«Төрт» — это…", opts: ["2", "4", "6"], answer: 1 },
          { q: "Сколько «сегіз»?", opts: ["8", "9", "10"], answer: 0 },
          { q: "«Жиырма» означает…", opts: ["12", "20", "30"], answer: 1 },
          { q: "«Бір жүз» — это…", opts: ["10", "100", "1000"], answer: 1 },
          { q: "«Алты» — это…", opts: ["6", "5", "7"], answer: 0 },
        ] },
      { id: "q3", title: "Еда", sub: "4 вопроса", icon: "star", xp: 40,
        questions: [
          { q: "«Алма» — это…", opts: ["Груша", "Яблоко", "Виноград"], answer: 1 },
          { q: "«Сүт» означает…", opts: ["Сок", "Молоко", "Вода"], answer: 1 },
          { q: "Как будет «мясо»?", opts: ["Ет", "Нан", "Бал"], answer: 0 },
          { q: "«Бал» — это…", opts: ["Сахар", "Мёд", "Соль"], answer: 1 },
        ] },
      { id: "gA1", title: "A1 · Тәуелдік жалғауы", sub: "Грамматика + квиз · 6 заданий", icon: "book", xp: 60,
        theory: { kk: "Қазақ тілінде заттың кімге тиесілі екенін білдіру үшін Тәуелдік жалғауы қолданылады: Менің (-ым/-ім/-м), Сенің (-ың/-ің/-ң), Сіздің (-ыңыз/-іңіз/-ңыз/-ңіз), Оның (-ы/-і/-сы/-сі).",
          ru: "Для выражения принадлежности предмета лицу используются притяжательные окончания: Менің — мой (-ым/-ім/-м), Сенің — твой (-ың/-ің/-ң), Сіздің — Ваш (-ыңыз/-іңіз/-ңыз/-ңіз), Оның — его/её (-ы/-і/-сы/-сі)." },
        questions: [
          { type: "mc", points: 1, q: "Сөйлемді толықтырыңыз: «Бұл – менің досы...» (Это мой друг)", opts: ["-ың", "-ым", "-ы"], answer: 1 },
          { type: "mc", points: 1, q: "Сөйлемді толықтырыңыз: «Оның әке... жұмыста.» (Его/её отец на работе)", opts: ["-сі", "-міз", "-ңіз"], answer: 0 },
          { type: "match", points: 2, q: "Сәйкестендіріңіз (по смыслу)", pairs: [["Менің (Мой/Моя)", "үйім (мой дом)"], ["Сенің (Твой/Твоя)", "анаң (твоя мама)"], ["Оның (Его/Ее)", "қаласы (его/её город)"]] },
          { type: "match", points: 2, q: "Сұрақтар мен жауаптарды сәйкестендіріңіз", pairs: [["Сенің атың кім?", "Менің атым – Джон."], ["Ол қайда тұрады?", "Ол Астанада тұрады."], ["Сен неше жастасың?", "Мен жиырма жастамын."]] },
          { type: "open", points: 3, q: "Көпнүктенің орнына тиісті жалғауды жазыңыз: «Сенің кітабы... үстелде жатыр.»", answers: ["ң", "-ң"] },
          { type: "open", points: 3, q: "Көпнүктенің орнына тиісті жалғауды жазыңыз: «Сіздің жұмысы... маған ұнайды.»", answers: ["ңыз", "-ңыз", "ңіз", "-ңіз"] },
        ] },
      { id: "gA2", title: "A2 · Жедел өткен шақ", sub: "Грамматика + квиз · 6 заданий", icon: "bolt", xp: 60,
        theory: { kk: "Жедел өткен шақ іс-әрекеттің анық, көзбен көріп орындалғанын білдіреді. Жасалуы: Етістік түбірі + -ды/-ді, -ты/-ті + Жіктік жалғауы.",
          ru: "Очевидное прошедшее время обозначает действие, точно произошедшее в прошлом. Формула: корень глагола + -ды/-ді/-ты/-ті + личное окончание." },
        questions: [
          { type: "mc", points: 1, q: "Қай сөйлем өткен шақта жазылған?", opts: ["Біз ертең мұражайға барамыз.", "Олар бүгін кино көрді.", "Мен қазір хат жазып отырмын."], answer: 1 },
          { type: "mc", points: 1, q: "«Кеше біз дүкеннен жемістер ...» (Вчера мы в магазине ... фрукты)", opts: ["сатып алдық", "сатып аламыз", "сатып алып жатырмыз"], answer: 0 },
          { type: "match", points: 2, q: "Уақыт сөздерін етістік шақтарымен сәйкестендіріңіз", pairs: [["Кеше (Вчера)", "келдім (пришёл)"], ["Қазір (Сейчас)", "жазып отырмын (пишу)"], ["Ертең (Завтра)", "барамын (пойду)"]] },
          { type: "match", points: 2, q: "Сөз тіркестерін тақырыппен сәйкестендіріңіз", pairs: [["Дәмді тамақ", "Дәмхана / Кафе"], ["Жылы ауа райы", "Табиғат / Природа"], ["Жүйрік автобус", "Көлік / Транспорт"]] },
          { type: "open", points: 3, q: "«Ол бүгін таңертең кофе (ішу) ... .»", answers: ["ішті", "ишти"] },
          { type: "open", points: 3, q: "«Біз кеше сабаққа (келу) ... .»", answers: ["келдік", "келдик"] },
        ] },
      { id: "gB1", title: "B1 · Шартты рай", sub: "Грамматика + квиз · 6 заданий", icon: "sparkle", xp: 60,
        theory: { kk: "Шартты рай іс-әрекеттің орындалу шартын білдіреді, көбіне «егер» сөзімен қолданылады. Жасалуы: Етістік түбірі + -са/-се + Жіктік жалғауы.",
          ru: "Условное наклонение выражает условие, часто со словом «если» (егер). Формула: корень глагола + -са/-се + личное окончание." },
        questions: [
          { type: "mc", points: 1, q: "Шартты райда тұрған сөйлемді табыңыз", opts: ["Егер жаңбыр жауса, үйде қаламыз.", "Мен ертең жұмысқа баруым керек.", "Біз бұл жобаны аяқтадық."], answer: 0 },
          { type: "mc", points: 1, q: "«Сен көп оқысаң, емтиханды ...»", opts: ["тапсыра алмадың", "жақсы тапсырасың", "тапсырып жатырсың"], answer: 1 },
          { type: "match", points: 2, q: "Сөйлемнің басы мен соңын сәйкестендіріңіз", pairs: [["Спортпен айналыссаң,", "денсаулығың жақсы болады."], ["Таксимен барсаң,", "тез жетесің."], ["Көп еңбектенсең,", "табысқа жетесің."]] },
          { type: "match", points: 2, q: "Мамандықтарды қызметімен сәйкестендіріңіз", pairs: [["Дәрігер", "Адамдарды емдейді."], ["Мұғалім", "Балаларға білім береді."], ["Аспаз", "Дәмді тағам дайындайды."]] },
          { type: "open", points: 3, q: "«Егер мен (білу) ..., саған айтар едім.»", answers: ["білсем", "билсем"] },
          { type: "open", points: 3, q: "«Уақытың болса, маған ... .» (позвони)", answers: ["хабарлас", "қоңырау шал", "звонда"] },
        ] },
      { id: "gB2", title: "B2 · Бейнелеуіш сөздер", sub: "Грамматика + квиз · 6 заданий", icon: "star", xp: 60,
        theory: { kk: "Бейнелеуіш сөздер дыбысқа еліктеуден (тарс-тұрс, сылдыр) немесе көрінетін бейнеден (жалт-жулт, жарқ) туады, көбіне «етті» етістігімен тіркеседі.",
          ru: "Изобразительные слова передают звуки (тарс-тұрс, сылдыр) или зрительные образы (жалт-жулт, жарқ), часто употребляются со вспомогательным глаголом «етті»." },
        questions: [
          { type: "mc", points: 1, q: "Жарқыраудың, жылтырдың сипатын білдіретін сөз?", opts: ["тарс-тұрс", "жалт-жулт", "сарт-сурт"], answer: 1 },
          { type: "mc", points: 1, q: "«Найзағай ... етті.» (молния … вспыхнула)", opts: ["гүрс", "жарқ", "сырт"], answer: 1 },
          { type: "match", points: 2, q: "Сөздерді құбылыспен сәйкестендіріңіз", pairs: [["Жарқ-жұрк", "Есіктің қатты жабылуы"], ["Дүрсіл", "Жүректің соғуы"], ["Сыбдыр", "Күзгі жапырақтардың дыбысы"]] },
          { type: "match", points: 2, q: "Синонимдерді сәйкестендіріңіз", pairs: [["Ғажайып", "Керемет, таңғажайып"], ["Тұманды", "Көмескі, бұлыңғыр"], ["Тұнық", "Мөлдір, таза"]] },
          { type: "open", points: 3, q: "Судың ағу дыбысын білдіретін сөзді жазыңыз", answers: ["сылдыр", "шылдыр"] },
          { type: "open", points: 3, q: "Жүректің қатты соққанын білдіретін сөзді жазыңыз", answers: ["дүрс", "дүрсіл"] },
        ] },
      { id: "gC1", title: "C1 · Тұрақты тіркестер", sub: "Грамматика + квиз · 6 заданий", icon: "trophy", xp: 60,
        theory: { kk: "Тұрақты тіркестер (фразеологизмдер) — бөлінбейтін бір мағынаны білдіретін сөз тіркестері, мысалы «тайға таңба басқандай» — өте анық дегенді білдіреді.",
          ru: "Фразеологизмы — устойчивые сочетания с единым переносным значением, напр. «тайға таңба басқандай» — предельно ясно." },
        questions: [
          { type: "mc", points: 1, q: "«Төбем көкке жеткендей болды» дегеніміз?", opts: ["Қатты қорықтым", "Өте қатты қуандым", "Төбеге шықтым"], answer: 1 },
          { type: "mc", points: 1, q: "«Тайға таңба басқандай» мағынасы?", opts: ["Өте анық, айқын", "Көмескі, белгісіз", "Қиын, күрделі"], answer: 0 },
          { type: "match", points: 2, q: "Фразеологизмдерді мағынасымен сәйкестендіріңіз", pairs: [["Мұрнын шүйіру", "Менсінбеу, тәкаппарлану"], ["Жерге қарау", "Қатты ұялу, қысылу"], ["Қол қусырып отыру", "Ештеңе істемей бейқам отыру"]] },
          { type: "match", points: 2, q: "Ресми терминдерді анықтамасымен сәйкестендіріңіз", pairs: [["Мемлекеттік кәсіпорын", "Мемлекет меншігіндегі мекеме"], ["Келісімшарт", "Тараптардың келісімі жазылған құжат"], ["Қаулы", "Билік қабылдаған ресми шешім"]] },
          { type: "open", points: 3, q: "«Залда ине ... орын болмады.» (яблоку негде упасть)", answers: ["шанышар", "шанышарлық"] },
          { type: "open", points: 3, q: "«Көз шырымын алу» дегенді бір сөзбен (етістікпен) жазыңыз", answers: ["ұйықтау", "мызғып алу", "уюктау"] },
        ] },
      { id: "gC2", title: "C2 · Ресми-іс қағаздар стилі", sub: "Грамматика + квиз · 6 заданий", icon: "gauge", xp: 60,
        theory: { kk: "С2 деңгейде ресми-іс қағаздар стилінің тұрақты оралымдарын (заңның күшіне енуі), тавтологиядан қашуды және көнерген сөздерді (баж, уәзір, сарбаз) білу қажет.",
          ru: "На уровне C2 важно знать устойчивые юридические обороты (вступление закона в силу), избегать тавтологии и понимать архаизмы (баж — налог, уәзір — министр, сарбаз — воин)." },
        questions: [
          { type: "mc", points: 1, q: "Заңның ресми түрде күшіне енуін білдіретін тіркес?", opts: ["Заңның күшіне енуі", "Заңның қол қойылуы", "Заңның талқылануы"], answer: 0 },
          { type: "mc", points: 1, q: "«Директор мырза бұл бұйрықты өз қолымен қол қойды» сөйлеміндегі қате?", opts: ["«Директор мырза» деп айтуға болмайды", "«Бұл бұйрықты» деген сөз артық", "«Өз қолымен қол қойды» – тавтология"], answer: 2 },
          { type: "match", points: 2, q: "Көнерген сөздерді мағынасымен сәйкестендіріңіз", pairs: [["Баж", "Салық"], ["Уәзір", "Министр, кеңесші"], ["Сарбаз", "Әскер, жауынгер"]] },
          { type: "match", points: 2, q: "Антонимдерді сәйкестендіріңіз", pairs: [["Заңды", "Заңсыз"], ["Мойындау", "Жоққа шығару, теріске шығару"], ["Ақтау", "Айыптау"]] },
          { type: "open", points: 3, q: "«Шарттың мерзімі өткендіктен, ол өз күшін ... .» (утратил)", answers: ["жойды", "жойды."] },
          { type: "open", points: 3, q: "Сотқа шағымдану үшін жазылатын құжаттың атауын жазыңыз (исковое заявление)", answers: ["талап арыз", "өтінім"] },
        ] },
    ],
    achievements: [
      { id: "first", icon: "play", title: "Алғашқы қадам", desc: "Завершите первый урок", color: "brand" },
      { id: "streak3", icon: "flame", title: "Три дня подряд", desc: "Серия 3 дня", color: "gold" },
      { id: "xp100", icon: "bolt", title: "Сотня", desc: "Наберите 100 XP", color: "brand" },
      { id: "perfect", icon: "star", title: "Без ошибок", desc: "Идеальный квиз", color: "gold" },
      { id: "chatty", icon: "chat", title: "Болтун", desc: "10 сообщений в AI-чате", color: "brand" },
      { id: "scholar", icon: "trophy", title: "Білімпаз", desc: "Завершите 5 уроков", color: "gold" },
    ],
  };

  /* ---------------------- AI tutor canned replies (mock, swap for API) ----- */
  const AI_REPLIES = [
    { kk: "Жарайсың! Дұрыс айтасың.", ru: "Молодец! Ты говоришь правильно." },
    { kk: "Өте жақсы! Енді тағы бір сөйлем құрап көрейік.", ru: "Очень хорошо! Давай составим ещё одно предложение." },
    { kk: "Қазақша «{w}» дегеніміз — тамаша таңдау!", ru: "По-казахски это звучит отлично!" },
    { kk: "Кішкене қателесің, бірақ ештеңе етпейді. Қайталап көрейік.", ru: "Небольшая ошибка, но ничего страшного. Повторим ещё раз." },
    { kk: "Сұрағың үшін рахмет! Мынаны есте сақта…", ru: "Спасибо за вопрос! Запомни вот это…" },
  ];

  /* ============================================================ STORE / API */
  const LS = "kazline.v2";
  function readDB() {
    try { return JSON.parse(localStorage.getItem(LS)) || null; } catch { return null; }
  }
  function writeDB(db) { localStorage.setItem(LS, JSON.stringify(db)); }

  function seedDB() {
    const db = {
      users: [
        { id: "u_admin", name: "Админ", email: "admin@kazline.kz", pass: "admin", role: "admin", createdAt: Date.now() - 86400000 * 30, profile: null,
          progress: { xp: 0, streak: 0, lessonsDone: [], quizzesDone: [], achievements: [], lastActive: null } },
        { id: "u_aru", name: "Аружан", email: "aru@mail.kz", pass: "1234", role: "student", createdAt: Date.now() - 86400000 * 12,
          profile: { goal: "school", placement: "A1" },
          progress: { xp: 320, streak: 5, lessonsDone: ["l1", "l2", "l3"], quizzesDone: ["q1"], achievements: ["first", "streak3", "xp100"], lastActive: Date.now() } },
        { id: "u_dias", name: "Диас", email: "dias@mail.kz", pass: "1234", role: "student", createdAt: Date.now() - 86400000 * 8,
          profile: { goal: "foreigner", placement: "A0" },
          progress: { xp: 180, streak: 2, lessonsDone: ["l1"], quizzesDone: [], achievements: ["first", "xp100"], lastActive: Date.now() - 86400000 } },
        { id: "u_mira", name: "Мира", email: "mira@mail.kz", pass: "1234", role: "student", createdAt: Date.now() - 86400000 * 3,
          profile: { goal: "beginner", placement: "A1" },
          progress: { xp: 540, streak: 9, lessonsDone: ["l1", "l2", "l3", "l4", "l5"], quizzesDone: ["q1", "q2"], achievements: ["first", "streak3", "xp100", "perfect", "scholar"], lastActive: Date.now() } },
      ],
      content: JSON.parse(JSON.stringify({ lessons: SEED.lessons, quizzes: SEED.quizzes })),
      session: null,
    };
    writeDB(db);
    return db;
  }

  let DB = readDB() || seedDB();

  /* Merge any new lessons/quizzes added to SEED into an already-existing
     (cached in localStorage) user database, so updates to the app show up
     for returning users without wiping their progress. */
  function syncContent(db) {
    if (!db.content) db.content = { lessons: [], quizzes: [] };
    let changed = false;
    SEED.lessons.forEach((l) => {
      if (!db.content.lessons.some((x) => x.id === l.id)) { db.content.lessons.push(JSON.parse(JSON.stringify(l))); changed = true; }
    });
    SEED.quizzes.forEach((q) => {
      if (!db.content.quizzes.some((x) => x.id === q.id)) { db.content.quizzes.push(JSON.parse(JSON.stringify(q))); changed = true; }
    });
    if (changed) writeDB(db);
  }
  syncContent(DB);

  /* The API surface. Replace each body with fetch() to a Python REST backend.
     e.g. login -> POST /api/auth/login ; me -> GET /api/me ; etc. */
  const api = {
    async register({ name, email, pass }) {
      await sleep(200);
      if (DB.users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
        throw new Error("Пользователь с такой почтой уже существует");
      const user = { id: "u_" + uid(), name, email, pass, role: "student", createdAt: Date.now(), profile: null,
        progress: { xp: 0, streak: 0, lessonsDone: [], quizzesDone: [], achievements: [], lastActive: Date.now() } };
      DB.users.push(user); DB.session = user.id; writeDB(DB);
      return user;
    },
    async login({ email, pass }) {
      await sleep(200);
      const u = DB.users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.pass === pass);
      if (!u) throw new Error("Неверная почта или пароль");
      DB.session = u.id; u.progress.lastActive = Date.now(); writeDB(DB);
      return u;
    },
    logout() { DB.session = null; writeDB(DB); },
    me() { return DB.users.find((u) => u.id === DB.session) || null; },
    saveProfile(profile) { const u = api.me(); if (u) { u.profile = profile; writeDB(DB); } },
    saveProgress(p) { const u = api.me(); if (u) { u.progress = { ...u.progress, ...p, lastActive: Date.now() }; writeDB(DB); } },
    lessons() { return DB.content.lessons; },
    quizzes() { return DB.content.quizzes; },
    exercises(id) { return SEED.exercises[id] || []; },
    levels() { return SEED.levels; },
    achievements() { return SEED.achievements; },
    leaderboard() {
      return DB.users.filter((u) => u.role === "student")
        .map((u) => ({ name: u.name, xp: u.progress.xp, streak: u.progress.streak }))
        .sort((a, b) => b.xp - a.xp);
    },
    aiReply(text) {
      const r = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      return { kk: r.kk.replace("{w}", text.split(" ")[0] || "сөз"), ru: r.ru };
    },
    /* admin */
    allUsers() { return DB.users; },
    deleteUser(id) { DB.users = DB.users.filter((u) => u.id !== id); writeDB(DB); },
    setRole(id, role) { const u = DB.users.find((x) => x.id === id); if (u) { u.role = role; writeDB(DB); } },
    addLesson(l) { DB.content.lessons.push({ id: "l_" + uid(), ...l }); writeDB(DB); },
    deleteLesson(id) { DB.content.lessons = DB.content.lessons.filter((l) => l.id !== id); writeDB(DB); },
    addQuiz(q) { DB.content.quizzes.push({ id: "q_" + uid(), questions: [], ...q }); writeDB(DB); },
    deleteQuiz(id) { DB.content.quizzes = DB.content.quizzes.filter((q) => q.id !== id); writeDB(DB); },
    stats() {
      const students = DB.users.filter((u) => u.role === "student");
      const totalXp = students.reduce((s, u) => s + u.progress.xp, 0);
      const lessonsDone = students.reduce((s, u) => s + u.progress.lessonsDone.length, 0);
      return {
        users: DB.users.length,
        students: students.length,
        lessons: DB.content.lessons.length,
        quizzes: DB.content.quizzes.length,
        totalXp,
        avgXp: students.length ? Math.round(totalXp / students.length) : 0,
        lessonsDone,
      };
    },
    resetAll() { localStorage.removeItem(LS); DB = seedDB(); },
  };

  /* ----------------------------------------------------------- level helpers */
  function levelInfo(xp) {
    const level = Math.floor(xp / 100) + 1;
    return { level, into: xp % 100, need: 100 };
  }

  function awardAchievement(id) {
    const u = api.me(); if (!u) return false;
    if (u.progress.achievements.includes(id)) return false;
    u.progress.achievements.push(id); writeDB(DB);
    const a = SEED.achievements.find((x) => x.id === id);
    if (a) setTimeout(() => toast("Достижение: " + a.title, "gold"), 400);
    return true;
  }

  function addXp(amount) {
    const u = api.me(); if (!u) return;
    const before = levelInfo(u.progress.xp).level;
    u.progress.xp += amount;
    const after = levelInfo(u.progress.xp).level;
    writeDB(DB);
    if (u.progress.xp >= 100) awardAchievement("xp100");
    if (after > before) setTimeout(() => { confetti(); toast("Новый уровень " + after + "!", "brand"); }, 300);
  }

  function checkMilestones() {
    const u = api.me(); if (!u) return;
    if (u.progress.lessonsDone.length >= 1) awardAchievement("first");
    if (u.progress.lessonsDone.length >= 5) awardAchievement("scholar");
    if (u.progress.streak >= 3) awardAchievement("streak3");
  }

  // expose for later inspection / API swap
  window.KazLine = { api, SEED, get DB() { return DB; } };

  /* ============================================================= ROUTER */
  const routes = {};
  function route(path, fn) { routes[path] = fn; }
  function parseHash() {
    const raw = (location.hash || "#/").slice(1);
    const [path, ...rest] = raw.split("/").filter(Boolean);
    return { name: path || "", params: rest };
  }
  function navigate(to) { location.hash = to; }

  function render() {
    const { name, params } = parseHash();
    const app = $("#app");
    const me = api.me();

    // route guarding
    const publicRoutes = ["auth", ""];
    if (!me && !publicRoutes.includes(name)) return navigate("/auth");
    if (me && name === "auth") return navigate(me.role === "admin" ? "/admin" : "/dashboard");
    if (me && me.role === "student" && !me.profile && name !== "onboarding")
      return navigate("/onboarding");
    if (name.startsWith("admin") && (!me || me.role !== "admin")) return navigate("/dashboard");

    const view = routes[name] || routes[me ? (me.role === "admin" ? "admin" : "dashboard") : "auth"];
    app.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
    app.innerHTML = "";
    const node = view(params, me);
    if (typeof node === "string") app.innerHTML = node;
    else if (node) app.appendChild(node);
    bindGlobal();
  }

  function bindGlobal() {
    $$("[data-nav]").forEach((el) => {
      if (el._bound) return; el._bound = true;
      el.addEventListener("click", (e) => {
        if (el.tagName === "A") return; // anchors use href
        navigate(el.getAttribute("data-nav"));
      });
    });
    $$("[data-setlang]").forEach((el) => {
      el.addEventListener("click", () => setLang(el.dataset.setlang));
    });
  }

  window.addEventListener("hashchange", render);

  /* ============================================================= UI: SHELL */
  /* ============================================================= I18N */
  let lang = localStorage.getItem("kazline.lang") || "ru";
  const I18N = {
    ru: {
      nav_home: "Главная", nav_lessons: "Уроки", nav_chat: "AI-чат", nav_quizzes: "Квизы", nav_achievements: "Награды",
      nav_admin: "Админ-панель", nav_profile: "Профиль", logout: "Выйти", level_short: "Ур.",
      dash_continue: "Продолжим обучение?", dash_continue_btn: "Продолжить", dash_level: "Уровень",
      dash_next_lesson: "следующий урок", dash_streak: "дней подряд", dash_xp: "всего XP",
      dash_lessons: "уроков", dash_achievements: "наград", dash_to_level: "До уровня", dash_path: "Твой путь", dash_done: "пройдено",
      lessons_title: "Уроки", lessons_sub: "Проходи по порядку и открывай новые темы",
      quizzes_title: "Квизы", quizzes_sub: "Проверь знания и заработай XP", quizzes_start: "Начать", quizzes_retry: "Пройти снова", quizzes_passed: "пройден",
      ach_title: "Награды и рейтинг", ach_opened: "Открыто", ach_of: "из", ach_rating: "Рейтинг учеников",
      profile_title: "Профиль", profile_goal: "Цель обучения", profile_retest_t: "Повторить тест на уровень",
      profile_retest_d: "Заново определим ваш стартовый уровень владения языком", profile_retest_btn: "Пройти тест",
      profile_logout_t: "Выйти из аккаунта", profile_logout_d: "Вы вернётесь на экран входа",
      lang_label: "Язык",
    },
    kk: {
      nav_home: "Басты бет", nav_lessons: "Сабақтар", nav_chat: "AI-чат", nav_quizzes: "Викториналар", nav_achievements: "Жетістіктер",
      nav_admin: "Әкімші панелі", nav_profile: "Профиль", logout: "Шығу", level_short: "Дең.",
      dash_continue: "Оқуды жалғастырамыз ба?", dash_continue_btn: "Жалғастыру", dash_level: "Деңгей",
      dash_next_lesson: "келесі сабақ", dash_streak: "күн қатарынан", dash_xp: "жалпы XP",
      dash_lessons: "сабақ", dash_achievements: "жетістік", dash_to_level: "Келесі деңгейге дейін", dash_path: "Сенің жолың", dash_done: "өтілді",
      lessons_title: "Сабақтар", lessons_sub: "Ретімен өтіп, жаңа тақырыптарды аш",
      quizzes_title: "Викториналар", quizzes_sub: "Білімді тексеріп, XP жина", quizzes_start: "Бастау", quizzes_retry: "Қайта өту", quizzes_passed: "өтілді",
      ach_title: "Жетістіктер мен рейтинг", ach_opened: "Ашылды", ach_of: "ішінен", ach_rating: "Оқушылар рейтингі",
      profile_title: "Профиль", profile_goal: "Оқу мақсаты", profile_retest_t: "Деңгей тестін қайта тапсыру",
      profile_retest_d: "Бастапқы тіл деңгейіңізді қайта анықтаймыз", profile_retest_btn: "Тест тапсыру",
      profile_logout_t: "Аккаунттан шығу", profile_logout_d: "Кіру экранына ораласыз",
      lang_label: "Тіл",
    },
  };
  function t(key) { return (I18N[lang] && I18N[lang][key]) || I18N.ru[key] || key; }
  function setLang(l) { if (l !== "ru" && l !== "kk") return; lang = l; localStorage.setItem("kazline.lang", l); render(); }
  function langSwitcher(cls) {
    return `<div class="${cls} flex items-center rounded-full bg-canvas p-0.5 text-xs font-bold">
      <button data-setlang="ru" class="px-2.5 py-1 rounded-full transition ${lang==="ru"?"grad-bg text-white":"text-muted"}">RU</button>
      <button data-setlang="kk" class="px-2.5 py-1 rounded-full transition ${lang==="kk"?"grad-bg text-white":"text-muted"}">KZ</button>
    </div>`;
  }

  const NAV = [
    { to: "/dashboard", icon: "home", key: "nav_home" },
    { to: "/lessons", icon: "book", key: "nav_lessons" },
    { to: "/chat", icon: "chat", key: "nav_chat" },
    { to: "/quizzes", icon: "quiz", key: "nav_quizzes" },
    { to: "/achievements", icon: "trophy", key: "nav_achievements" },
    { to: "/profile", icon: "user", key: "nav_profile" },
  ];

  const GOALS = [
    { id: "beginner", icon: "play", title: "Я новичок", sub: "Начинаю с нуля" },
    { id: "school", icon: "book", title: "Школьник", sub: "Помощь с учёбой" },
    { id: "foreigner", icon: "user", title: "Иностранец", sub: "Учу как второй язык" },
  ];

  function navActive(to, current) {
    if (to === "/dashboard") return current === "dashboard" || current === "";
    return ("/" + current) === to || ("/" + current).startsWith(to);
  }

  function shell(current, content) {
    const me = api.me();
    const li = levelInfo(me.progress.xp);
    const wrap = document.createElement("div");
    wrap.className = "min-h-screen lg:flex";

    // sidebar (desktop)
    const aside = `
      <aside class="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 border-r border-line bg-white/80 backdrop-blur-xl">
        <div class="px-5 py-5 flex items-center gap-3 border-b border-line/60">
          <div class="logo-mark w-10 h-10">KL</div>
          <div>
            <div class="font-black text-lg leading-none tracking-tight grad-text">KazLine</div>
            <div class="text-[11px] text-muted mt-0.5 font-medium">Қазақ тілін үйрен</div>
          </div>
        </div>
        <nav class="px-3 pt-3 overflow-y-auto flex-1 space-y-0.5">
          ${NAV.map((n) => `
            <a href="#${n.to}" class="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${navActive(n.to, current) ? "nav-active shadow-lift" : "text-muted hover:bg-canvas hover:text-ink"}">
              ${icon(n.icon, "w-5 h-5")} <span>${t(n.key)}</span>
            </a>`).join("")}
          ${me.role === "admin" ? `<a href="#/admin" class="flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-muted hover:bg-canvas hover:text-ink transition-all">${icon("gauge","w-5 h-5")}<span>${t("nav_admin")}</span></a>` : ""}
        </nav>
        <div class="flex-shrink-0 px-4 pb-2 flex items-center justify-between">
          <span class="text-xs text-muted font-semibold">${t("lang_label")}</span>
          ${langSwitcher("")}
        </div>
        <div class="flex-shrink-0 p-3">
          <div class="rounded-2xl bg-canvas border border-line p-3 flex items-center gap-3">
            <a href="#/profile" class="min-w-0 flex-1 flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand grid place-items-center font-bold text-sm group-hover:scale-105 transition">${esc(me.name[0] || "U")}</div>
              <div class="min-w-0 flex-1">
                <div class="font-semibold text-sm truncate group-hover:text-brand transition">${esc(me.name)}</div>
                <div class="text-xs text-muted">${t("level_short")} ${li.level} · <span class="text-brand font-bold">${me.progress.xp} XP</span></div>
              </div>
            </a>
            <button data-action="logout" class="text-muted hover:text-bad transition p-1.5 rounded-lg hover:bg-red-50" title="${t("logout")}">${icon("logout","w-4 h-4")}</button>
          </div>
        </div>
      </aside>`;

    // topbar (mobile)
    const top = `
      <header class="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-line px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="logo-mark w-8 h-8 text-xs">KL</div>
          <span class="font-black tracking-tight grad-text text-lg">KazLine</span>
        </div>
        <div class="flex items-center gap-2.5">
          ${langSwitcher("")}
          <span class="flex items-center gap-1 bg-gold-soft text-[#7a5700] font-bold text-xs px-2.5 py-1.5 rounded-full">${icon("flame","w-4 h-4 text-gold")}${me.progress.streak}</span>
          <a href="#/profile" class="logo-mark w-7 h-7 text-[10px]">${esc(me.name[0] || "U")}</a>
        </div>
      </header>`;

    // bottom nav (mobile)
    const bottom = `
      <nav class="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-line grid grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)]">
        ${NAV.map((n) => `
          <a href="#${n.to}" class="flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold transition-colors ${navActive(n.to, current) ? "text-brand" : "text-muted"}">
            ${icon(n.icon, "w-5 h-5")}<span>${t(n.key)}</span>
          </a>`).join("")}
      </nav>`;

    wrap.innerHTML = `
      ${aside}
      <div class="flex-1 lg:pl-72 min-h-screen flex flex-col">
        ${top}
        <main class="flex-1 px-4 sm:px-6 lg:px-10 py-6 pb-24 lg:pb-10 max-w-5xl w-full mx-auto">${content}</main>
        ${bottom}
      </div>`;

    setTimeout(() => {
      $$('[data-action="logout"]', wrap).forEach((b) => b.addEventListener("click", () => { api.logout(); toast("Вы вышли", "ink"); navigate("/auth"); }));
    }, 0);
    return wrap;
  }

  /* ============================================================= AUTH VIEW */
  route("auth", () => {
    const root = document.createElement("div");
    root.className = "min-h-screen lg:grid lg:grid-cols-2";
    let mode = "login";

    const draw = () => {
      root.innerHTML = `
        <!-- brand panel -->
        <div class="ornament relative hidden lg:flex flex-col justify-between grad-bg text-white p-12 overflow-hidden">
          <!-- decorative blobs -->
          <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none"></div>
          <div class="relative flex items-center gap-3">
            <div class="logo-mark w-11 h-11 text-base">KL</div>
            <span class="font-black text-2xl tracking-tight">KazLine</span>
          </div>
          <div class="relative max-w-md">
            <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span class="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
              Платформа изучения казахского языка
            </div>
            <h1 class="font-serif text-5xl leading-tight font-bold">Қазақ тілін<br/>ойнап үйрен</h1>
            <p class="mt-5 text-white/75 leading-relaxed text-lg">Уроки-игры, карта прогресса, AI-наставник и достижения. Учи казахский каждый день по 5 минут.</p>
            <div class="mt-8 flex gap-8">
              <div><div class="text-4xl font-black">8+</div><div class="text-sm text-white/60 mt-0.5">уроков</div></div>
              <div class="w-px bg-white/20"></div>
              <div><div class="text-4xl font-black">7</div><div class="text-sm text-white/60 mt-0.5">уровней</div></div>
              <div class="w-px bg-white/20"></div>
              <div><div class="text-4xl font-black">AI</div><div class="text-sm text-white/60 mt-0.5">наставник</div></div>
            </div>
          </div>
          <p class="relative text-white/40 text-sm">© KazLine · Тіл — ұлттың жаны</p>
        </div>

        <!-- form panel -->
        <div class="flex items-center justify-center p-6 sm:p-10 min-h-screen lg:min-h-0">
          <div class="w-full max-w-sm anim-up">
            <div class="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
              <div class="logo-mark w-10 h-10 text-sm">KL</div>
              <span class="font-black text-xl tracking-tight grad-text">KazLine</span>
            </div>

            <div class="flex p-1 rounded-2xl bg-canvas mb-6">
              <button data-tab="login" class="flex-1 py-2.5 rounded-xl font-semibold text-sm transition ${mode==="login"?"bg-surface shadow-soft text-ink":"text-muted"}">Вход</button>
              <button data-tab="register" class="flex-1 py-2.5 rounded-xl font-semibold text-sm transition ${mode==="register"?"bg-surface shadow-soft text-ink":"text-muted"}">Регистрация</button>
            </div>

            <h2 class="text-2xl font-extrabold">${mode==="login"?"С возвращением!":"Создать аккаунт"}</h2>
            <p class="text-muted text-sm mt-1">${mode==="login"?"Войдите, чтобы продолжить обучение":"Пару секунд — и начнём учиться"}</p>

            <form id="auth-form" class="mt-6 space-y-3">
              ${mode==="register"?`
                <label class="block">
                  <span class="text-sm font-semibold">Имя</span>
                  <input name="name" required placeholder="Аружан" class="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-brand focus:ring-4 focus:ring-brand-soft transition"/>
                </label>`:""}
              <label class="block">
                <span class="text-sm font-semibold">Эл. почта</span>
                <input name="email" type="email" required placeholder="you@mail.kz" class="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none focus:border-brand focus:ring-4 focus:ring-brand-soft transition"/>
              </label>
              <label class="block">
                <span class="text-sm font-semibold">Пароль</span>
                <div class="mt-1 relative">
                  <input name="pass" type="password" required minlength="3" placeholder="••••••" class="w-full rounded-xl border border-line bg-surface px-4 py-3 pr-11 outline-none focus:border-brand focus:ring-4 focus:ring-brand-soft transition"/>
                  <button type="button" data-toggle-pass class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">${icon("eye","w-5 h-5")}</button>
                </div>
              </label>
              <button class="w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition flex items-center justify-center gap-2">
                ${mode==="login"?"Войти":"Зарегистрироваться"} ${icon("arrow","w-4 h-4")}
              </button>
            </form>

            <div class="mt-5 rounded-xl bg-gold-soft border border-gold/30 p-3 text-sm">
              <div class="font-semibold text-ink flex items-center gap-1.5">${icon("sparkle","w-4 h-4 text-gold")} Демо-доступы</div>
              <button data-demo="student" class="mt-1 block text-muted hover:text-brand">Студент: aru@mail.kz / 1234</button>
              <button data-demo="admin" class="block text-muted hover:text-brand">Админ: admin@kazline.kz / admin</button>
            </div>
          </div>
        </div>`;

      $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => { mode = b.dataset.tab; draw(); }));
      const pass = $('input[name="pass"]', root);
      $("[data-toggle-pass]", root).addEventListener("click", (e) => {
        const btn = e.currentTarget;
        pass.type = pass.type === "password" ? "text" : "password";
        btn.innerHTML = icon(pass.type === "password" ? "eye" : "eyeoff", "w-5 h-5");
      });
      $$("[data-demo]", root).forEach((b) => b.addEventListener("click", () => {
        const map = { student: ["aru@mail.kz", "1234"], admin: ["admin@kazline.kz", "admin"] };
        $('input[name="email"]', root).value = map[b.dataset.demo][0];
        $('input[name="pass"]', root).value = map[b.dataset.demo][1];
      }));

      $("#auth-form", root).addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const btn = e.target.querySelector("button[type=submit], button:not([type])");
        btn.disabled = true; btn.style.opacity = ".7";
        try {
          let u;
          if (mode === "register") u = await api.register({ name: fd.get("name"), email: fd.get("email"), pass: fd.get("pass") });
          else u = await api.login({ email: fd.get("email"), pass: fd.get("pass") });
          toast("Добро пожаловать, " + u.name + "!", "ok");
          navigate(u.role === "admin" ? "/admin" : (u.profile ? "/dashboard" : "/onboarding"));
        } catch (err) {
          toast(err.message, "bad");
          btn.disabled = false; btn.style.opacity = "1";
          root.querySelector(".max-w-sm").classList.add("shake");
          setTimeout(() => root.querySelector(".max-w-sm")?.classList.remove("shake"), 450);
        }
      });
    };

    draw();
    return root;
  });

  /* ============================================================= ONBOARDING */
  route("onboarding", () => {
    const root = document.createElement("div");
    root.className = "min-h-screen bg-canvas flex items-center justify-center p-5";
    let step = 0, goal = null, answers = [], qi = 0;
    const placementQ = [
      { q: "«Сәлем» дегеніміз не?", opts: ["Спасибо", "Привет", "Пока"], answer: 1 },
      { q: "Выберите слово «два»:", opts: ["Бір", "Екі", "Үш"], answer: 1 },
      { q: "«Рахмет» означает…", opts: ["Извините", "Спасибо", "Здравствуйте"], answer: 1 },
      { q: "«Су» — это…", opts: ["Вода", "Огонь", "Хлеб"], answer: 0 },
      { q: "Как сказать «мама»?", opts: ["Әке", "Ана", "Аға"], answer: 1 },
    ];
    const goals = GOALS;

    const card = (inner) => `<div class="w-full max-w-md bg-surface rounded-xl2 shadow-soft border border-line p-7 anim-up">${inner}</div>`;

    const draw = () => {
      if (step === 0) {
        root.innerHTML = card(`
          <div class="logo-mark w-16 h-16 text-2xl mx-auto floaty">KL</div>
          <h1 class="text-2xl font-extrabold text-center mt-5">Қош келдіңіз!</h1>
          <p class="text-muted text-center mt-2">Давайте настроим обучение под вас. Это займёт минуту.</p>
          <button id="next" class="mt-6 w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">Поехали ${""}</button>`);
        $("#next", root).addEventListener("click", () => { step = 1; draw(); });
      } else if (step === 1) {
        root.innerHTML = card(`
          <div class="text-sm font-bold text-brand">Шаг 1 из 2</div>
          <h2 class="text-xl font-extrabold mt-1">Какая у вас цель?</h2>
          <div class="mt-5 space-y-3">
            ${goals.map((g) => `
              <button data-goal="${g.id}" class="w-full flex items-center gap-4 p-4 rounded-2xl border-2 ${goal===g.id?"border-brand bg-brand-soft":"border-line hover:border-brand/40"} transition text-left">
                <div class="w-11 h-11 rounded-xl bg-brand-soft text-brand grid place-items-center">${icon(g.icon,"w-6 h-6")}</div>
                <div><div class="font-bold">${g.title}</div><div class="text-sm text-muted">${g.sub}</div></div>
              </button>`).join("")}
          </div>
          <button id="next" ${goal?"":"disabled"} class="mt-6 w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition disabled:opacity-40">Дальше</button>`);
        $$("[data-goal]", root).forEach((b) => b.addEventListener("click", () => { goal = b.dataset.goal; draw(); }));
        $("#next", root).addEventListener("click", () => { step = 2; draw(); });
      } else {
        const q = placementQ[qi];
        root.innerHTML = card(`
          <div class="flex items-center justify-between text-sm font-bold text-brand">
            <span>Тест на уровень</span><span>${qi + 1} / ${placementQ.length}</span>
          </div>
          <div class="mt-3 h-2 rounded-full bg-canvas overflow-hidden"><div class="h-full bg-brand transition-all" style="width:${(qi/placementQ.length)*100}%"></div></div>
          <h2 class="text-lg font-extrabold mt-5">${esc(q.q)}</h2>
          <div class="mt-4 space-y-2.5">
            ${q.opts.map((o, i) => `<button data-opt="${i}" class="w-full p-4 rounded-2xl border-2 border-line hover:border-brand hover:bg-brand-soft font-semibold text-left transition">${esc(o)}</button>`).join("")}
          </div>`);
        $$("[data-opt]", root).forEach((b) => b.addEventListener("click", () => {
          answers.push(+b.dataset.opt === q.answer); qi++;
          if (qi >= placementQ.length) finish();
          else draw();
        }));
      }
    };

    const finish = () => {
      const correct = answers.filter(Boolean).length;
      const placement = correct >= 4 ? "A2" : correct >= 2 ? "A1" : "A0";
      api.saveProfile({ goal, placement });
      const lvl = SEED.levels.find((l) => l.id === placement);
      root.innerHTML = card(`
        <div class="ornament w-20 h-20 rounded-full bg-gold text-white grid place-items-center mx-auto anim-pop shadow-lift">${icon("trophy","w-10 h-10")}</div>
        <h2 class="text-2xl font-extrabold text-center mt-5">Готово!</h2>
        <p class="text-muted text-center mt-2">Ваш уровень: <b class="text-ink">${placement} · ${lvl.name}</b><br/>Правильных ответов: ${correct} из ${placementQ.length}</p>
        <button id="go" class="mt-6 w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">Начать обучение</button>`);
      confetti();
      $("#go", root).addEventListener("click", () => navigate("/dashboard"));
    };

    draw();
    return root;
  });

  /* ============================================================= DASHBOARD */
  route("dashboard", (params, me) => {
    const li = levelInfo(me.progress.xp);
    const lessons = api.lessons();
    const done = me.progress.lessonsDone;
    const nextLesson = lessons.find((l) => !done.includes(l.id)) || lessons[0];
    const pct = Math.round((done.length / lessons.length) * 100);

    const statCard = (ic, val, label, color, iconColor) => `
      <div class="card p-4 card-hover cursor-default">
        <div class="w-9 h-9 rounded-xl ${color} grid place-items-center mb-3">${icon(ic,"w-5 h-5 " + iconColor)}</div>
        <div class="text-2xl font-black leading-none">${val}</div>
        <div class="text-xs text-muted mt-1 font-medium">${label}</div>
      </div>`;

    const content = `
      <div class="stagger space-y-6">
        <!-- hero -->
        <div class="ornament relative overflow-hidden rounded-xl3 grad-bg text-white p-6 sm:p-8 shadow-glow">
          <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
          <div class="absolute bottom-0 left-1/3 w-64 h-32 rounded-full bg-black/10 blur-3xl pointer-events-none"></div>
          <div class="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
                ${icon("flame","w-4 h-4 text-yellow-300")} ${me.progress.streak} дней серия
              </div>
              <div class="text-white/70 text-sm font-medium">${lang==="kk"?`Сәлем, ${esc(me.name)}!`:`Привет, ${esc(me.name)}!`}</div>
              <h1 class="font-serif text-3xl font-bold mt-1">${t("dash_continue")}</h1>
              <p class="text-white/70 mt-1.5 text-sm">${t("dash_level")} <span class="font-bold text-white">${me.profile?.placement || "A0"}</span> · ${t("dash_next_lesson")}: «${esc(nextLesson.title)}»</p>
              <a href="#/lesson/${nextLesson.id}" class="inline-flex items-center gap-2 mt-5 bg-white text-brand font-bold px-5 py-3 rounded-xl shadow-lift hover:bg-white/90 hover:scale-105 transition">
                ${icon("play","w-4 h-4")} ${t("dash_continue_btn")}
              </a>
            </div>
            <div class="text-center bg-white/15 backdrop-blur rounded-2xl px-6 py-4">
              <div class="text-6xl font-black tracking-tight">${li.level}</div>
              <div class="text-white/60 text-xs font-semibold uppercase tracking-widest mt-1">${t("dash_level")}</div>
            </div>
          </div>
        </div>

        <!-- stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${statCard("flame", me.progress.streak, t("dash_streak"), "bg-gold-soft", "text-gold")}
          ${statCard("bolt", me.progress.xp, t("dash_xp"), "bg-brand-soft", "text-brand")}
          ${statCard("book", done.length + "/" + lessons.length, t("dash_lessons"), "bg-brand-soft", "text-brand")}
          ${statCard("trophy", me.progress.achievements.length, t("dash_achievements"), "bg-gold-soft", "text-gold")}
        </div>

        <!-- level progress -->
        <div class="card p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="font-bold text-sm">${t("dash_to_level")} ${li.level + 1}</span>
            <span class="xp-badge">${li.into} / ${li.need} XP</span>
          </div>
          <div class="h-2.5 rounded-full bg-canvas overflow-hidden"><div class="h-full progress-fill" style="width:${(li.into/li.need)*100}%"></div></div>
        </div>

        <!-- path map -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-extrabold">${t("dash_path")}</h2>
            <span class="text-sm text-muted font-semibold">${pct}% ${t("dash_done")}</span>
          </div>
          <div class="flex flex-col items-center gap-9">
            ${lessons.map((l, idx) => {
              const isDone = done.includes(l.id);
              const isNext = !isDone && lessons.slice(0, idx).every((x) => done.includes(x.id));
              const locked = !isDone && !isNext;
              const cls = isDone ? "bg-ok text-white" : isNext ? "bg-brand text-white floaty" : "bg-surface text-muted border-2 border-line";
              const side = idx % 2 === 0 ? "self-center" : (idx % 4 === 1 ? "sm:self-start sm:ml-16" : "sm:self-end sm:mr-16");
              return `
                <div class="relative ${side} ${idx < lessons.length - 1 ? "node-line" : ""} ${isDone ? "done" : ""}">
                  <a href="${locked ? "#/lessons" : "#/lesson/" + l.id}" class="group flex flex-col items-center ${locked ? "pointer-events-none opacity-60" : ""}">
                    <div class="w-20 h-20 rounded-full grid place-items-center shadow-soft ${cls} ${isNext ? "shadow-lift ring-4 ring-brand-soft" : ""} group-hover:scale-105 transition">
                      ${locked ? icon("lock","w-7 h-7") : isDone ? icon("check","w-8 h-8") : icon(l.icon,"w-7 h-7")}
                    </div>
                    <div class="mt-2 text-center"><div class="font-bold text-sm">${esc(l.title)}</div><div class="text-xs text-muted">${esc(l.sub)}</div></div>
                  </a>
                </div>`;
            }).join("")}
          </div>
        </div>
      </div>`;

    return shell("dashboard", content);
  });

  /* ============================================================= LESSONS LIST */
  route("lessons", (params, me) => {
    const lessons = api.lessons();
    const done = me.progress.lessonsDone;
    const byLevel = SEED.levels.map((lv) => ({ lv, items: lessons.filter((l) => l.level === lv.id) }));
    const content = `
      <div class="space-y-7">
        <div><h1 class="text-2xl font-extrabold">${t("lessons_title")}</h1><p class="text-muted mt-1">${t("lessons_sub")}</p></div>
        ${byLevel.map(({ lv, items }) => `
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-lg bg-brand-soft text-brand font-bold text-sm">${lv.id}</span>
              <span class="font-bold">${lv.name}</span><span class="text-muted text-sm">· ${lv.sub}</span>
            </div>
            <div class="grid sm:grid-cols-2 gap-3 stagger">
              ${items.map((l, idx) => {
                const isDone = done.includes(l.id);
                const globalIdx = lessons.indexOf(l);
                const isNext = !isDone && lessons.slice(0, globalIdx).every((x) => done.includes(x.id));
                const locked = !isDone && !isNext;
                return `
                  <a href="${locked ? "#" : "#/lesson/" + l.id}" class="${locked ? "opacity-60 pointer-events-none" : ""} group bg-surface rounded-2xl border border-line p-4 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl grid place-items-center ${isDone ? "bg-ok text-white" : "bg-brand-soft text-brand"}">${locked ? icon("lock","w-5 h-5") : isDone ? icon("check","w-6 h-6") : icon(l.icon,"w-6 h-6")}</div>
                    <div class="flex-1 min-w-0"><div class="font-bold truncate">${esc(l.title)}</div><div class="text-sm text-muted truncate">${esc(l.sub)}</div></div>
                    <span class="text-gold font-bold text-sm flex items-center gap-1">${icon("bolt","w-4 h-4")}${l.xp}</span>
                  </a>`;
              }).join("")}
            </div>
          </div>`).join("")}
      </div>`;
    return shell("lessons", content);
  });

  /* ============================================================= LESSON PLAYER */
  route("lesson", (params, me) => {
    const id = params[0];
    const lesson = api.lessons().find((l) => l.id === id);
    const exercises = api.exercises(id);
    if (!lesson || !exercises.length) { navigate("/lessons"); return document.createElement("div"); }

    const root = document.createElement("div");
    root.className = "min-h-screen bg-canvas flex flex-col";
    let idx = 0, mistakes = 0, locked = false;

    const speak = (text) => {
      try { const u = new SpeechSynthesisUtterance(text); u.lang = "kk-KZ"; u.rate = .85; speechSynthesis.speak(u); } catch {}
    };

    const header = () => `
      <header class="sticky top-0 bg-canvas/90 backdrop-blur z-10 px-4 py-3 flex items-center gap-4">
        <a href="#/dashboard" class="text-muted hover:text-ink">${icon("x","w-6 h-6")}</a>
        <div class="flex-1 h-3 rounded-full bg-line overflow-hidden"><div class="h-full bg-ok transition-all duration-500" style="width:${(idx/exercises.length)*100}%"></div></div>
        <span class="text-bad font-bold text-sm flex items-center gap-1">${icon("flame","w-4 h-4")}${3 - mistakes}</span>
      </header>`;

    const footer = (label, enabled, action, kind) => {
      const wrap = document.createElement("div");
      wrap.className = "border-t border-line bg-surface p-4";
      wrap.innerHTML = `<div class="max-w-xl mx-auto"><button id="cont" ${enabled?"":"disabled"} class="w-full rounded-xl ${kind==="bad"?"bg-bad":"bg-brand"} text-white font-bold py-3.5 shadow-lift disabled:opacity-40 transition">${label}</button></div>`;
      $("#cont", wrap).addEventListener("click", action);
      return wrap;
    };

    const finish = () => {
      const accuracy = Math.round(((exercises.length - mistakes) / exercises.length) * 100);
      const firstTime = !me.progress.lessonsDone.includes(id);
      if (firstTime) {
        const lessonsDone = [...me.progress.lessonsDone, id];
        api.saveProgress({ lessonsDone, streak: me.progress.streak + (me.progress.streak ? 0 : 1) });
        addXp(lesson.xp);
        checkMilestones();
      }
      root.innerHTML = `
        <div class="flex-1 flex items-center justify-center p-6">
          <div class="text-center max-w-sm anim-up">
            <div class="ornament w-24 h-24 rounded-full bg-gold text-white grid place-items-center mx-auto anim-pop shadow-lift">${icon("trophy","w-12 h-12")}</div>
            <h1 class="text-3xl font-extrabold mt-6">Урок пройден!</h1>
            <p class="text-muted mt-2">«${esc(lesson.title)}»</p>
            <div class="grid grid-cols-2 gap-3 mt-6">
              <div class="bg-surface rounded-2xl border border-line p-4"><div class="text-2xl font-extrabold text-gold">+${firstTime?lesson.xp:0}</div><div class="text-xs text-muted">XP</div></div>
              <div class="bg-surface rounded-2xl border border-line p-4"><div class="text-2xl font-extrabold text-ok">${accuracy}%</div><div class="text-xs text-muted">точность</div></div>
            </div>
            <div class="mt-6 flex flex-col gap-2">
              <a href="#/dashboard" class="rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">На карту</a>
              <a href="#/lessons" class="rounded-xl bg-canvas font-bold py-3 text-muted hover:text-ink transition">К списку уроков</a>
            </div>
          </div>
        </div>`;
      confetti();
    };

    const next = () => { idx++; locked = false; if (idx >= exercises.length) finish(); else draw(); };

    const draw = () => {
      const ex = exercises[idx];
      root.innerHTML = "";
      root.insertAdjacentHTML("beforeend", header());
      const body = document.createElement("div");
      body.className = "flex-1 px-4 py-6 overflow-y-auto";
      const inner = document.createElement("div");
      inner.className = "max-w-xl mx-auto anim-up";
      body.appendChild(inner);
      root.appendChild(body);

      if (ex.type === "theory") {
        inner.innerHTML = `
          <div class="text-sm font-bold text-brand mb-4">Теория</div>
          <h2 class="text-2xl font-extrabold mb-4">${esc(ex.title || "")}</h2>
          <div class="bg-surface rounded-xl2 border border-line p-5 shadow-soft mb-3">
            <div class="text-xs font-bold text-brand uppercase mb-1">Қазақша</div>
            <p class="text-sm leading-relaxed">${esc(ex.kk)}</p>
          </div>
          <div class="bg-surface rounded-xl2 border border-line p-5 shadow-soft">
            <div class="text-xs font-bold text-brand uppercase mb-1">Русский</div>
            <p class="text-sm leading-relaxed">${esc(ex.ru)}</p>
          </div>`;
        root.appendChild(footer("Понятно", true, next));
      }

      else if (ex.type === "flash") {
        inner.innerHTML = `
          <div class="text-sm font-bold text-brand mb-4">Новое слово</div>
          <div class="bg-surface rounded-xl2 border border-line p-8 text-center shadow-soft">
            <div class="text-4xl font-extrabold text-brand">${esc(ex.kk)}</div>
            <button id="say" class="mt-3 inline-flex items-center gap-1.5 text-muted hover:text-brand font-semibold">${icon("speak","w-5 h-5")} Прослушать</button>
            <div class="mt-4 text-xl font-semibold">${esc(ex.ru)}</div>
            <div class="mt-3 text-sm text-muted">${esc(ex.hint || "")}</div>
          </div>`;
        $("#say", inner).addEventListener("click", () => speak(ex.kk));
        speak(ex.kk);
        root.appendChild(footer("Понятно", true, next));
      }

      else if (ex.type === "choice") {
        inner.innerHTML = `<div class="text-sm font-bold text-brand mb-4">Выбери ответ</div>
          <h2 class="text-2xl font-extrabold">${esc(ex.q)}</h2>
          <div class="mt-6 space-y-3" id="opts">
            ${ex.opts.map((o, i) => `<button data-i="${i}" class="w-full p-4 rounded-2xl border-2 border-line hover:border-brand font-semibold text-left transition">${esc(o)}</button>`).join("")}
          </div>`;
        const ft = footer("Проверить", false, next);
        root.appendChild(ft);
        $$("#opts button", inner).forEach((b) => b.addEventListener("click", () => {
          if (locked) return; locked = true;
          const i = +b.dataset.i, correct = i === ex.answer;
          $$("#opts button", inner).forEach((x) => x.disabled = true);
          if (correct) { b.className = "w-full p-4 rounded-2xl border-2 border-ok bg-green-50 font-semibold text-left text-ok"; toast("Дұрыс!","ok"); }
          else { b.className = "w-full p-4 rounded-2xl border-2 border-bad bg-red-50 font-semibold text-left text-bad shake"; $$("#opts button", inner)[ex.answer].className = "w-full p-4 rounded-2xl border-2 border-ok bg-green-50 font-semibold text-left text-ok"; mistakes++; }
          $("#cont", ft).disabled = false;
        }));
      }

      else if (ex.type === "build") {
        let chosen = [];
        const render = () => {
          inner.innerHTML = `<div class="text-sm font-bold text-brand mb-4">Собери перевод</div>
            <h2 class="text-xl font-extrabold">«${esc(ex.ru)}»</h2>
            <div id="answer" class="mt-5 min-h-16 flex flex-wrap gap-2 p-3 rounded-2xl border-2 border-dashed border-line bg-surface">
              ${chosen.map((w, i) => `<button data-rm="${i}" class="px-3 py-2 rounded-xl bg-brand text-white font-semibold">${esc(w)}</button>`).join("") || '<span class="text-muted self-center px-2">Нажимай на слова ниже…</span>'}
            </div>
            <div id="pool" class="mt-5 flex flex-wrap gap-2">
              ${ex.pool.map((w, i) => `<button data-add="${i}" class="px-3 py-2 rounded-xl bg-surface border border-line font-semibold hover:border-brand transition ${chosen.includes(w)?"opacity-30 pointer-events-none":""}">${esc(w)}</button>`).join("")}
            </div>`;
          $$("[data-add]", inner).forEach((b) => b.addEventListener("click", () => { chosen.push(ex.pool[+b.dataset.add]); render(); refresh(); }));
          $$("[data-rm]", inner).forEach((b) => b.addEventListener("click", () => { chosen.splice(+b.dataset.rm, 1); render(); refresh(); }));
        };
        const ft = footer("Проверить", false, () => {
          const ok = JSON.stringify(chosen) === JSON.stringify(ex.answer);
          if (!ok) mistakes++;
          toast(ok ? "Дұрыс!" : "Правильно: " + ex.answer.join(" "), ok ? "ok" : "bad");
          next();
        });
        const refresh = () => { $("#cont", ft).disabled = chosen.length === 0; };
        root.appendChild(ft); render(); refresh();
      }

      else if (ex.type === "write") {
        inner.innerHTML = `<div class="text-sm font-bold text-brand mb-4">Напиши по-казахски</div>
          <h2 class="text-xl font-extrabold">«${esc(ex.ru)}»</h2>
          <input id="ans" placeholder="Введите перевод…" class="mt-5 w-full rounded-xl border-2 border-line bg-surface px-4 py-3.5 text-lg outline-none focus:border-brand transition"/>
          <p class="text-sm text-muted mt-2">Регистр и точность букв не важны</p>`;
        const norm = (s) => s.trim().toLowerCase().replace(/ё/g, "е");
        const ft = footer("Проверить", false, () => {
          const ok = norm($("#ans", inner).value) === norm(ex.answer);
          if (!ok) mistakes++;
          toast(ok ? "Дұрыс!" : "Правильно: " + ex.answer, ok ? "ok" : "bad");
          next();
        });
        root.appendChild(ft);
        const input = $("#ans", inner);
        input.addEventListener("input", () => $("#cont", ft).disabled = !input.value.trim());
        input.addEventListener("keydown", (e) => { if (e.key === "Enter" && input.value.trim()) $("#cont", ft).click(); });
        setTimeout(() => input.focus(), 50);
      }

      else if (ex.type === "match") {
        let selL = null, matched = 0;
        const rights = ex.pairs.map((p, i) => ({ t: p[1], i })).sort(() => Math.random() - 0.5);
        inner.innerHTML = `<div class="text-sm font-bold text-brand mb-4">Соедини пары</div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-2.5">${ex.pairs.map((p, i) => `<button data-l="${i}" class="w-full p-3.5 rounded-xl border-2 border-line bg-surface font-semibold hover:border-brand transition">${esc(p[0])}</button>`).join("")}</div>
            <div class="space-y-2.5">${rights.map((r) => `<button data-r="${r.i}" class="w-full p-3.5 rounded-xl border-2 border-line bg-surface font-semibold hover:border-brand transition">${esc(r.t)}</button>`).join("")}</div>
          </div>`;
        const ft = footer("Продолжить", false, next);
        root.appendChild(ft);
        const pick = (side, btn) => {
          if (btn.disabled) return;
          if (side === "l") { $$("[data-l]", inner).forEach((x) => x.classList.remove("border-brand","bg-brand-soft")); btn.classList.add("border-brand","bg-brand-soft"); selL = btn; }
          else if (selL) {
            const li = +selL.dataset.l, ri = +btn.dataset.r;
            if (li === ri) {
              [selL, btn].forEach((x) => { x.disabled = true; x.className = "w-full p-3.5 rounded-xl border-2 border-ok bg-green-50 text-ok font-semibold"; });
              selL = null; matched++;
              if (matched === ex.pairs.length) { $("#cont", ft).disabled = false; toast("Барлығы дұрыс!","ok"); }
            } else {
              btn.classList.add("shake"); selL.classList.add("shake");
              setTimeout(() => { btn.classList.remove("shake"); selL && selL.classList.remove("shake","border-brand","bg-brand-soft"); selL = null; }, 450);
              mistakes++;
            }
          }
        };
        $$("[data-l]", inner).forEach((b) => b.addEventListener("click", () => pick("l", b)));
        $$("[data-r]", inner).forEach((b) => b.addEventListener("click", () => pick("r", b)));
      }
    };

    draw();
    return root;
  });

  /* ============================================================= AI CHAT */
  const chatStore = {};
  route("chat", (params, me) => {
    if (!chatStore[me.id]) chatStore[me.id] = [{ who: "ai", kk: "Сәлеметсіз бе! Мен сіздің ұстазыңызбын.", ru: "Здравствуйте! Я ваш AI-наставник. Пишите мне на казахском или русском — попрактикуемся вместе." }];
    const msgs = chatStore[me.id];
    let count = 0;

    const content = `
      <div class="flex flex-col h-[calc(100vh-9rem)] lg:h-[calc(100vh-5rem)]">
        <div class="flex items-center gap-3 pb-4 border-b border-line">
          <div class="ornament w-11 h-11 rounded-2xl bg-brand text-white grid place-items-center shadow-lift">${icon("sparkle","w-6 h-6")}</div>
          <div><div class="font-extrabold">Ұстаз AI</div><div class="text-sm text-ok flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-ok"></span> онлайн · отвечает на двух языках</div></div>
        </div>
        <div id="feed" class="flex-1 overflow-y-auto py-4 space-y-3"></div>
        <div class="pt-2">
          <div id="chips" class="flex flex-wrap gap-2 mb-2">
            ${["Сәлем!","Қалың қалай?","Как сказать «спасибо»?","Менің атым..."].map((c) => `<button data-chip="${esc(c)}" class="px-3 py-1.5 rounded-full bg-brand-soft text-brand text-sm font-semibold hover:bg-brand hover:text-white transition">${esc(c)}</button>`).join("")}
          </div>
          <form id="cform" class="flex gap-2">
            <input id="cin" placeholder="Напишите сообщение…" class="flex-1 rounded-xl border-2 border-line bg-surface px-4 py-3 outline-none focus:border-brand transition"/>
            <button class="rounded-xl bg-brand text-white px-5 font-bold shadow-lift hover:bg-brand-dark transition">${icon("arrow","w-5 h-5")}</button>
          </form>
        </div>
      </div>`;
    const node = shell("chat", content);

    setTimeout(() => {
      const feed = $("#feed", node);
      const bubble = (m) => m.who === "me"
        ? `<div class="flex justify-end"><div class="anim-up max-w-[80%] bg-brand text-white rounded-2xl rounded-br-md px-4 py-2.5">${esc(m.text)}</div></div>`
        : `<div class="flex justify-start"><div class="anim-up max-w-[85%] bg-surface border border-line rounded-2xl rounded-bl-md px-4 py-2.5 shadow-soft"><div class="font-semibold text-brand">${esc(m.kk)}</div><div class="text-sm text-muted mt-0.5">${esc(m.ru)}</div></div></div>`;
      const paint = () => { feed.innerHTML = msgs.map(bubble).join(""); feed.scrollTop = feed.scrollHeight; };
      paint();

      const send = async (text) => {
        if (!text.trim()) return;
        msgs.push({ who: "me", text }); paint();
        const typing = document.createElement("div");
        typing.className = "flex justify-start";
        typing.innerHTML = `<div class="bg-surface border border-line rounded-2xl px-4 py-3 shadow-soft typing"><span></span><span></span><span></span></div>`;
        feed.appendChild(typing); feed.scrollTop = feed.scrollHeight;
        await sleep(700 + Math.random() * 500);
        typing.remove();
        msgs.push({ who: "ai", ...api.aiReply(text) }); paint();
        count++;
        if (count >= 10) awardAchievement("chatty");
      };

      $("#cform", node).addEventListener("submit", (e) => { e.preventDefault(); const v = $("#cin", node).value; $("#cin", node).value = ""; send(v); });
      $$("[data-chip]", node).forEach((b) => b.addEventListener("click", () => send(b.dataset.chip)));
    }, 0);

    return node;
  });

  /* ============================================================= QUIZZES */
  route("quizzes", (params, me) => {
    const quizzes = api.quizzes();
    const content = `
      <div class="space-y-5">
        <div><h1 class="text-2xl font-extrabold">${t("quizzes_title")}</h1><p class="text-muted mt-1">${t("quizzes_sub")}</p></div>
        <div class="grid sm:grid-cols-2 gap-3 stagger">
          ${quizzes.map((q) => {
            const done = me.progress.quizzesDone.includes(q.id);
            return `
              <a href="#/quiz/${q.id}" class="group bg-surface rounded-2xl border border-line p-5 shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition">
                <div class="flex items-center justify-between">
                  <div class="w-12 h-12 rounded-xl bg-brand-soft text-brand grid place-items-center">${icon(q.icon || "quiz","w-6 h-6")}</div>
                  ${done ? `<span class="text-ok flex items-center gap-1 text-sm font-bold">${icon("check","w-4 h-4")} ${t("quizzes_passed")}</span>` : `<span class="text-gold font-bold text-sm flex items-center gap-1">${icon("bolt","w-4 h-4")}${q.xp}</span>`}
                </div>
                <div class="font-bold mt-3">${esc(q.title)}</div>
                <div class="text-sm text-muted">${esc(q.sub)}</div>
                <div class="mt-3 inline-flex items-center gap-1.5 text-brand font-semibold text-sm group-hover:gap-2.5 transition-all">${done?t("quizzes_retry"):t("quizzes_start")} ${icon("arrow","w-4 h-4")}</div>
              </a>`;
          }).join("")}
        </div>
      </div>`;
    return shell("quizzes", content);
  });

  route("quiz", (params, me) => {
    const quiz = api.quizzes().find((q) => q.id === params[0]);
    if (!quiz) { navigate("/quizzes"); return document.createElement("div"); }
    const root = document.createElement("div");
    root.className = "min-h-screen bg-canvas flex flex-col";
    let idx = 0, correct = 0, locked = false;
    const totalQ = quiz.questions.length;
    const maxPoints = quiz.questions.reduce((s, q) => s + (q.points || 1), 0);
    let earnedPoints = 0;
    let showedTheory = !quiz.theory;

    const finish = () => {
      const all = correct === totalQ;
      const firstTime = !me.progress.quizzesDone.includes(quiz.id);
      if (firstTime) { api.saveProgress({ quizzesDone: [...me.progress.quizzesDone, quiz.id] }); addXp(quiz.xp); }
      if (all) awardAchievement("perfect");
      root.innerHTML = `
        <div class="flex-1 flex items-center justify-center p-6">
          <div class="text-center max-w-sm anim-up">
            <div class="ornament w-24 h-24 rounded-full ${all?"bg-gold":"bg-brand"} text-white grid place-items-center mx-auto anim-pop shadow-lift">${icon(all?"star":"check","w-12 h-12")}</div>
            <h1 class="text-3xl font-extrabold mt-6">${all?"Идеально!":"Готово!"}</h1>
            <p class="text-muted mt-2">Правильных: <b class="text-ink">${correct} из ${totalQ}</b></p>
            ${quiz.questions.some(q=>q.points) ? `<p class="text-muted mt-1">Баллы: <b class="text-ink">${earnedPoints} из ${maxPoints}</b></p>` : ""}
            <div class="mt-4 text-gold font-extrabold text-2xl">+${firstTime?quiz.xp:0} XP</div>
            <div class="mt-6 flex flex-col gap-2">
              <a href="#/quizzes" class="rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">К квизам</a>
              <a href="#/dashboard" class="rounded-xl bg-canvas font-bold py-3 text-muted hover:text-ink transition">На главную</a>
            </div>
          </div>
        </div>`;
      if (all) confetti();
    };

    const next = (ok, points) => {
      if (ok) { correct++; earnedPoints += points; }
      setTimeout(() => { idx++; if (idx >= totalQ) finish(); else draw(); }, ok === null ? 0 : 900);
    };

    const drawTheory = () => {
      root.innerHTML = `
        <header class="sticky top-0 bg-canvas/90 backdrop-blur z-10 px-4 py-3 flex items-center gap-4">
          <a href="#/quizzes" class="text-muted hover:text-ink">${icon("x","w-6 h-6")}</a>
          <div class="flex-1 font-bold text-sm text-brand">${esc(quiz.title)} · Теория</div>
        </header>
        <div class="flex-1 px-4 py-8 overflow-y-auto">
          <div class="max-w-xl mx-auto anim-up space-y-5">
            <h2 class="text-2xl font-extrabold">${esc(quiz.title)}</h2>
            <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
              <div class="text-xs font-bold text-brand uppercase mb-1">Қазақша</div>
              <p class="text-sm leading-relaxed">${esc(quiz.theory.kk)}</p>
            </div>
            <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
              <div class="text-xs font-bold text-brand uppercase mb-1">Русский</div>
              <p class="text-sm leading-relaxed">${esc(quiz.theory.ru)}</p>
            </div>
            <button id="startq" class="w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition flex items-center justify-center gap-2">${icon("play","w-5 h-5")} Начать квиз</button>
          </div>
        </div>`;
      $("#startq", root).addEventListener("click", () => { showedTheory = true; draw(); });
    };

    const header = () => `
        <header class="sticky top-0 bg-canvas/90 backdrop-blur z-10 px-4 py-3 flex items-center gap-4">
          <a href="#/quizzes" class="text-muted hover:text-ink">${icon("x","w-6 h-6")}</a>
          <div class="flex-1 h-3 rounded-full bg-line overflow-hidden"><div class="h-full bg-brand transition-all duration-500" style="width:${(idx/totalQ)*100}%"></div></div>
          <span class="text-sm font-bold text-muted">${idx+1}/${totalQ}</span>
        </header>`;

    const drawMc = (q) => {
      root.innerHTML = `${header()}
        <div class="flex-1 px-4 py-8 overflow-y-auto">
          <div class="max-w-xl mx-auto anim-up">
            <div class="text-sm font-bold text-brand mb-2">${esc(quiz.title)}</div>
            <h2 class="text-2xl font-extrabold">${esc(q.q)}</h2>
            <div id="opts" class="mt-6 space-y-3">
              ${q.opts.map((o, i) => `<button data-i="${i}" class="w-full p-4 rounded-2xl border-2 border-line bg-surface hover:border-brand font-semibold text-left transition">${esc(o)}</button>`).join("")}
            </div>
          </div>
        </div>`;
      $$("#opts button", root).forEach((b) => b.addEventListener("click", () => {
        if (locked) return; locked = true;
        const i = +b.dataset.i, ok = i === q.answer;
        $$("#opts button", root).forEach((x) => x.disabled = true);
        if (ok) { b.className = "w-full p-4 rounded-2xl border-2 border-ok bg-green-50 text-ok font-semibold text-left"; }
        else { b.className = "w-full p-4 rounded-2xl border-2 border-bad bg-red-50 text-bad font-semibold text-left shake"; $$("#opts button", root)[q.answer].className = "w-full p-4 rounded-2xl border-2 border-ok bg-green-50 text-ok font-semibold text-left"; }
        next(ok, q.points || 1);
      }));
    };

    const drawMatch = (q) => {
      const rightVals = q.pairs.map((p) => p[1]);
      root.innerHTML = `${header()}
        <div class="flex-1 px-4 py-8 overflow-y-auto">
          <div class="max-w-xl mx-auto anim-up">
            <div class="text-sm font-bold text-brand mb-2">${esc(quiz.title)}</div>
            <h2 class="text-xl font-extrabold">${esc(q.q)}</h2>
            <div id="mwrap" class="mt-6 space-y-3">
              ${q.pairs.map((p, i) => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-surface border-2 border-line">
                  <div class="flex-1 font-semibold text-sm">${esc(p[0])}</div>
                  <select data-i="${i}" class="flex-1 rounded-lg border border-line bg-canvas px-2 py-2 text-sm font-semibold outline-none focus:border-brand">
                    <option value="">— выбрать —</option>
                    ${rightVals.map((r) => `<option value="${esc(r)}">${esc(r)}</option>`).join("")}
                  </select>
                </div>`).join("")}
            </div>
            <button id="checkm" class="mt-5 w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">Проверить</button>
          </div>
        </div>`;
      $("#checkm", root).addEventListener("click", () => {
        if (locked) return; locked = true;
        const selects = $$("#mwrap select", root);
        const ok = selects.every((s, i) => s.value === q.pairs[i][1]);
        selects.forEach((s, i) => { s.disabled = true; s.className += s.value === q.pairs[i][1] ? " border-ok text-ok" : " border-bad text-bad"; });
        $("#checkm", root).className = `mt-5 w-full rounded-xl ${ok?"bg-ok":"bg-bad"} text-white font-bold py-3.5 shadow-lift transition`;
        $("#checkm", root).textContent = ok ? "Верно!" : "Есть ошибки";
        next(ok, q.points || 2);
      });
    };

    const drawOpen = (q) => {
      root.innerHTML = `${header()}
        <div class="flex-1 px-4 py-8 overflow-y-auto">
          <div class="max-w-xl mx-auto anim-up">
            <div class="text-sm font-bold text-brand mb-2">${esc(quiz.title)}</div>
            <h2 class="text-xl font-extrabold">${esc(q.q)}</h2>
            <input id="oinput" type="text" autocomplete="off" placeholder="Напишите ответ…" class="mt-6 w-full rounded-xl border-2 border-line px-4 py-3.5 font-semibold outline-none focus:border-brand"/>
            <button id="checko" class="mt-4 w-full rounded-xl bg-brand text-white font-bold py-3.5 shadow-lift hover:bg-brand-dark transition">Ответить</button>
          </div>
        </div>`;
      const submit = () => {
        if (locked) return; locked = true;
        const val = $("#oinput", root).value.trim().toLowerCase();
        const ok = q.answers.some((a) => a.trim().toLowerCase() === val);
        $("#oinput", root).disabled = true;
        $("#oinput", root).className = `mt-6 w-full rounded-xl border-2 ${ok?"border-ok text-ok":"border-bad text-bad"} px-4 py-3.5 font-semibold outline-none`;
        $("#checko", root).className = `mt-4 w-full rounded-xl ${ok?"bg-ok":"bg-bad"} text-white font-bold py-3.5 shadow-lift transition`;
        $("#checko", root).textContent = ok ? "Верно!" : `Правильно: ${q.answers[0]}`;
        next(ok, q.points || 3);
      };
      $("#checko", root).addEventListener("click", submit);
      $("#oinput", root).addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
    };

    const draw = () => {
      locked = false;
      const q = quiz.questions[idx];
      if (!q.type || q.type === "mc") drawMc(q);
      else if (q.type === "match") drawMatch(q);
      else if (q.type === "open") drawOpen(q);
    };

    if (!showedTheory) drawTheory(); else draw();
    return root;
  });

  /* ============================================================= ACHIEVEMENTS */
  route("achievements", (params, me) => {
    const all = api.achievements();
    const earned = me.progress.achievements;
    const board = api.leaderboard();
    const li = levelInfo(me.progress.xp);
    const content = `
      <div class="space-y-7">
        <div><h1 class="text-2xl font-extrabold">${t("ach_title")}</h1><p class="text-muted mt-1">${t("ach_opened")} ${earned.length} ${t("ach_of")} ${all.length} ${lang==="kk"?"жетістік":"достижений"}</p></div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger">
          ${all.map((a) => {
            const has = earned.includes(a.id);
            return `
              <div class="bg-surface rounded-2xl border ${has?"border-gold/40":"border-line"} p-4 text-center shadow-soft ${has?"":"opacity-60"}">
                <div class="w-14 h-14 rounded-2xl mx-auto grid place-items-center ${has?(a.color==="gold"?"bg-gold text-white":"bg-brand text-white"):"bg-canvas text-muted"} ${has?"anim-pop shadow-lift":""}">${has?icon(a.icon,"w-7 h-7"):icon("lock","w-6 h-6")}</div>
                <div class="font-bold mt-3 text-sm">${esc(a.title)}</div>
                <div class="text-xs text-muted mt-0.5">${esc(a.desc)}</div>
              </div>`;
          }).join("")}
        </div>

        <div>
          <h2 class="text-lg font-extrabold mb-3">${t("ach_rating")}</h2>
          <div class="bg-surface rounded-2xl border border-line shadow-soft overflow-hidden">
            ${board.map((r, i) => {
              const isMe = r.name === me.name;
              const medal = ["bg-gold text-white","bg-line text-ink","bg-gold-soft text-gold"][i] || "bg-canvas text-muted";
              return `
                <div class="flex items-center gap-3 px-4 py-3 ${i?"border-t border-line":""} ${isMe?"bg-brand-soft":""}">
                  <div class="w-8 h-8 rounded-lg grid place-items-center font-bold text-sm ${medal}">${i+1}</div>
                  <div class="flex-1 font-semibold">${esc(r.name)} ${isMe?'<span class="text-brand text-xs font-bold">· вы</span>':""}</div>
                  <span class="text-gold font-bold flex items-center gap-1 text-sm">${icon("flame","w-4 h-4")}${r.streak}</span>
                  <span class="text-brand font-bold flex items-center gap-1 text-sm w-20 justify-end">${icon("bolt","w-4 h-4")}${r.xp}</span>
                </div>`;
            }).join("")}
          </div>
        </div>
      </div>`;
    return shell("achievements", content);
  });

  /* ============================================================= PROFILE */
  route("profile", (params, me) => {
    const li = levelInfo(me.progress.xp);
    const into = li.into, need = li.need;
    const ring = Math.round((into / need) * 360);
    const goal = GOALS.find((g) => g.id === (me.profile && me.profile.goal));
    const placement = me.profile && me.profile.placement;
    const lvlInfo = SEED.levels.find((l) => l.id === placement);
    const totalLessons = api.lessons().length, totalQuizzes = api.quizzes().length;
    const stats = [
      { icon: "bolt", label: "Опыт (XP)", value: me.progress.xp, color: "text-brand" },
      { icon: "flame", label: "Серия дней", value: me.progress.streak, color: "text-gold" },
      { icon: "book", label: "Уроков пройдено", value: `${me.progress.lessonsDone.length}/${totalLessons}`, color: "text-ok" },
      { icon: "quiz", label: "Квизов пройдено", value: `${me.progress.quizzesDone.length}/${totalQuizzes}`, color: "text-accent" },
    ];
    const content = `
      <div class="space-y-6">
        <div class="relative overflow-hidden rounded-xl2 grad-bg p-7 sm:p-9 text-white shadow-glow ornament">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
            <div class="relative shrink-0 mx-auto sm:mx-0">
              <div class="w-24 h-24 rounded-full grid place-items-center"
                style="background:conic-gradient(#fff ${ring}deg, rgba(255,255,255,.25) ${ring}deg); padding:4px;">
                <div class="w-full h-full rounded-full bg-white/15 backdrop-blur grid place-items-center text-3xl font-extrabold">${esc(me.name[0] || "U")}</div>
              </div>
              <div class="absolute -bottom-1 -right-1 bg-gold text-white text-xs font-extrabold w-8 h-8 rounded-full grid place-items-center shadow-lift">${li.level}</div>
            </div>
            <div class="flex-1 text-center sm:text-left">
              <div class="flex items-center justify-center sm:justify-start gap-2">
                <h1 class="text-2xl font-extrabold">${esc(me.name)}</h1>
                <button id="editname" class="text-white/70 hover:text-white transition" title="Изменить имя">${icon("edit","w-4 h-4")}</button>
              </div>
              <p class="text-white/70 text-sm mt-1">${esc(me.email)}</p>
              <div class="flex flex-wrap gap-2 justify-center sm:justify-start mt-3">
                ${goal ? `<span class="px-3 py-1 rounded-full bg-white/15 text-xs font-bold flex items-center gap-1.5">${icon(goal.icon,"w-4 h-4")}${goal.title}</span>` : ""}
                ${lvlInfo ? `<span class="px-3 py-1 rounded-full bg-white/15 text-xs font-bold">Стартовый уровень: ${lvlInfo.id}</span>` : ""}
                <span class="px-3 py-1 rounded-full bg-white/15 text-xs font-bold">Ур. ${li.level} · ${into}/${need} XP до след.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger">
          ${stats.map((s) => `
            <div class="bg-surface rounded-2xl border border-line shadow-soft p-4 text-center">
              <div class="w-10 h-10 rounded-xl bg-canvas grid place-items-center mx-auto ${s.color}">${icon(s.icon,"w-5 h-5")}</div>
              <div class="font-extrabold text-xl mt-2">${s.value}</div>
              <div class="text-xs text-muted mt-0.5">${s.label}</div>
            </div>`).join("")}
        </div>

        <div class="bg-surface rounded-2xl border border-line shadow-soft p-5 sm:p-6">
          <h2 class="font-extrabold mb-4">${t("profile_goal")}</h2>
          <div class="grid sm:grid-cols-3 gap-3">
            ${GOALS.map((g) => {
              const active = goal && goal.id === g.id;
              return `
                <button data-setgoal="${g.id}" class="flex items-center gap-3 p-3.5 rounded-2xl border-2 ${active?"border-brand bg-brand-soft":"border-line hover:border-brand/40"} transition text-left">
                  <div class="w-10 h-10 rounded-xl ${active?"grad-bg text-white":"bg-canvas text-muted"} grid place-items-center shrink-0">${icon(g.icon,"w-5 h-5")}</div>
                  <div class="min-w-0"><div class="font-bold text-sm">${g.title}</div><div class="text-xs text-muted truncate">${g.sub}</div></div>
                </button>`;
            }).join("")}
          </div>
        </div>

        <div class="bg-surface rounded-2xl border border-line shadow-soft p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-between">
          <div>
            <h2 class="font-extrabold">${t("profile_retest_t")}</h2>
            <p class="text-sm text-muted mt-1">${t("profile_retest_d")}</p>
          </div>
          <button id="retest" class="rounded-xl bg-canvas font-bold px-5 py-3 text-ink hover:bg-line transition shrink-0">${t("profile_retest_btn")}</button>
        </div>

        <div class="bg-surface rounded-2xl border border-bad/30 shadow-soft p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-between">
          <div>
            <h2 class="font-extrabold text-bad">${t("profile_logout_t")}</h2>
            <p class="text-sm text-muted mt-1">${t("profile_logout_d")}</p>
          </div>
          <button data-action="logout" class="rounded-xl bg-bad text-white font-bold px-5 py-3 hover:opacity-90 transition shrink-0">${t("logout")}</button>
        </div>
      </div>`;
    const node = shell("profile", content);

    $("#editname", node).addEventListener("click", () => {
      const name = prompt("Новое имя:", me.name);
      if (name && name.trim()) { api.saveProgress({}); me.name = name.trim(); writeDB(DB); toast("Имя обновлено", "ok"); render(); }
    });
    $$("[data-setgoal]", node).forEach((b) => b.addEventListener("click", () => {
      api.saveProfile({ goal: b.dataset.setgoal, placement: placement || "A0" });
      toast("Цель обновлена", "ok"); render();
    }));
    $("#retest", node).addEventListener("click", () => {
      if (confirm("Пройти тест на уровень заново?")) { api.saveProfile(null); navigate("/onboarding"); }
    });
    return node;
  });

  /* ============================================================= ADMIN SHELL */
  const ADMIN_NAV = [
    { to: "/admin", icon: "gauge", label: "Обзор" },
    { to: "/admin-users", icon: "users", label: "Пользователи" },
    { to: "/admin-content", icon: "book", label: "Контент" },
  ];
  function adminActive(to, current) {
    if (to === "/admin") return current === "admin";
    return ("/" + current) === to;
  }
  function adminShell(current, content) {
    const me = api.me();
    const wrap = document.createElement("div");
    wrap.className = "min-h-screen lg:flex";
    wrap.innerHTML = `
      <aside class="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 border-r border-line bg-ink text-white">
        <div class="px-6 py-6 flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gold text-ink grid place-items-center font-extrabold">Q</div>
          <div><div class="font-extrabold text-lg leading-none">KazLine</div><div class="text-xs text-white/50 mt-1">Админ-панель</div></div>
        </div>
        <nav class="px-3 flex-1 space-y-1">
          ${ADMIN_NAV.map((n) => `<a href="#${n.to}" class="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${adminActive(n.to,current)?"bg-white/10 text-white":"text-white/60 hover:bg-white/5 hover:text-white"}">${icon(n.icon,"w-5 h-5")}<span>${n.label}</span></a>`).join("")}
          <a href="#/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-white/60 hover:bg-white/5 hover:text-white transition">${icon("home","w-5 h-5")}<span>Витрина ученика</span></a>
        </nav>
        <div class="p-3"><div class="rounded-2xl bg-white/5 p-3 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gold text-ink grid place-items-center font-bold">${esc(me.name[0])}</div>
          <div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">${esc(me.name)}</div><div class="text-xs text-white/50">Администратор</div></div>
          <button data-action="logout" class="text-white/60 hover:text-bad transition">${icon("logout","w-5 h-5")}</button>
        </div></div>
      </aside>
      <header class="lg:hidden sticky top-0 z-30 bg-ink text-white px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2"><div class="w-8 h-8 rounded-xl bg-gold text-ink grid place-items-center font-extrabold text-sm">Q</div><span class="font-extrabold">Админ</span></div>
        <div class="flex items-center gap-3 text-sm">
          ${ADMIN_NAV.map((n) => `<a href="#${n.to}" class="${adminActive(n.to,current)?"text-gold":"text-white/60"}">${n.label}</a>`).join("")}
          <button data-action="logout" class="text-white/60">${icon("logout","w-5 h-5")}</button>
        </div>
      </header>
      <div class="flex-1 lg:pl-72 min-h-screen">
        <main class="px-4 sm:px-6 lg:px-10 py-6 max-w-6xl w-full mx-auto">${content}</main>
      </div>`;
    setTimeout(() => $$('[data-action="logout"]', wrap).forEach((b) => b.addEventListener("click", () => { api.logout(); navigate("/auth"); })), 0);
    return wrap;
  }

  /* ============================================================= ADMIN OVERVIEW */
  route("admin", () => {
    const s = api.stats();
    const board = api.leaderboard().slice(0, 5);
    const recent = api.allUsers().slice().sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
    const stat = (ic, val, label, color) => `
      <div class="bg-surface rounded-2xl border border-line p-5 shadow-soft">
        <div class="flex items-center justify-between"><div class="w-10 h-10 rounded-xl ${color} grid place-items-center">${icon(ic,"w-5 h-5")}</div></div>
        <div class="text-3xl font-extrabold mt-3">${val}</div><div class="text-sm text-muted">${label}</div>
      </div>`;
    const content = `
      <div class="space-y-6">
        <div><h1 class="text-2xl font-extrabold">Обзор платформы</h1><p class="text-muted mt-1">Ключевые метрики KazLine</p></div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
          ${stat("users", s.students, "учеников", "bg-brand-soft text-brand")}
          ${stat("bolt", s.totalXp, "всего XP", "bg-gold-soft text-gold")}
          ${stat("book", s.lessons, "уроков", "bg-brand-soft text-brand")}
          ${stat("quiz", s.quizzes, "квизов", "bg-gold-soft text-gold")}
          ${stat("chart", s.avgXp, "средний XP", "bg-brand-soft text-brand")}
          ${stat("check", s.lessonsDone, "уроков пройдено", "bg-brand-soft text-brand")}
          ${stat("trophy", s.users, "всего аккаунтов", "bg-gold-soft text-gold")}
          ${stat("flame", board[0]?.streak || 0, "макс. серия", "bg-gold-soft text-gold")}
        </div>
        <div class="grid lg:grid-cols-2 gap-4">
          <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
            <h2 class="font-extrabold mb-3">Топ учеников</h2>
            ${board.map((r, i) => `<div class="flex items-center gap-3 py-2 ${i?"border-t border-line":""}"><div class="w-7 h-7 rounded-lg grid place-items-center font-bold text-sm ${i===0?"bg-gold text-white":"bg-canvas text-muted"}">${i+1}</div><span class="flex-1 font-semibold">${esc(r.name)}</span><span class="text-brand font-bold text-sm">${r.xp} XP</span></div>`).join("")}
          </div>
          <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
            <h2 class="font-extrabold mb-3">Новые пользователи</h2>
            ${recent.map((u, i) => `<div class="flex items-center gap-3 py-2 ${i?"border-t border-line":""}"><div class="w-8 h-8 rounded-lg bg-brand-soft text-brand grid place-items-center font-bold text-sm">${esc(u.name[0])}</div><div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">${esc(u.name)}</div><div class="text-xs text-muted truncate">${esc(u.email)}</div></div><span class="text-xs px-2 py-1 rounded-lg ${u.role==="admin"?"bg-gold-soft text-gold":"bg-canvas text-muted"} font-semibold">${u.role==="admin"?"админ":"ученик"}</span></div>`).join("")}
          </div>
        </div>
      </div>`;
    return adminShell("admin", content);
  });

  /* ============================================================= ADMIN USERS */
  route("admin-users", () => {
    const node = adminShell("admin-users", `<div id="uwrap"></div>`);
    const paint = () => {
      const users = api.allUsers();
      $("#uwrap", node).innerHTML = `
        <div class="space-y-5">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div><h1 class="text-2xl font-extrabold">Пользователи</h1><p class="text-muted mt-1">${users.length} аккаунтов</p></div>
            <button data-action="reset" class="text-sm font-semibold text-muted hover:text-bad transition flex items-center gap-1.5">${icon("trash","w-4 h-4")} Сбросить демо-данные</button>
          </div>
          <div class="bg-surface rounded-2xl border border-line shadow-soft overflow-hidden">
            <div class="hidden sm:grid grid-cols-12 gap-3 px-4 py-3 bg-canvas text-xs font-bold text-muted uppercase tracking-wide">
              <div class="col-span-4">Пользователь</div><div class="col-span-3">Роль</div><div class="col-span-2">XP</div><div class="col-span-1">Серия</div><div class="col-span-2 text-right">Действия</div>
            </div>
            ${users.map((u) => `
              <div class="grid grid-cols-2 sm:grid-cols-12 gap-3 items-center px-4 py-3 border-t border-line">
                <div class="col-span-2 sm:col-span-4 flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl ${u.role==="admin"?"bg-gold text-white":"bg-brand-soft text-brand"} grid place-items-center font-bold">${esc(u.name[0]||"U")}</div>
                  <div class="min-w-0"><div class="font-semibold text-sm truncate">${esc(u.name)}</div><div class="text-xs text-muted truncate">${esc(u.email)}</div></div>
                </div>
                <div class="sm:col-span-3">
                  <select data-role="${u.id}" class="rounded-lg border border-line bg-surface px-2 py-1.5 text-sm font-semibold outline-none focus:border-brand">
                    <option value="student" ${u.role==="student"?"selected":""}>Ученик</option>
                    <option value="admin" ${u.role==="admin"?"selected":""}>Админ</option>
                  </select>
                </div>
                <div class="sm:col-span-2 text-brand font-bold text-sm">${u.progress.xp} XP</div>
                <div class="sm:col-span-1 text-gold font-bold text-sm">${u.progress.streak}🔥</div>
                <div class="col-span-2 sm:col-span-2 flex justify-end">
                  <button data-del="${u.id}" class="text-muted hover:text-bad transition p-2" title="Удалить">${icon("trash","w-4 h-4")}</button>
                </div>
              </div>`).join("")}
          </div>
        </div>`;
      $$("[data-role]", node).forEach((s) => s.addEventListener("change", () => { api.setRole(s.dataset.role, s.value); toast("Роль обновлена", "ok"); }));
      $$("[data-del]", node).forEach((b) => b.addEventListener("click", () => {
        const u = api.allUsers().find((x) => x.id === b.dataset.del);
        if (u && u.id === api.me().id) return toast("Нельзя удалить себя", "bad");
        if (confirm(`Удалить ${u.name}?`)) { api.deleteUser(b.dataset.del); toast("Удалён", "ok"); paint(); }
      }));
      $('[data-action="reset"]', node).addEventListener("click", () => { if (confirm("Сбросить все данные к демо-состоянию?")) { api.resetAll(); toast("Данные сброшены", "ok"); navigate("/auth"); } });
    };
    paint();
    return node;
  });

  /* ============================================================= ADMIN CONTENT */
  route("admin-content", () => {
    const node = adminShell("admin-content", `<div id="cwrap"></div>`);
    const paint = () => {
      const lessons = api.lessons(), quizzes = api.quizzes();
      $("#cwrap", node).innerHTML = `
        <div class="space-y-7">
          <div><h1 class="text-2xl font-extrabold">Контент</h1><p class="text-muted mt-1">Управление уроками и квизами</p></div>

          <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
            <div class="flex items-center justify-between mb-4"><h2 class="font-extrabold">Уроки (${lessons.length})</h2></div>
            <form id="lform" class="grid sm:grid-cols-12 gap-2 mb-4">
              <select name="level" class="sm:col-span-2 rounded-lg border border-line bg-surface px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand">${SEED.levels.map((l) => `<option value="${l.id}">${l.id}</option>`).join("")}</select>
              <input name="title" required placeholder="Название (каз.)" class="sm:col-span-4 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <input name="sub" required placeholder="Перевод (рус.)" class="sm:col-span-3 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <input name="xp" type="number" value="40" class="sm:col-span-1 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <button class="sm:col-span-2 rounded-lg bg-brand text-white font-bold text-sm py-2.5 flex items-center justify-center gap-1.5 hover:bg-brand-dark transition">${icon("plus","w-4 h-4")} Добавить</button>
            </form>
            <div class="space-y-2">
              ${lessons.map((l) => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-canvas">
                  <span class="px-2 py-0.5 rounded-md bg-brand-soft text-brand font-bold text-xs">${l.level}</span>
                  <div class="w-8 h-8 rounded-lg bg-surface border border-line grid place-items-center text-brand">${icon(l.icon||"book","w-4 h-4")}</div>
                  <div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">${esc(l.title)}</div><div class="text-xs text-muted truncate">${esc(l.sub)}</div></div>
                  <span class="text-gold font-bold text-sm">${l.xp} XP</span>
                  <button data-del-lesson="${l.id}" class="text-muted hover:text-bad transition p-1.5">${icon("trash","w-4 h-4")}</button>
                </div>`).join("")}
            </div>
          </div>

          <div class="bg-surface rounded-2xl border border-line shadow-soft p-5">
            <div class="flex items-center justify-between mb-4"><h2 class="font-extrabold">Квизы (${quizzes.length})</h2></div>
            <form id="qform" class="grid sm:grid-cols-12 gap-2 mb-4">
              <input name="title" required placeholder="Название квиза" class="sm:col-span-5 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <input name="sub" required placeholder="Описание" class="sm:col-span-3 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <input name="xp" type="number" value="50" class="sm:col-span-2 rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"/>
              <button class="sm:col-span-2 rounded-lg bg-brand text-white font-bold text-sm py-2.5 flex items-center justify-center gap-1.5 hover:bg-brand-dark transition">${icon("plus","w-4 h-4")} Добавить</button>
            </form>
            <div class="space-y-2">
              ${quizzes.map((q) => `
                <div class="flex items-center gap-3 p-3 rounded-xl bg-canvas">
                  <div class="w-8 h-8 rounded-lg bg-surface border border-line grid place-items-center text-brand">${icon(q.icon||"quiz","w-4 h-4")}</div>
                  <div class="flex-1 min-w-0"><div class="font-semibold text-sm truncate">${esc(q.title)}</div><div class="text-xs text-muted truncate">${esc(q.sub)} · ${q.questions.length} вопр.</div></div>
                  <span class="text-gold font-bold text-sm">${q.xp} XP</span>
                  <button data-del-quiz="${q.id}" class="text-muted hover:text-bad transition p-1.5">${icon("trash","w-4 h-4")}</button>
                </div>`).join("")}
            </div>
          </div>
        </div>`;

      $("#lform", node).addEventListener("submit", (e) => { e.preventDefault(); const fd = new FormData(e.target); api.addLesson({ level: fd.get("level"), title: fd.get("title"), sub: fd.get("sub"), icon: "book", xp: +fd.get("xp") }); toast("Урок добавлен", "ok"); paint(); });
      $("#qform", node).addEventListener("submit", (e) => { e.preventDefault(); const fd = new FormData(e.target); api.addQuiz({ title: fd.get("title"), sub: fd.get("sub"), icon: "quiz", xp: +fd.get("xp") }); toast("Квиз добавлен", "ok"); paint(); });
      $$("[data-del-lesson]", node).forEach((b) => b.addEventListener("click", () => { api.deleteLesson(b.dataset.delLesson); toast("Урок удалён", "ok"); paint(); }));
      $$("[data-del-quiz]", node).forEach((b) => b.addEventListener("click", () => { api.deleteQuiz(b.dataset.delQuiz); toast("Квиз удалён", "ok"); paint(); }));
    };
    paint();
    return node;
  });

  /* ============================================================= INIT */
  if (!location.hash) location.hash = "#/";
  render();

})();
