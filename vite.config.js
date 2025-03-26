import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  // GitHub Pages 배포를 위한 base URL 설정
  // command가 'build'일 때는 GitHub Pages URL, 그 외에는 루트로 설정
  base: command === "build" ? "/front_5th_chapter1-1/" : "/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // 메인 엔트리 파일
        hash: resolve(__dirname, "index.hash.html"), // 해시 엔트리 파일
        404: resolve(__dirname, "404.html"), // 404 페이지 포함
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
  },
}));
