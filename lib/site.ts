export const site = {
  name: "Rooftop AI Studio",
  short: "Rooftop",
  owner: "Pini Zolberg",
  email: "pini.zolberg@gmail.com",
  url: "https://rooftop-ai-studio.vercel.app",
  promise: "Your business, rebuilt for the AI era.",
  description:
    "Rooftop AI Studio rebuilds businesses for the AI era: websites, brands, apps, games and videos on the outside, AI agents, second brains and automations on the inside.",
};

export const mailto = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
