import type { MetadataRoute } from "next";
import { buildSitemap } from "@/features/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
