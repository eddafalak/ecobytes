import type { Metadata } from "next";
import Link from "next/link";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles, getFeaturedArticles, getHome } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return {
    title: { absolute: home?.data.meta_title || "EcoBytes: sustainable tech, explained" },
    description: home?.data.meta_description || undefined,
    openGraph: { images: home?.data.meta_image.url ? [home.data.meta_image.url] : undefined },
  };
}

export default async function HomePage() {
  const [home, featured, all] = await Promise.all([getHome(), getFeaturedArticles(), getArticles()]);
  // Show the featured articles; if none are marked as featured yet, show the newest three.
  const articles = featured.length > 0 ? featured : all.slice(0, 3);
  const [lead, ...rest] = articles;

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="mb-4 text-sm font-semibold tracking-widest text-moss uppercase">Sustainable tech, explained</p>
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-forest md:text-6xl">
          {home && isFilled.richText(home.data.headline) ? asText(home.data.headline) : "Technology that’s good for the planet."}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone md:text-xl">
          {home?.data.intro ||
            "Stories about green computing, eco-friendly gadgets and the ideas making technology more sustainable."}
        </p>
        {home && isFilled.image(home.data.hero_image) && (
          <PrismicNextImage
            field={home.data.hero_image}
            priority
            sizes="(min-width: 1152px) 1112px, 100vw"
            className="mt-12 aspect-[21/9] w-full rounded-3xl object-cover"
          />
        )}
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Featured articles
          </h2>
          <Link href="/articles" className="font-medium text-moss hover:text-forest">
            All articles <span aria-hidden>→</span>
          </Link>
        </div>

        {lead ? (
          <div className="flex flex-col gap-8">
            <ArticleCard article={lead} size="large" priority />
            {rest.length > 0 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-stone">No articles yet. Publish one in Prismic and it will show up here.</p>
        )}
      </section>
    </>
  );
}
