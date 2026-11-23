import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/privacy", "/delete-account"].map((p) => ({ url: site.url + p }));
}
