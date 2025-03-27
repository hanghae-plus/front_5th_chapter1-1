import { defineConfig } from "vitest/config";
import path from "path";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: isProduction ? "/front_5th_chapter1-1/" : "/",
  build: {
    rollupOptions: {
      input: {
        path: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
      },
    },
  },
});
