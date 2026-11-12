import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/RichText";

/** Paragraphs, headings and lists. */
export default function Text({ slice }: SliceComponentProps<Content.TextSlice>) {
  return (
    <section data-slice-type={slice.slice_type} className="text-lg">
      <RichText field={slice.primary.text} />
    </section>
  );
}
