import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "islamosmanubc";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repo === `${owner}.github.io`;

export default defineConfig({
  site: process.env.SITE_URL ?? `https://${owner}.github.io`,
  base: repo && !isUserSite ? `/${repo}` : undefined,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
