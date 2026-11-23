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
    lens: string;
    morning: { title: string; orders: string[] };
    noon: { title: string; ask: string; reply: string };
    supply: { title: string; note: string };
    night: { title: string; time: string; ask: string; reply: string };
    brain: { head: string; body: string };
    close: string;
  };
  who: { head: string; body: string; sample: string };
  close: { head: string; body: string; button: string };
  foot: { built: string; privacy: string; remove: string; contact: string };
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: "Talk to me",
    other: { label: "עברית", href: "/he" },
    scroll: "Scroll",
    landing: ["You already did the hard part.", "Let's build the rest."],
    gap: {
      head: "Your business is good. It just doesn't show yet.",
      beats: [
        "People look for you on a phone before they ever reach your door.",
        "That's where they decide. In seconds.",
        "And when they finally write to you, it's eleven at night and nobody answers.",
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
      ai: "Yes, it's AI. You won't need to care how.",
    },
    day: {
      lens: "Move your mouse. See what's underneath.",
      morning: { title: "Morning. Three orders came in overnight.", orders: ["New order · pickup at 9:00", "New order · delivery", "New order · pickup at 10:30"] },
      noon: { title: "A customer asks about her delivery. Answered in a minute. Not by you.", ask: "Where's my order?", reply: "On its way. About 15 minutes." },
      supply: { title: "The supplier order went out on its own.", note: "Running low · order sent to supplier" },
      night: { title: "You're home. The business is still answering.", time: "23:04", ask: "Are you open tomorrow?", reply: "From 7:00. Want me to set something aside for you?" },
      brain: { head: "Under every window, one brain.", body: "Orders, answers, stock and invoices, all connected. That's what we build." },
      close: "You're still the heart of it. You're just not the whole staff anymore.",
    },
    who: {
      head: "One studio. One person.",
      body: "I'm Pini. I design it, build it and switch it on myself. You talk to me from the first message to opening day, and after.",
      sample: "There's no wall of client logos here yet. The site you're scrolling is the sample.",
    },
    close: {
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
    landing: ["את החלק הקשה כבר עשיתם.", "עכשיו נבנה את השאר."],
    gap: {
      head: "העסק שלכם טוב. רק שעוד לא רואים את זה.",
      beats: ["לפני שנכנסים אליכם בדלת, מחפשים אתכם בטלפון.", "שם מחליטים. תוך שניות.", "וכשסוף־סוף כותבים לכם, השעה אחת־עשרה בלילה ואין מי שיענה."],
    },
    face: {
      head: "קודם כול, שייראה כמו מה שהוא באמת.",
      items: ["שם שזוכרים אחרי פעם אחת.", "אתר שמוכר במקומכם.", "אפליקציה שמשאירה אתכם בכיס של הלקוח.", "סרט קצר שאומר עליכם את מה שלא נעים לכם להגיד לבד."],
    },
    lights: {
      head: "ואז מדליקים את האור.",
      sub: "מאחורי הפנים החדשות, עסק שעונה, זוכר ועושה לבד את העבודה המשעממת.",
      items: ["כל לקוח מקבל תשובה. גם באחת־עשרה בלילה.", "הוא יודע מה שאתם יודעים: מחירים, מלאי, מי הזמין מה.", "חשבוניות, תזכורות, מעקבים. נעשה לפני שביקשתם."],
      ai: "כן, זו בינה מלאכותית. לא תצטרכו להבין איך.",
    },
    day: {
      lens: "הזיזו את העכבר. תראו מה מתחת.",
      morning: { title: "בוקר. שלוש הזמנות נכנסו בלילה.", orders: ["הזמנה חדשה · איסוף ב־9:00", "הזמנה חדשה · משלוח", "הזמנה חדשה · איסוף ב־10:30"] },
      noon: { title: "לקוחה שואלת על המשלוח. קיבלה תשובה תוך דקה. לא מכם.", ask: "איפה ההזמנה שלי?", reply: "בדרך אליך. בערך רבע שעה." },
      supply: { title: "ההזמנה לספק יצאה לבד.", note: "המלאי עומד להיגמר · ההזמנה נשלחה לספק" },
      night: { title: "אתם בבית. העסק עדיין עונה.", time: "23:04", ask: "אתם פתוחים מחר?", reply: "מ־7:00. לשמור לך משהו בצד?" },
      brain: { head: "מתחת לכל חלון, מוח אחד.", body: "הזמנות, תשובות, מלאי וחשבוניות, הכול מחובר. את זה אנחנו בונים." },
      close: "אתם עדיין הלב של העסק. רק כבר לא כל הצוות.",
    },
    who: {
      head: "סטודיו אחד. בן אדם אחד.",
      body: "אני פיני. אני מעצב, בונה ומדליק את הכול בעצמי. מדברים איתי מההודעה הראשונה ועד יום הפתיחה, וגם אחריו.",
      sample: "עוד אין כאן קיר של לוגואים. האתר שאתם גוללים בו הוא הדוגמה.",
    },
    close: {
      head: "ספרו לי על העסק שלכם.",
      body: "מספיקה הודעה קצרה. אגיד לכם בכנות מה הייתי בונה קודם, ומה לא.",
      button: "כתבו לפיני",
    },
    foot: { built: "נבנה על ידי", privacy: "מדיניות פרטיות", remove: "מחיקת המידע שלי", contact: "יצירת קשר" },
  },
};
