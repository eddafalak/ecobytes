import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/** A full-width image with an optional caption. The alt text comes from the image's alt field in Prismic. */
export default function ImageBlock({ slice }: SliceComponentProps<Content.ImageBlockSlice>) {
  if (!isFilled.image(slice.primary.image)) return null;
  return (
    <figure data-slice-type={slice.slice_type} className="my-10">
      <PrismicNextImage
        field={slice.primary.image}
        sizes="(min-width: 768px) 720px, 100vw"
        className="w-full rounded-2xl"
      />
      {isFilled.keyText(slice.primary.caption) && (
        <figcaption className="mt-3 text-sm text-stone">{slice.primary.caption}</figcaption>
      )}
    </figure>
  );
}
