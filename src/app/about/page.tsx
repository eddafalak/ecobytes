import type { Metadata } from "next";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { getAbout } from "@/lib/content";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return {
    title: about?.data.meta_title || "About",
    description:
      about?.data.meta_description || about?.data.intro || "EcoBytes explores how technology can help build a sustainable future.",
  };
}

export default async function AboutPage() {
  const about = await getAbout();
  const data = about?.data;

  return (
    <div className="mx-auto max-w-3xl px-5 pt-16 md:pt-24">
      <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-forest md:text-5xl">
        {data && isFilled.richText(data.title) ? asText(data.title) : "About EcoBytes"}
      </h1>
      <p className="mt-6 text-xl text-stone">
        {data?.intro || "EcoBytes explores how technology can help build a sustainable future."}
      </p>
      {data && isFilled.image(data.image) && (
        <PrismicNextImage field={data.image} priority sizes="(min-width: 768px) 720px, 100vw" className="mt-10 w-full rounded-2xl" />
      )}
      {data ? (
        <div className="mt-10">
          <SliceZone slices={data.slices} components={components} />
        </div>
      ) : (
        <p className="mt-10 text-stone">Create the “About page” document in Prismic to fill this page.</p>
      )}
    </div>
  );
}
