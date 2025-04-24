import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip", // Use 'brotliCompress' for Brotli compression
      ext: ".gz", // File extension for compressed files
      threshold: 1024,
    }),
  ],
  server: {
    fs: {
      deny: [".env", "node_modules", "/etc", "/usr"],
    },
    // middlewareMode: true,
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
