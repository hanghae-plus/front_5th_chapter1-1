import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_5th_chapter1-1/" : "",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        hash: path.resolve(__dirname, "index.hash.html"),
      },
    },
  },
  server: {
    historyApiFallback: true,
  },
  spa: true,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
});
