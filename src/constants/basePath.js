const isProduction = import.meta.env.MODE === "production";
export const BASE_ROUTE = isProduction ? "/front_5th_chapter1-1" : "";

export const basePath = {
  main: `${BASE_ROUTE}/`,
  login: `${BASE_ROUTE}/login`,
  profile: `${BASE_ROUTE}/profile`,
};
