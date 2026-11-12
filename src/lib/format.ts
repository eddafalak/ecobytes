import type { ArticleDocument } from "../../prismicio-types";

/** The article's publication date, or when it was first published in Prismic. */
export function articleDate(article: ArticleDocument) {
  return article.data.publication_date ?? article.first_publication_date.slice(0, 10);
}

/** "12 November 2026" */
export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(isoDate),
  );
}
