export type Lang = "en" | "he";

export type Copy = {
  nav: string;
  other: { label: string; href: string };
  scroll: string;
  landing: [string, string];
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
  who: { eyebrow: string; head: string; body: string; steps: [string, string][]; sample: string };
  close: { eyebrow: string; head: string; body: string; button: string };
  foot: { built: string; privacy: string; remove: string; contact: string };
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: "Talk to me",
    other: { label: "עברית", href: "/he" },
    scroll: "Scroll",
    landing: ["You already did the hard part.", "Let's build the rest."],
    gap: {
      head: "Your business is open. Online, it still says “opening soon.”",
      beats: [
        "People look for you on a phone before they find your door.",
        "They decide in seconds. The first look is all you get.",
        "And when they do write to you, it's eleven at night and nobody answers.",
      ],
    },
    face: {
      head: "First, we make it look like what it really is.",
      items: [
        "A name people remember after hearing it once.",
        "A website that does the selling for you.",
        "An app that keeps you in your customer's pocket.",
        "A short film that says about you what you'd never say yourself.",
      ],
    },
    lights: {
      head: "Then we switch the lights on.",
      sub: "Behind the new face, a business that answers, remembers and does the dull work by itself.",
      items: [
        "Every customer gets an answer. At eleven at night too.",
        "It knows what you know: prices, stock, who ordered what.",
        "Invoices, reminders, follow-ups. Done before you ask.",
      ],
      ai: "Yes, it's AI. You won't need to care how. Here's one night.",
    },
    day: {
      kicker: "That was one night. This is every day after.",
      next: "Everything you just watched is made of seven blocks. Here they are, side by side.",
      lens: "Move your mouse. See what's underneath.",
      morning: { title: "Morning. Three orders came in overnight.", orders: ["New order · pickup at 9:00", "New order · delivery", "New order · pickup at 10:30"] },
      noon: { title: "A customer asks about her delivery. Answered in a minute. Not by you.", ask: "Where's my order?", reply: "On its way. About 15 minutes." },
      supply: { title: "The supplier order went out on its own.", note: "Running low · order sent to supplier" },
      night: { title: "You're home. The business is still answering.", time: "23:04", ask: "Are you open tomorrow?", reply: "From 7:00. Want me to set something aside for you?" },
      brain: { head: "Under every window, one brain.", body: "Orders, answers, stock and invoices, all connected. That's what we build." },
      close: "You're still the heart of it. You're just not the whole staff anymore.",
    },
    who: {
      eyebrow: "Who builds all this",
      head: "One studio. One person.",
      steps: [
        ["You write to me", "A few lines about your business are enough."],
        ["I answer with a plan", "What I'd build first, and what I'd leave out."],
        ["I build it and switch it on", "And I stay around after opening day."],
      ],
      body: "I'm Pini. I design it, build it and switch it on myself. You talk to me from the first message to opening day, and after.",
      sample: "There's no wall of client logos here yet. The site you're scrolling is the sample.",
    },
    close: {
      eyebrow: "Your street, your shop, your turn",
      head: "Tell me about your business.",
      body: "A short message is enough. I'll tell you honestly what I'd build first, and what I wouldn't.",
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
      sample: "עדיין אין כאן קיר של לוגואים. האתר שאתם גוללים בו עכשיו הוא הדוגמה.",
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
