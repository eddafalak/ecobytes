import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Every EcoBytes article, newest first: green computing, eco-friendly gadgets and sustainable tech trends.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 md:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight text-forest md:text-5xl">Articles</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone">
        Everything we’ve written, newest first.
      </p>

      {articles.length > 0 ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <ArticleCard key={article.id} article={article} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-stone">No articles yet.</p>
      )}
    </div>
  );
}
