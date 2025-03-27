import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
