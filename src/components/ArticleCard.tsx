import Link from "next/link";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { ArticleDocument } from "../../prismicio-types";
import { articleDate, formatDate } from "@/lib/format";

type Props = {
  article: ArticleDocument;
  /** "large" for the lead story on the homepage. */
  size?: "default" | "large";
  /** Load the image straight away (for cards at the top of the page). */
  priority?: boolean;
};

/** Thumbnail, category, title, summary, date and a "Read more" link. */
export function ArticleCard({ article, size = "default", priority = false }: Props) {
  const { data } = article;
  const title = asText(data.title);
  const href = `/articles/${article.uid}`;
  const large = size === "large";

  return (
    <article className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line ${large ? "md:flex-row" : ""}`}>
      <Link href={href} tabIndex={-1} aria-hidden className={`block overflow-hidden bg-mint ${large ? "md:w-3/5" : ""}`}>
        {isFilled.image(data.featured_image) ? (
          <PrismicNextImage
            field={data.featured_image}
            fallbackAlt=""
            priority={priority}
            sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="aspect-[16/9] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-[16/9] h-full w-full" />
        )}
      </Link>
      <div className={`flex flex-1 flex-col gap-3 p-6 ${large ? "md:justify-center md:p-10" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone">
          {data.category && <span className="rounded-full bg-mint px-3 py-1 font-medium text-forest">{data.category}</span>}
          <time dateTime={articleDate(article)}>{formatDate(articleDate(article))}</time>
        </p>
        <h3 className={`font-semibold tracking-tight text-ink ${large ? "text-2xl md:text-4xl" : "text-xl"}`}>
          <Link href={href} className="hover:text-moss">
            {title}
          </Link>
        </h3>
        {data.summary && <p className={`text-stone ${large ? "md:text-lg" : ""}`}>{data.summary}</p>}
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-2 font-medium text-moss hover:text-forest"
          aria-label={`Read more: ${title}`}
        >
          Read more <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
