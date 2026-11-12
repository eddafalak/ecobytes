import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

/**
 * A YouTube/Vimeo video or a social media post. Prismic fetches the oEmbed HTML for the pasted
 * URL; videos are shown in a 16:9 frame, other embeds (posts) at their own size.
 */
export default function Embed({ slice }: SliceComponentProps<Content.EmbedSlice>) {
  const { embed, caption } = slice.primary;
  if (!isFilled.embed(embed) || !embed.html) return null;
  const isVideo = embed.type === "video";
  return (
    <figure data-slice-type={slice.slice_type} className="my-10">
      <div
        className={
          isVideo
            ? "aspect-video overflow-hidden rounded-2xl bg-forest [&_iframe]:h-full [&_iframe]:w-full"
            : "flex justify-center [&_iframe]:max-w-full"
        }
        // The HTML comes from the embed provider via Prismic's oEmbed lookup.
        dangerouslySetInnerHTML={{ __html: embed.html }}
      />
      {isFilled.keyText(caption) && <figcaption className="mt-3 text-sm text-stone">{caption}</figcaption>}
    </figure>
  );
}
