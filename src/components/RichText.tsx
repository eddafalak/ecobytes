import { PrismicRichText, type JSXMapSerializer } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import type { RichTextField } from "@prismicio/client";

// How Prismic rich text is turned into HTML on this site: one place to style articles.
const components: JSXMapSerializer = {
  heading2: ({ children }) => <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>,
  heading3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">{children}</h3>,
  paragraph: ({ children }) => <p className="mb-5 leading-relaxed">{children}</p>,
  list: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6">{children}</ul>,
  oList: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className="text-moss underline underline-offset-4 hover:text-forest">
      {children}
    </PrismicNextLink>
  ),
};

export function RichText({ field }: { field: RichTextField }) {
  return <PrismicRichText field={field} components={components} />;
}
