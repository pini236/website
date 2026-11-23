import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/he", "/contact", "/privacy", "/delete-account"].map((p) => ({ url: site.url + p }));
}
