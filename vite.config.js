import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const base = isGitHubActions && repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  server: {
    open: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Todo List",
        short_name: "Todos",
        description: "Simple todo app",
        start_url: ".",
        scope: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
