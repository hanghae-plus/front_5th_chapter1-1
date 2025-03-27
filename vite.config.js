import { resolve } from "path";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
  base: isCI ? "/" : "/front_5th_chapter1-1/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
});
