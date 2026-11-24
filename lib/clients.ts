import type { Lang } from "./copy";

type Shop = { id: string; name: Record<Lang, string>; trade: Record<Lang, string> };

export const CLIENTS: Shop[] = [
  { id: "shasha", name: { en: "Shasha Bakery", he: "שאשא בייקרי" }, trade: { en: "Bakery", he: "מאפייה" } },
  { id: "greece", name: { en: "Hair of Greece", he: "Hair of Greece" }, trade: { en: "Hair", he: "שיער" } },
  { id: "lachmon", name: { en: "לחמון", he: "לחמון" }, trade: { en: "Bread", he: "לחם" } },
  { id: "sari", name: { en: "sari-arch", he: "sari-arch" }, trade: { en: "Sari Steiner · Architecture", he: "Sari Steiner · אדריכלות" } },
];

// invented businesses, always shown with the concept label
export const CONCEPTS: Shop[] = [
  { id: "tide", name: { en: "Low Tide", he: "גאות ושפל" }, trade: { en: "Surf school", he: "בית ספר לגלישה" } },
  { id: "sideb", name: { en: "Side B", he: "צד ב׳" }, trade: { en: "Record shop", he: "חנות תקליטים" } },
  { id: "goodboy", name: { en: "Good Boy", he: "כלב טוב" }, trade: { en: "Dog grooming", he: "מספרת כלבים" } },
];
