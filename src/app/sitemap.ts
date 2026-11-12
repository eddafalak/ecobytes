import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/content";
import { articleDate } from "@/lib/format";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** /sitemap.xml: every page and article, for search engines. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return [
    { url: `${site}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...articles.map((article) => ({
      url: `${site}/articles/${article.uid}`,
      lastModified: article.last_publication_date ?? articleDate(article),
      priority: 0.7,
    })),
  ];
}
