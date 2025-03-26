import { defineConfig } from "vite";
import { resolve } from "path";
import { BASE_PATH } from "./src/consts/path";

export default defineConfig({
  base: BASE_PATH,

  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        hash: resolve(__dirname, "index.hash.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
