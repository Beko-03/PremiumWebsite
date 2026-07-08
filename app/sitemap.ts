import type { MetadataRoute } from "next";
import { articles, products, SITE_URL } from "@/lib/data";

export const dynamic = "force-static";

/* Next.js generiert daraus beim Static Export /sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "shop",
    "abo",
    "reservierung",
    "roesterei",
    "journal",
    "b2b",
    "kontakt",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug ? `${slug}/` : ""}`,
    lastModified: new Date(),
  }));

  const productPages = products.map((p) => ({
    url: `${SITE_URL}/produkt/${p.id}/`,
    lastModified: new Date(),
  }));

  const articlePages = articles.map((a) => ({
    url: `${SITE_URL}/artikel/${a.id}/`,
    lastModified: new Date(a.date),
  }));

  return [...staticPages, ...productPages, ...articlePages];
}
