import { cacheLife, cacheTag } from "next/cache";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";

// All content is fetched through these cached functions ("use cache"), so pages are generated
// statically at build time and served from the cache afterwards. Every entry is tagged "prismic":
// when an editor publishes in Prismic, its webhook calls /api/revalidate, which expires that tag
// and the pages rebuild with the new content. In development the cache refreshes after about a
// minute, so published changes show up shortly after.

/** Newest first: by publication date, falling back to when the article was first published. */
const newestFirst = [
  { field: "my.article.publication_date", direction: "desc" },
  { field: "document.first_publication_date", direction: "desc" },
] as const;

export async function getHome() {
  "use cache";
  prismicCache();
  return createClient().getSingle("home").catch(notFoundAsNull);
}

export async function getAbout() {
  "use cache";
  prismicCache();
  return createClient().getSingle("about").catch(notFoundAsNull);
}

/** All articles, newest first. */
export async function getArticles() {
  "use cache";
  prismicCache();
  return createClient().getAllByType("article", { orderings: [...newestFirst] });
}

/** Articles marked "Featured on the homepage", newest first. */
export async function getFeaturedArticles() {
  "use cache";
  prismicCache();
  return createClient().getAllByType("article", {
    filters: [prismic.filter.at("my.article.featured", true)],
    orderings: [...newestFirst],
  });
}

export async function getArticle(uid: string) {
  "use cache";
  prismicCache();
  return createClient().getByUID("article", uid).catch(notFoundAsNull);
}

/** Gives the current cached function its lifetime and the "prismic" tag. */
function prismicCache() {
  if (process.env.NODE_ENV === "production") cacheLife("days");
  else cacheLife("minutes"); // "seconds" would be too short to prerender
  cacheTag("prismic");
}

/** A missing document (e.g. a wrong URL) becomes null; other errors still throw. */
function notFoundAsNull(error: unknown) {
  if (error instanceof prismic.NotFoundError) return null;
  throw error;
}
