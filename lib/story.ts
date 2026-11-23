export type StoryId = "restaurant" | "clinic" | "shop" | "studio";

export type Story = {
  id: StoryId;
  label: string;
  accent: string;
  name: string;
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

export const STORY_ORDER: StoryId[] = ["restaurant", "clinic", "shop", "studio"];
export const DEFAULT_STORY: StoryId = "restaurant";

export const COPY = {
  day: "Tuesday night",
  hook: "Your business is closed.",
  hookAccent: "A customer just wrote to you.",
  who: "Whose night is it?",
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
  faceSub: "And this is where that customer found you. Designed for the business, not poured into a template.",
  faceParts: ["Website", "App", "Brand"],
  morning: "You slept. Your business didn't.",
  morningSub: "While you were asleep",
  madeUp: "A made-up night at a made-up business, to show how it works.",
  promise: "That is what I build.",
  promiseAccent: "A new face and a new brain for your business.",
  closing: "Tell me what you run. I will show you what your night could look like.",
  cta: "Talk about my business",
};

export const STORIES: Record<StoryId, Story> = {
  restaurant: {
    id: "restaurant",
    label: "Restaurant",
    accent: "#FF7A45",
    name: "Saffron Yard",
    ask: "Hi! Any chance of a table for 6 this Friday around 8?",
    gone: "Never mind, we found another place 🙂",
    lost: "By morning, they had booked somewhere else.",
    steps: [
      ["Read the message", "Table for six, Friday, around 20:00"],
      ["Checked Friday's bookings", "20:00 is full. The long table is free at 20:15"],
      ["Held the table", "Table 12, six seats, held for ten minutes"],
      ["Answered", "Four seconds after the message arrived"],
    ],
    reply: "Hi! Friday at 20:15 I have our long table for six. Want me to book it?",
    confirm: "Yes please! Under Dana.",
    done: "Done, Dana. Table for 6, Friday 20:15. See you then!",
    site: { headline: "Fire, smoke and a long table.", cta: "Book a table", links: ["Menu", "The garden", "Private dinners"] },
    ticket: ["Friday · 20:15", "Table for 6 · Dana"],
    morning: [
      ["New booking", "Dana, Friday 20:15, table for 6"],
      ["7 questions answered", "Nobody is waiting for a reply"],
      ["Friday is almost full", "Two tables left for the evening"],
    ],
  },
  clinic: {
    id: "clinic",
    label: "Clinic",
    accent: "#3DD6C4",
    name: "Linden Clinic",
    ask: "Hello, my crown fell out tonight. Can someone see me tomorrow morning?",
    gone: "It's ok, another clinic can take me at 8.",
    lost: "By morning, they were sitting in another clinic.",
    steps: [
      ["Read the message", "Lost crown, wants tomorrow morning"],
      ["Checked tomorrow's diary", "Dr. Levi is free at 08:40"],
      ["Held the slot", "08:40 held, intake form prepared"],
      ["Answered", "Four seconds after the message arrived"],
    ],
    reply: "Sorry to hear that! Dr. Levi can see you tomorrow at 08:40. Shall I book it?",
    confirm: "Yes, thank you. It's Noa.",
    done: "Booked, Noa. Tomorrow 08:40. I sent a short form so you can skip the paperwork.",
    site: { headline: "Care that starts before you arrive.", cta: "Book a visit", links: ["Treatments", "Our doctors", "First visit"] },
    ticket: ["Tomorrow · 08:40", "Dr. Levi · Noa"],
    morning: [
      ["New appointment", "Noa, 08:40 with Dr. Levi"],
      ["Intake form filled", "Ready before the patient arrives"],
      ["5 questions answered", "Nobody is waiting for a reply"],
    ],
  },
  shop: {
    id: "shop",
    label: "Shop",
    accent: "#FF4F9A",
    name: "Paper Fox",
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
  studio: {
    id: "studio",
    label: "Studio or agency",
    accent: "#8C7BFF",
    name: "Northlight",
    ask: "We need a rebrand before our March launch. Can we talk this week?",
    gone: "We went with another studio. Thanks!",
    lost: "By morning, they had hired another studio.",
    steps: [
      ["Read the message", "Rebrand, March deadline, wants a call"],
      ["Checked the calendar", "Wednesday 10:00 is free"],
      ["Prepared a brief", "One page, written from their own website"],
      ["Answered", "Four seconds after the message arrived"],
    ],
    reply: "Happy to! Wednesday at 10:00 works for a 30-minute call. Shall I book it?",
    confirm: "Perfect. Tom, from Fieldwork.",
    done: "Booked, Tom. I sent an invite and three short questions to make the call count.",
    site: { headline: "Brands with a point of view.", cta: "Start a project", links: ["Work", "Approach", "Studio"] },
    ticket: ["Wednesday · 10:00", "Intro call · Tom"],
    morning: [
      ["Call booked", "Tom from Fieldwork, Wednesday 10:00"],
      ["Brief ready", "One page, waiting in your inbox"],
      ["3 enquiries answered", "Nobody is waiting for a reply"],
    ],
  },
};
