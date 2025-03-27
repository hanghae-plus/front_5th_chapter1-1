import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests",
    exclude: ["**/e2e/**", "**/*.e2e.spec", "**/node_modules/**"],
  },
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "/",
});
