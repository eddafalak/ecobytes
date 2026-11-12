// The slice library: maps each slice type in Prismic to the React component that renders it.
// Slice Machine updates this file when you create a new slice.
import Embed from "./Embed";
import ImageBlock from "./ImageBlock";
import Quote from "./Quote";
import Text from "./Text";

export const components = {
  embed: Embed,
  image_block: ImageBlock,
  quote: Quote,
  text: Text,
};
