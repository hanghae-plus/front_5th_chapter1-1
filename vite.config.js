import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    base: isProduction ? "/front_5th_chapter1-1/" : "/",
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
    },
  };
});
