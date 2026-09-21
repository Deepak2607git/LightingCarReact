import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
  registerType: "autoUpdate",

  manifest: {
    name: "Lightning Cars",
    short_name: "Lightning Cars",
    description: "Lightning Cars Rental",
    theme_color: "#111111",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
    scope: "/",

    icons: [
      {
        src: "/logo.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
    ],
  },
})
  ],
});