import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "maskable-icon.png",
        "maskable-icon-512.png",
        "pwa-64.png",
        "pwa-192.png",
        "pwa-512.png",
        "logo.png",
      ],
      manifest: {
        id: "/SIGEM/",
        name: "SIGEM",
        short_name: "SIGEM ",
        description:
          "Gestión colaborativa de órdenes de mantenimiento con soporte offline.",
        theme_color: "#0f172a",
        background_color: "#f8fafc",
        display: "standalone",
        start_url: "/SIGEM/",
        scope: "/SIGEM/",
        orientation: "natural",
        icons: [
          {
            src: "pwa-64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon.png",
            sizes: "196x196",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "maskable-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "/SIGEM/index.html",
        maximumFileSizeToCacheInBytes: 10 * 1024 ** 2,
        runtimeCaching: [
          {
            urlPattern: /\/SIGEM\/.*\.(?:json|png|jpg|jpeg|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "SIGEM-static-assets",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
  base: "/SIGEM/",
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 5 * 1024 * 1024,
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
    exclude: ["node_modules", "**/node_modules/*"],
  },
});
