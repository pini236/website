import type { Lang } from "./copy";

export const BLOCKS = ["brand", "web", "app", "film", "agent", "mind", "flow"] as const;
export type BlockId = (typeof BLOCKS)[number];

export type Story = {
  name: string;
  trade: string;
  ask: string;
  gone: string;
  lost: string;
  steps: [string, string][];
  reply: string;
  confirm: string;
  done: string;
  site: { headline: string; cta: string; links: string[] };
  ticket: [string, string];
  morning: [string, string][];
};

export type StoryCopy = {
  story: Story;
  c: {
    day: string;
    hook: string;
    hookAccent: string;
    hint: string;
    nobody: string;
    everyNight: string;
    rewind: string;
    rewindSub: string;
    brainEyebrow: string;
    brain: string;
    brainSub: string;
    trace: string;
    faceEyebrow: string;
    face: string;
    faceSub: string;
    faceParts: [string, string, string];
    morning: string;
    morningSub: string;
    madeUp: string;
    now: string;
    ago: string;
    awake: string;
    skip: string;
    chapters: string[];
  };
  blocks: Record<BlockId, string>;
  rail: string;
  bp: {
    name: string;
    eyebrow: string;
    head: [string, string];
    lead: string;
    hint: string;
    say: Record<BlockId, string>;
    brand: { tag: string; fonts: [string, string] };
    video: string;
    web: { nav: string[]; kick: string; head: string; sub: string; book: string; menu: string; cards: [string, string][] };
    app: { hello: string; who: string; ticket: [string, string, string]; lines: string[] };
    agent: { status: string; q: string; a: string; q2: string; a2: string };
    mind: { docs: string[]; asked: string; q: string; a: string };
    flow: { kick: string; steps: string[]; log: string[] };
  };
};

export const STORY: Record<Lang, StoryCopy> = {
  en: {
    story: {
      name: "Paper Fox",
      trade: "Stationery shop",
      ask: "Do you have the A5 dot notebook in green? I need it by Thursday.",
      gone: "Ordered it somewhere else, thanks anyway.",
      lost: "By morning, they had bought it somewhere else.",
      steps: [
        ["Read the message", "A5 dot notebook, green, needed by Thursday"],
        ["Checked the stock", "Four left in green"],
        ["Checked delivery", "Ordered tonight, it arrives Wednesday"],
        ["Answered", "Four seconds after the message arrived"],
      ],
      reply: "Yes, four left in green! Order tonight and it arrives Wednesday. Want the link?",
      confirm: "Yes please.",
      done: "Here it is. I am holding one for you for the next hour.",
      site: { headline: "Paper worth writing on.", cta: "Shop notebooks", links: ["New in", "Notebooks", "Gift sets"] },
      ticket: ["Order placed · 23:49", "A5 dot notebook · green"],
      morning: [
        ["New order", "A5 dot notebook in green, paid at 23:49"],
        ["Stock updated", "Three left in green"],
        ["6 questions answered", "Nobody is waiting for a reply"],
      ],
    },
    c: {
      day: "Tuesday night",
      hook: "Your shop is closed.",
      hookAccent: "A customer just wrote to you.",
      hint: "Scroll to see how the night ends",
      nobody: "Nobody is there to answer.",
      everyNight: "It happens most nights. You never even hear about it.",
      rewind: "Run that night again.",
      rewindSub: "Same night. Same message. This time something is awake.",
      brainEyebrow: "Inside",
      brain: "The brain",
      brainSub: "An AI that knows your business answers in seconds, at any hour, and does the work behind the answer.",
      trace: "What happened behind the answer",
      faceEyebrow: "Outside",
      face: "The face",
      faceSub: "And this is where that customer found you. Designed for your business, not poured into a template.",
      faceParts: ["Website", "App", "Brand"],
      morning: "You slept. Your business didn't.",
      morningSub: "While you were asleep",
      madeUp: "A made-up night at a made-up shop, to show how it works.",
      now: "now",
      ago: "7h ago",
      awake: "AI assistant · awake",
      skip: "Skip the story",
      chapters: ["The night", "Again", "The brain", "The face", "Morning"],
    },
    blocks: { brand: "Brand", web: "Website", app: "App", film: "Film", agent: "Agent", mind: "Second brain", flow: "Workflows" },
    rail: "What your business is made of",
    bp: {
      name: "Paper Fox",
      eyebrow: "The whole plan",
      head: ["Seven blocks.", "One business."],
      lead: "Everything your customers see, and everything that works for you behind it. Built by one studio, so it fits together.",
      hint: "Move the light",
      say: {
        brand: "A name people remember",
        film: "A film that shows who you are",
        web: "A website that sells for you",
        app: "Your own app in their pocket",
        agent: "Answers every customer, day and night",
        mind: "Knows your whole business",
        flow: "Does the boring work by itself",
      },
      brand: { tag: "Stationery · est. 2026", fonts: ["Syne ExtraBold", "Instrument Sans"] },
      video: "Paper Fox · the film · 00:38",
      web: {
        nav: ["New in", "Notebooks", "Gift sets"],
        kick: "Free delivery over 200",
        head: "Paper worth writing on.",
        sub: "Notebooks, pens and small gifts, picked by people who write a lot.",
        book: "Shop notebooks",
        menu: "See the gift sets",
        cards: [
          ["A5 dot notebook", "Green, sewn binding"],
          ["Brush pen set", "Twelve soft colours"],
          ["Desk planner", "A week at a glance"],
        ],
      },
      app: { hello: "Good evening,", who: "Dana", ticket: ["Your order", "Arrives Wednesday", "A5 dot notebook · green"], lines: ["Track the delivery", "Add a gift note", "Reorder your favourites"] },
      agent: { status: "AI assistant · awake · 23:47", q: "Do you have the A5 dot notebook in green?", a: "Yes, four left! Order tonight and it arrives Wednesday.", q2: "Yes please.", a2: "Here is the link. I'm holding one for you." },
      mind: { docs: ["Catalog.pdf", "Suppliers.xlsx", "Orders", "Reviews", "Stock"], asked: "You asked", q: "What sold best in September?", a: "The A5 dot notebook, by far. Green runs out first." },
      flow: { kick: "Runs by itself · every order", steps: ["New order", "Check stock", "Order supplier", "Send invoice", "Remind customer"], log: ["23:49 order paid", "notebooks ×20 ordered", "invoice sent"] },
    },
  },
  he: {
    story: {
      name: "שועל נייר",
      trade: "חנות לכלי כתיבה",
      ask: "יש לכם מחברת A5 מנוקדת בירוק? אני צריכה אותה עד יום חמישי.",
      gone: "הזמנתי במקום אחר, תודה בכל זאת.",
      lost: "עד הבוקר, היא כבר קנתה במקום אחר.",
      steps: [
        ["קראתי את ההודעה", "מחברת A5 מנוקדת, ירוקה, עד יום חמישי"],
        ["בדקתי מלאי", "נשארו ארבע בירוק"],
        ["בדקתי משלוח", "מזמינים הלילה, מגיע ביום רביעי"],
        ["עניתי", "ארבע שניות אחרי שההודעה הגיעה"],
      ],
      reply: "כן, נשארו ארבע בירוק! מזמינים הלילה והיא אצלך ביום רביעי. לשלוח קישור?",
      confirm: "כן, בבקשה.",
      done: "הנה הקישור. שמרתי אחת בשבילך לשעה הקרובה.",
      site: { headline: "נייר ששווה לכתוב עליו.", cta: "למחברות", links: ["חדש", "מחברות", "מתנות"] },
      ticket: ["ההזמנה בוצעה · 23:49", "מחברת A5 מנוקדת · ירוק"],
      morning: [
        ["הזמנה חדשה", "מחברת A5 מנוקדת בירוק, שולם ב־23:49"],
        ["המלאי עודכן", "נשארו שלוש בירוק"],
        ["6 שאלות נענו", "אף אחד לא מחכה לתשובה"],
      ],
    },
    c: {
      day: "לילה של יום שלישי",
      hook: "החנות שלכם סגורה.",
      hookAccent: "לקוחה כתבה לכם הרגע.",
      hint: "גללו כדי לראות איך הלילה נגמר",
      nobody: "אין מי שיענה.",
      everyNight: "זה קורה כמעט כל לילה. אתם אפילו לא שומעים על זה.",
      rewind: "בואו נריץ את הלילה שוב.",
      rewindSub: "אותו לילה. אותה הודעה. הפעם משהו ער.",
      brainEyebrow: "מבפנים",
      brain: "המוח",
      brainSub: "בינה מלאכותית שמכירה את העסק עונה תוך שניות, בכל שעה, ועושה את העבודה שמאחורי התשובה.",
      trace: "מה קרה מאחורי התשובה",
      faceEyebrow: "מבחוץ",
      face: "הפנים",
      faceSub: "ושם הלקוחה מצאה אתכם. מעוצב לעסק שלכם, לא יצוק מתבנית.",
      faceParts: ["אתר", "אפליקציה", "מותג"],
      morning: "ישנתם. העסק לא.",
      morningSub: "בזמן שישנתם",
      madeUp: "לילה מומצא בחנות מומצאת, כדי להראות איך זה עובד.",
      now: "עכשיו",
      ago: "לפני 7 שעות",
      awake: "עוזרת AI · ערה",
      skip: "דלגו על הסיפור",
      chapters: ["הלילה", "שוב", "המוח", "הפנים", "בוקר"],
    },
    blocks: { brand: "מותג", web: "אתר", app: "אפליקציה", film: "סרט", agent: "סוכן", mind: "מוח שני", flow: "אוטומציות" },
    rail: "ממה העסק שלכם עשוי",
    bp: {
      name: "שועל נייר",
      eyebrow: "התוכנית המלאה",
      head: ["שבעה אבני בניין.", "עסק אחד."],
      lead: "כל מה שהלקוחות רואים, וכל מה שעובד בשבילכם מאחורי הקלעים. נבנה בסטודיו אחד, אז הכול מתחבר.",
      hint: "הזיזו את האור",
      say: {
        brand: "שם שזוכרים",
        film: "סרט שמראה מי אתם",
        web: "אתר שמוכר במקומכם",
        app: "אפליקציה משלכם בכיס",
        agent: "עונה לכל לקוח, יום ולילה",
        mind: "מכיר את כל העסק",
        flow: "עושה לבד את העבודה המשעממת",
      },
      brand: { tag: "כלי כתיבה · מאז 2026", fonts: ["Syne ExtraBold", "Instrument Sans"] },
      video: "שועל נייר · הסרט · 00:38",
      web: {
        nav: ["חדש", "מחברות", "מתנות"],
        kick: "משלוח חינם מעל 200",
        head: "נייר ששווה לכתוב עליו.",
        sub: "מחברות, עטים ומתנות קטנות, שנבחרו על ידי אנשים שכותבים הרבה.",
        book: "למחברות",
        menu: "לערכות המתנה",
        cards: [
          ["מחברת A5 מנוקדת", "ירוק, כריכה תפורה"],
          ["סט עטי מכחול", "שנים־עשר צבעים רכים"],
          ["מתכנן שולחני", "שבוע במבט אחד"],
        ],
      },
      app: { hello: "ערב טוב,", who: "דנה", ticket: ["ההזמנה שלך", "מגיעה ביום רביעי", "מחברת A5 מנוקדת · ירוק"], lines: ["מעקב אחרי המשלוח", "הוספת ברכה למתנה", "הזמנה חוזרת של המועדפים"] },
      agent: { status: "עוזרת AI · ערה · 23:47", q: "יש לכם מחברת A5 מנוקדת בירוק?", a: "כן, נשארו ארבע! מזמינים הלילה והיא מגיעה ביום רביעי.", q2: "כן, בבקשה.", a2: "הנה הקישור. שמרתי אחת בשבילך." },
      mind: { docs: ["קטלוג.pdf", "ספקים.xlsx", "הזמנות", "ביקורות", "מלאי"], asked: "שאלתם", q: "מה נמכר הכי טוב בספטמבר?", a: "מחברת ה־A5 המנוקדת, בפער. הירוקה נגמרת ראשונה." },
      flow: { kick: "רץ לבד · בכל הזמנה", steps: ["הזמנה חדשה", "בדיקת מלאי", "הזמנה מספק", "שליחת חשבונית", "תזכורת ללקוחה"], log: ["23:49 ההזמנה שולמה", "20 מחברות הוזמנו", "חשבונית נשלחה"] },
    },
  },
};
