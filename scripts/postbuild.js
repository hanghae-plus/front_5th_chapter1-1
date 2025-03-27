import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const src = path.join(distDir, "index.hash.html");
const dest = path.join(distDir, "index.html");

fs.rename(src, dest, (err) => {
  if (err) throw err;
  console.log("Renamed index.hash.html to index.html");
});
