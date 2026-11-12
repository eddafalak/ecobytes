import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticle, getArticles } from "@/lib/content";
import { articleDate, formatDate } from "@/lib/format";
import { components } from "@/slices";

/** Build a static page for every article at build time. New articles are built on their first visit. */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ uid: article.uid }));
}

export async function generateMetadata({ params }: PageProps<"/articles/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const article = await getArticle(uid);
  if (!article) return {};
  const { data } = article;
  const image = data.meta_image.url || data.featured_image.url;
  return {
    title: data.meta_title || asText(data.title),
    description: data.meta_description || data.summary || undefined,
    alternates: { canonical: `/articles/${uid}` },
    openGraph: {
      type: "article",
      publishedTime: articleDate(article),
      images: image ? [image] : undefined,
    },
  };
}

export default function ArticlePage(props: PageProps<"/articles/[uid]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 pt-24 text-stone">Loading article…</div>}>
      <Article {...props} />
    </Suspense>
  );
}

async function Article({ params }: PageProps<"/articles/[uid]">) {
  const { uid } = await params;
  const article = await getArticle(uid);
  if (!article) notFound();

  const { data } = article;
  const title = asText(data.title);
  const date = articleDate(article);
  const more = (await getArticles()).filter((a) => a.id !== article.id).slice(0, 3);

  // Structured data so search engines understand this is an article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: data.summary ?? undefined,
    datePublished: date,
    image: data.featured_image.url ?? undefined,
    author: data.author ? { "@type": "Person", name: data.author } : undefined,
  };

  return (
    <>
      <article className="mx-auto max-w-3xl px-5 pt-12 md:pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Link href="/articles" className="text-sm font-medium text-moss hover:text-forest">
          <span aria-hidden>←</span> All articles
        </Link>

        <header className="mt-8">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone">
            {data.category && <span className="rounded-full bg-mint px-3 py-1 font-medium text-forest">{data.category}</span>}
            <time dateTime={date}>{formatDate(date)}</time>
            {data.author && <span>by {data.author}</span>}
          </p>
          <h1 className="mt-5 text-4xl leading-[1.1] font-semibold tracking-tight text-forest md:text-5xl">{title}</h1>
          {data.summary && <p className="mt-5 text-xl text-stone">{data.summary}</p>}
        </header>

        {isFilled.image(data.featured_image) && (
          <PrismicNextImage
            field={data.featured_image}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="mt-10 w-full rounded-2xl"
          />
        )}

        <div className="mt-10">
          <SliceZone slices={data.slices} components={components} />
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mx-auto mt-20 max-w-6xl border-t border-line px-5 pt-16">
          <h2 id="more-heading" className="mb-8 text-2xl font-semibold tracking-tight">
            More from EcoBytes
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
