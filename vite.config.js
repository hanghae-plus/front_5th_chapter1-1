import { defineConfig } from "vitest/config";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.hash.html",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});
