import fs from "fs";
import path from "path";

export const ssgCopyHTML = (routes = []) => {
  return {
    name: "vite-plugin-ssg-copy-HTML",
    closeBundle() {
      const dist = path.resolve("dist");
      const originHTML = path.join(dist, "index.html");
      routes.forEach((route) => {
        const target = path.join(dist, route);
        const targetHTML = path.join(target, "index.html");
        if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
        fs.copyFileSync(originHTML, targetHTML);
      });
    },
  };
};
