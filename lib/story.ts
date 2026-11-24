import type { Lang } from "./copy";

export const BLOCKS = ["brand", "web", "app", "film", "agent", "mind", "flow"] as const;
export type BlockId = (typeof BLOCKS)[number];

export type Story = {
  name: string;
  domain: string;
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
    agentEyebrow: string;
    agent: string;
    agentSub: string;
    trace: string;
    faceEyebrow: string;
    face: string;
    faceSub: string;
    morning: string;
    morningSub: string;
    madeUp: string;
    now: string;
    ago: string;
    awake: string;
    skip: string;
    type: string;
    digestFoot: string;
    chapters: string[];
  };
  blocks: Record<BlockId, string>;
  rail: string;
  bp: {
    name: string;
    domain: string;
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
      domain: "paperfox.com",
      trade: "Stationery shop",
      ask: "Do you have the A5 dot notebook in green? I need it by Thursday.",
      gone: "Ordered it somewhere else, thanks anyway.",
      lost: "By morning she has bought it somewhere else.",
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
        ["Supplier order sent", "Twenty more notebooks are on the way"],
      ],
    },
    c: {
      day: "Tuesday night",
      hook: "Your shop closed hours ago.",
      hookAccent: "A customer just wrote to you.",
      hint: "Scroll to see how the night ends",
      nobody: "You're asleep. Nobody answers.",
      everyNight: "You lost a sale, and you'll never know it was there.",
      rewind: "Now the same night, with the lights on.",
      rewindSub: "Same shop, same message. This time something is awake.",
      agentEyebrow: "What answered her",
      agent: "The assistant",
      agentSub: "It knows the shop the way you do. It reads the message, checks the shelf and answers in seconds. Then it finishes the job: it holds the notebook and sends the link.",
      trace: "What it did in those four seconds",
      faceEyebrow: "Where she found you",
      face: "The website",
      faceSub: "This is where she found the shop, and where she paid. It is designed around this one business, not poured into a template.",
      morning: "You slept. Your business didn't.",
      morningSub: "While you were asleep",
      madeUp: "A made-up night at a made-up shop, to show how it works.",
      now: "now",
      ago: "7h ago",
      awake: "AI assistant · awake",
      skip: "Skip the story",
      type: "Message",
      digestFoot: "Nothing is waiting for you. Good morning.",
      chapters: ["The night", "Again", "The answer", "The website", "Morning"],
    },
    blocks: { brand: "Brand", web: "Website", app: "App", film: "Film", agent: "Assistant", mind: "Memory", flow: "Autopilot" },
    rail: "What your business is made of",
    bp: {
      name: "Paper Fox",
      domain: "paperfox.com",
      eyebrow: "What I build",
      head: ["Seven blocks.", "One business."],
      lead: "Four of them your customers see. The other three do the work behind them. One person builds all seven, so they fit together.",
      hint: "Move the light",
      say: {
        brand: "A name and a look people remember",
        film: "A film that shows who you are",
        web: "A website that takes the order",
        app: "Your own app in their pocket",
        agent: "Answers every customer, day and night",
        mind: "Remembers everything about your business",
        flow: "Does the boring work by itself",
      },
      brand: { tag: "Stationery · est. 2026", fonts: ["Fraunces", "Instrument Sans"] },
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
      name: "דף חדש",
      domain: "dafhadash.co.il",
      trade: "חנות לכלי כתיבה",
      ask: "יש לכם את מחברת הנקודות A5 בירוק? אני צריכה אותה עד יום חמישי.",
      gone: "כבר הזמנתי ממקום אחר, תודה בכל מקרה.",
      lost: "עד הבוקר היא כבר קנתה במקום אחר.",
      steps: [
        ["קראתי את ההודעה", "מחברת נקודות A5, ירוקה, עד יום חמישי"],
        ["בדקתי במלאי", "נשארו ארבע בירוק"],
        ["בדקתי משלוח", "הזמנה הלילה מגיעה ביום רביעי"],
        ["עניתי", "ארבע שניות אחרי שההודעה הגיעה"],
      ],
      reply: "כן, נשארו ארבע בירוק! אם מזמינים הלילה, היא אצלך ביום רביעי. לשלוח לך קישור?",
      confirm: "כן, אשמח.",
      done: "הנה הקישור. שמרתי לך אחת לשעה הקרובה.",
      site: { headline: "נייר ששווה לכתוב עליו.", cta: "למחברות", links: ["חדש", "מחברות", "מתנות"] },
      ticket: ["ההזמנה התקבלה · 23:49", "מחברת נקודות A5 · ירוק"],
      morning: [
        ["הזמנה חדשה", "מחברת נקודות A5 בירוק, שולמה ב־23:49"],
        ["המלאי התעדכן", "נשארו שלוש בירוק"],
        ["6 פניות נענו", "אף לקוח לא נשאר בלי תשובה"],
        ["נשלחה הזמנה לספק", "עוד עשרים מחברות בדרך"],
      ],
    },
    c: {
      day: "יום שלישי בלילה",
      hook: "החנות שלכם סגורה.",
      hookAccent: "ולקוחה בדיוק כתבה לכם.",
      hint: "גללו לראות איך הלילה הזה נגמר",
      nobody: "אין מי שיענה.",
      everyNight: "זה קורה כמעט כל לילה. ואתם אפילו לא יודעים.",
      rewind: "בואו נחזיר את הלילה אחורה.",
      rewindSub: "אותו לילה. אותה הודעה. רק שהפעם מישהו ער.",
      agentEyebrow: "המוח החדש",
      agent: "הסוכן",
      agentSub: "סוכן AI שמכיר את העסק שלכם. עונה תוך שניות, בכל שעה, וגם פועל: בודק מלאי, שומר מוצר, שולח קישור.",
      trace: "מה קרה מאחורי הקלעים",
      faceEyebrow: "הפנים החדשות",
      face: "הפנים",
      faceSub: "וכאן הלקוחה מצאה אתכם. עיצוב שנתפר לעסק שלכם, לא עוד תבנית.",
      morning: "אתם ישנתם. העסק לא.",
      morningSub: "בזמן שישנתם",
      madeUp: "לילה דמיוני בחנות דמיונית, רק כדי להמחיש איך זה עובד.",
      now: "עכשיו",
      ago: "לפני 7 שעות",
      awake: "סוכן AI · ער",
      skip: "לדלג על הסיפור",
      type: "הודעה",
      digestFoot: "שום דבר לא מחכה לכם. בוקר טוב.",
      chapters: ["הלילה", "שוב", "הסוכן", "הפנים", "בוקר"],
    },
    blocks: { brand: "מותג", web: "אתר", app: "אפליקציה", film: "סרט", agent: "סוכן", mind: "מוח שני", flow: "אוטומציות" },
    rail: "ממה העסק שלכם בנוי",
    bp: {
      name: "דף חדש",
      domain: "dafhadash.co.il",
      eyebrow: "התוכנית המלאה",
      head: ["שבע אבני בניין.", "עסק אחד."],
      lead: "כל מה שהלקוחות רואים, וכל מה שעובד בשבילכם מאחורי הקלעים. הכול נבנה תחת קורת גג אחת, ולכן הכול מתחבר.",
      hint: "הזיזו את האור",
      say: {
        brand: "שם שלא שוכחים",
        film: "סרט שמספר מי אתם",
        web: "אתר שמוכר בשבילכם",
        app: "אפליקציה משלכם, בכיס של הלקוחות",
        agent: "עונה לכל לקוח, ביום ובלילה",
        mind: "יודע הכול על העסק",
        flow: "עושה לבד את העבודה השחורה",
      },
      brand: { tag: "כלי כתיבה · מאז 2026", fonts: ["Frank Ruhl Libre", "Heebo"] },
      video: "דף חדש · הסרט · 00:38",
      web: {
        nav: ["חדש", "מחברות", "מתנות"],
        kick: "משלוח חינם מעל 200 ₪",
        head: "נייר ששווה לכתוב עליו.",
        sub: "מחברות, עטים ומתנות קטנות, שבחרו אנשים שכותבים הרבה.",
        book: "למחברות",
        menu: "למארזי המתנה",
        cards: [
          ["מחברת נקודות A5", "ירוקה, בכריכה תפורה"],
          ["סט טושי מכחול", "שנים־עשר גוונים רכים"],
          ["פלנר שולחני", "כל השבוע במבט אחד"],
        ],
      },
      app: { hello: "ערב טוב,", who: "דנה", ticket: ["ההזמנה שלך", "מגיעה ביום רביעי", "מחברת נקודות A5 · ירוק"], lines: ["מעקב משלוח", "הוספת ברכה למתנה", "להזמין שוב את המועדפים"] },
      agent: { status: "סוכן AI · ער · 23:47", q: "יש לכם את מחברת הנקודות A5 בירוק?", a: "כן, נשארו ארבע! אם מזמינים הלילה, היא אצלך ביום רביעי.", q2: "כן, אשמח.", a2: "הנה הקישור. שמרתי לך אחת." },
      mind: { docs: ["קטלוג.pdf", "ספקים.xlsx", "הזמנות", "ביקורות", "מלאי"], asked: "שאלתם", q: "מה הכי נמכר בספטמבר?", a: "מחברת הנקודות A5, ובפער. הירוקה תמיד נגמרת ראשונה." },
      flow: { kick: "רץ לבד · בכל הזמנה", steps: ["הזמנה חדשה", "בדיקת מלאי", "הזמנה מהספק", "שליחת חשבונית", "תזכורת ללקוח"], log: ["23:49 ההזמנה שולמה", "הוזמנו 20 מחברות", "החשבונית נשלחה"] },
    },
  },
};
