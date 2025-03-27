import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  // vite에서는 vitest test / vite development / vite build production

  return {
    base: mode === "production" ? "/front_5th_chapter1-1/" : "/",
    build: {
      assetsDir: "assets",
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
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  }
});