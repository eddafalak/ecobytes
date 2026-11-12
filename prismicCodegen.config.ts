import type { Config } from "prismic-ts-codegen";

// Generates prismicio-types.d.ts from the local models (Slice Machine also does this when it runs).
const config: Config = {
  output: "./prismicio-types.d.ts",
  models: ["./customtypes/**/index.json", "./src/slices/**/model.json"],
  clientIntegration: { includeContentNamespace: true, includeCreateClientInterface: true },
};

export default config;
