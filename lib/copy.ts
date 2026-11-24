export type Lang = "en" | "he";

export type Copy = {
  nav: string;
  other: { label: string; href: string };
  scroll: string;
  landing: [string, string, string?];
  gap: { head: string; beats: string[] };
  face: { head: string; items: string[] };
  lights: { head: string; sub: string; items: string[]; ai: string };
  day: {
    kicker: string;
    next: string;
    lens: string;
    morning: { title: string; orders: string[] };
    noon: { title: string; ask: string; reply: string };
    supply: { title: string; note: string };
    night: { title: string; time: string; ask: string; reply: string };
    brain: { head: string; body: string };
    close: string;
  };
  who: { eyebrow: string; head: string; body: string; steps: [string, string][] };
  clients: { eyebrow: string; head: string; body: string; next: string; nextBody: string; concept: string; yours: string; write: string };
  close: { eyebrow: string; head: string; body: string; button: string };
  foot: { built: string; privacy: string; remove: string; contact: string };
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: "Talk to me",
    other: { label: "עברית", href: "/he" },
    scroll: "Scroll",
    landing: [
      "Your business is open.",
      "Online, it still says “opening soon.”",
      "I'm Pini. I build websites, apps and AI assistants for small businesses. Scroll to see what changes.",
    ],
    gap: {
      head: "Right now, this is how you look from a phone.",
      beats: [
        "Before anyone walks through your door, they look you up.",
        "They find an old page, a few photos, or nothing. So they choose the place that looked ready.",
        "And when someone does write to you, it's eleven at night. By the time you answer, they've bought somewhere else.",
      ],
    },
    face: {
      head: "First, I make your business look as good as it is.",
      items: [
        "A name and a look people remember.",
        "A website that shows what you do and takes the order.",
        "An app with your name on it, on your customers' phones.",
        "A short film that shows your work better than you'd ever describe it.",
      ],
    },
    lights: {
      head: "Then I switch the lights on.",
      sub: "Behind the new look sits an AI assistant that knows your business. It works the hours you can't.",
      items: [
        "It answers every customer in seconds. At eleven at night too.",
        "It knows your prices, your stock and who ordered what.",
        "It sends the invoices, the reminders and the supplier order. You don't have to ask.",
      ],
      ai: "You don't need to understand AI to use it. Here is one night at a made-up shop.",
    },
    day: {
      kicker: "That was one night. This is every day after.",
      next: "Everything you just watched is made of seven pieces. You can start with one.",
      lens: "Move your mouse. See what's underneath.",
      morning: { title: "You open up. Three orders came in while you slept.", orders: ["New order · pickup at 9:00", "New order · delivery", "New order · pickup at 10:30"] },
      noon: { title: "A customer asks where her delivery is. She has her answer in a minute. You kept working.", ask: "Where's my order?", reply: "On its way. About 15 minutes." },
      supply: { title: "Stock is running low. The order to the supplier has already gone out.", note: "Running low · order sent to supplier" },
      night: { title: "You're home for dinner. The shop is still answering.", time: "23:04", ask: "Are you open tomorrow?", reply: "From 7:00. Want me to set something aside for you?" },
      brain: { head: "Under every window, one brain.", body: "Orders, answers, stock and invoices, all connected to each other. That is what I build." },
      close: "You're still the heart of it. You're just not the whole staff anymore.",
    },
    who: {
      eyebrow: "Who builds all this",
      head: "One studio. One person.",
      steps: [
        ["You write to me", "Three lines about your business are enough."],
        ["I answer with a plan", "What I'd build first, and what I'd leave out."],
        ["I build it and switch it on", "And I'm still here after opening day."],
      ],
      body: "I'm Pini. I design, build and run all of this myself. The person you explain your business to is the person who builds it.",
    },
    clients: {
      eyebrow: "Not made up",
      head: "Real businesses. Lights on.",
      body: "Some of the businesses I build for. Pick one.",
      next: "Next on the street",
      nextBody: "Ideas I'd love to build. Not customers. Not yet.",
      concept: "Concept, not a customer",
      yours: "Your sign here",
      write: "Message Pini",
    },
    close: {
      eyebrow: "Your turn",
      head: "Tell me about your business.",
      body: "Three lines are enough: what you do, and what eats your time. I'll tell you honestly what I'd build first, and what I wouldn't bother with.",
      button: "Message Pini",
    },
    foot: { built: "Built by", privacy: "Privacy policy", remove: "Delete my data", contact: "Contact" },
  },
  he: {
    nav: "דברו איתי",
    other: { label: "English", href: "/" },
    scroll: "גללו",
    landing: ["את החלק הקשה כבר עשיתם.", "את השאר נבנה יחד."],
    gap: {
      head: "העסק שלכם כבר פתוח. ברשת עדיין כתוב ״נפתח בקרוב״.",
      beats: ["עוד לפני שמגיעים אליכם לדלת, מחפשים אתכם בטלפון.", "מחליטים תוך שניות. יש לכם רק רושם ראשוני אחד.", "וכשכבר כותבים לכם, השעה מאוחרת ואין מי שיענה."],
    },
    face: {
      head: "קודם כול, שהעסק ייראה כמו מה שהוא באמת.",
      items: ["שם שזוכרים כבר מהפעם הראשונה.", "אתר שמוכר בשבילכם.", "אפליקציה שמשאירה אתכם בכיס של הלקוחות.", "סרט קצר שאומר עליכם את מה שלא נעים לכם להגיד על עצמכם."],
    },
    lights: {
      head: "ואז מדליקים את האור.",
      sub: "מאחורי המראה החדש יש עסק שעונה, זוכר ועושה לבד את העבודה השחורה.",
      items: ["כל לקוח מקבל תשובה. גם באמצע הלילה.", "הוא יודע כל מה שאתם יודעים: מחירים, מלאי, מי הזמין מה.", "חשבוניות, תזכורות, חזרה ללקוחות. הכול קורה עוד לפני שביקשתם."],
      ai: "כן, זו בינה מלאכותית. אתם לא צריכים להבין איך היא עובדת. הנה לילה אחד.",
    },
    day: {
      kicker: "זה היה לילה אחד. וכך נראה כל יום אחריו.",
      next: "כל מה שראיתם עכשיו בנוי משבע אבני בניין. הנה כולן, אחת ליד השנייה.",
      lens: "הזיזו את העכבר ותראו מה קורה מתחת.",
      morning: { title: "בוקר. בלילה נכנסו שלוש הזמנות.", orders: ["הזמנה חדשה · איסוף ב־9:00", "הזמנה חדשה · משלוח", "הזמנה חדשה · איסוף ב־10:30"] },
      noon: { title: "לקוחה שואלת איפה המשלוח. תוך דקה היא מקבלת תשובה. לא מכם.", ask: "איפה ההזמנה שלי?", reply: "בדרך אלייך. עוד רבע שעה בערך." },
      supply: { title: "ההזמנה לספק יצאה מעצמה.", note: "המלאי עומד להיגמר · נשלחה הזמנה לספק" },
      night: { title: "אתם כבר בבית. העסק ממשיך לענות.", time: "23:04", ask: "אתם פתוחים מחר?", reply: "כן, מ־7:00. לשמור לך משהו בצד?" },
      brain: { head: "מתחת לכל חלון, מוח אחד.", body: "הזמנות, תשובות, מלאי וחשבוניות. הכול מחובר. את זה אנחנו בונים." },
      close: "אתם עדיין הלב של העסק. פשוט כבר לא כל הצוות.",
    },
    who: {
      eyebrow: "מי בונה את כל זה",
      head: "סטודיו אחד. בן אדם אחד.",
      steps: [
        ["אתם כותבים לי", "כמה שורות על העסק מספיקות."],
        ["אני חוזר עם תוכנית", "מה הייתי בונה קודם, ועל מה הייתי מוותר."],
        ["אני בונה ומפעיל", "ונשאר איתכם גם אחרי יום ההשקה."],
      ],
      body: "אני פיני. אני מעצב, בונה ומפעיל הכול בעצמי. אתם מדברים איתי, מההודעה הראשונה ועד יום ההשקה, וגם אחריו.",
    },
    clients: {
      eyebrow: "כבר ברחוב",
      head: "עסקים אמיתיים. האור דולק.",
      body: "חלק מהעסקים שאני בונה בשבילם.",
      next: "הבאים ברחוב",
      nextBody: "רעיונות שהייתי שמח לבנות. לא לקוחות. עדיין לא.",
      concept: "קונספט, לא לקוח",
      yours: "השלט שלכם כאן",
      write: "כתבו לפיני",
    },
    close: {
      eyebrow: "עכשיו תורכם",
      head: "ספרו לי על העסק שלכם.",
      body: "מספיקה הודעה קצרה. אגיד לכם בכנות מה הייתי בונה קודם, ומה בכלל לא.",
      button: "כתבו לפיני",
    },
    foot: { built: "נבנה על ידי", privacy: "מדיניות פרטיות", remove: "מחיקת המידע שלי", contact: "יצירת קשר" },
  },
};
