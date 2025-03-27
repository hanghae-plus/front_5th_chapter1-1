import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.warn("🔥 현재 모드:", mode);
  console.log("🧩 VITE_APP_BASE:", env.VITE_APP_BASE);

  return {
    base: env.VITE_APP_BASE || "/",
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          hash: resolve(__dirname, "index.hash.html"),
        },
      },
    },
    server: {
      historyApiFallback: true, // 새로고침 시 404 방지
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  };
});
