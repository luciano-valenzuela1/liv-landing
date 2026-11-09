import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page landing. /registro, /login and the legal pages belong to the
// platform and are not listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 }];
}
