import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

/** A highlighted quote. */
export default function Quote({ slice }: SliceComponentProps<Content.QuoteSlice>) {
  if (!isFilled.keyText(slice.primary.quote)) return null;
  return (
    <figure data-slice-type={slice.slice_type} className="my-12 border-l-4 border-leaf pl-6">
      <blockquote className="text-2xl leading-snug font-medium tracking-tight text-forest md:text-3xl">
        “{slice.primary.quote}”
      </blockquote>
      {isFilled.keyText(slice.primary.source) && (
        <figcaption className="mt-4 text-stone">— {slice.primary.source}</figcaption>
      )}
    </figure>
  );
}
