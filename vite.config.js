import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        hash: path.resolve(__dirname, "index.hash.html"),
      },
    },
  },
});
