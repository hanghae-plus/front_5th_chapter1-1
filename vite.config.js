import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.hash.html"),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lib": path.resolve(__dirname, "./lib"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
