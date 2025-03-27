import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  // vite에서는 command로 개발서버,프로덕션 구분 가능
  const isProd = command === "build";

  return {
    base: isProd ? "/front_5th_chapter1-1/" : "/",

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
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
