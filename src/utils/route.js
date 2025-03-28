// utils/route.js
const getBase = () => import.meta.env.BASE_URL.replace(/\/$/, ""); // ex: "/front_5th_chapter1-1"

export const getCurrentPath = () => {
  const hash = location.hash;
  if (hash) {
    return hash.replace("#", "") || "/";
  }
  return location.pathname.replace(getBase(), "") || "/";
};

export const pathPrefix = () => {
  return location.hash ? "#" : getBase(); // "#", or "/front_5th_chapter1-1"
};
