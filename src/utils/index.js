import { Router, routes } from "./router";

let routerInstance = null;

export const initRouter = (options = { mode: "history" }) => {
  routerInstance = Router.getInstance(routes, {
    ...options,
    base: BASE_PATH,
  });
  return routerInstance;
};

export const getRouter = () => {
  if (!routerInstance) {
    throw new Error("라우터를 초기화 하지 않았습니다.");
  }
  return routerInstance;
};

export default {
  initRouter,
  getRouter,
};

export const BASE_PATH =
  process.env.BASE_PATH === "production" ? "front/front_5th_chapter1-1/" : "/";
