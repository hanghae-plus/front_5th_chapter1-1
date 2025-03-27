import { defineConfig } from "vitest/config";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  base: isProduction ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        hash: "./index.hash.html",
      },
    },
  },
});
