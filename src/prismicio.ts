import * as prismic from "@prismicio/client";
import config from "../slicemachine.config.json";

/** The Prismic repository name. Change it in slicemachine.config.json. */
export const repositoryName = config.repositoryName;

/**
 * Route resolvers: tell Prismic which URL each document type lives at, so links between
 * documents (and `article.url`) resolve to the right page.
 */
const routes: prismic.ClientConfig["routes"] = [
  { type: "home", path: "/" },
  { type: "about", path: "/about" },
  { type: "article", path: "/articles/:uid" },
];

/** Creates a Prismic client for the project's repository. */
export function createClient(config: prismic.ClientConfig = {}) {
  return prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });
}
