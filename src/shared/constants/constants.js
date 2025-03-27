const isProduction = process.env.NODE_ENV === "production";
const isHashMode = !!window.location.pathname.includes("index.hash.html");

export const BASE_URL = isProduction
  ? isHashMode
    ? ""
    : "/front_5th_chapter1-1"
  : "";
