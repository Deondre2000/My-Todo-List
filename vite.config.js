import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Todo List",
        short_name: "Todos",
        description: "Simple todo app",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        icons: [
          {
            src: "./src/assets/todo list.png",
            sizes: "any",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
