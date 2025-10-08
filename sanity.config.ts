import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Le Lavoir de la Passerelle",

  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    "",
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production",

  plugins: [structureTool(), visionTool()],

  basePath: "/studio",

  schema: {
    types: schemas,
  },
});
