import { Router, routes } from "./router";
import { BASE_PATH } from "./constants";

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
