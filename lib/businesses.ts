export type BusinessId = "restaurant" | "clinic" | "shop" | "studio" | "other";
export type Business = { id: BusinessId; label: string; accent: string; lead: string };

export const BUSINESS_ORDER: BusinessId[] = ["restaurant", "clinic", "shop", "studio", "other"];
export const DEFAULT_BUSINESS: BusinessId = "other";

export const OPENING = {
  headline: "Your business, rebuilt for the AI era.",
  headlineAccent: "A new face and a new brain.",
  ask: "Show me yours. I run a…",
};

export const BUSINESSES: Record<BusinessId, Business> = {
  restaurant: {
    id: "restaurant",
    label: "Restaurant",
    accent: "#FF7A45",
    lead: "A site that makes people hungry, and an AI host that answers and books day and night.",
  },
  clinic: {
    id: "clinic",
    label: "Clinic",
    accent: "#3DD6C4",
    lead: "A site patients trust in five seconds, and an AI receptionist that never puts anyone on hold.",
  },
  shop: {
    id: "shop",
    label: "Shop",
    accent: "#FF4F9A",
    lead: "A store people enjoy browsing, and an AI seller that knows every product.",
  },
  studio: {
    id: "studio",
    label: "Studio or agency",
    accent: "#8C7BFF",
    lead: "A portfolio that wins the pitch for you, and an AI teammate trained on how you work.",
  },
  other: {
    id: "other",
    label: "Something else",
    accent: "#FFC14D",
    lead: "What your customers see, and the AI that runs behind it, designed and built by one person.",
  },
};
