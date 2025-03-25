import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        hash: "./index.hash.html",
      },
    },
  },
});
