import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        // main: "./index.html",
        hash: "./index.hash.html",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
}));
