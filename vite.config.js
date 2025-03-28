import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? "/front_5th_chapter1-1/" : "/",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          hash: resolve(__dirname, "index.hash.html"),
          404: resolve(__dirname, "404.html"),
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
