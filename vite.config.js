import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    base: isProduction ? "/front_5th_chapter1-1/" : "/",
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
          hash: resolve(__dirname, "index.hash.html"),
          notFound: resolve(__dirname, "404.html"),
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
