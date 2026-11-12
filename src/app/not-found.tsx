import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-moss uppercase">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-forest">Page not found</h1>
      <p className="mt-4 text-stone">This page doesn’t exist, or the article has been removed.</p>
      <Link href="/articles" className="mt-8 inline-block font-medium text-moss hover:text-forest">
        Browse all articles <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
