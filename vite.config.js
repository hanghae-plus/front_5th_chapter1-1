import { defineConfig } from "vitest/config";
import { resolve } from "path";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
      },
    },
  },
  base: isProduction ? "/front_5th_chapter1-1/" : "/",
});
