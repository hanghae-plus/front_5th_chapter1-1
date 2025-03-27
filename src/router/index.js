import Router from "./router";
import routes from "./routes";
import { BASE_PATH } from "../consts/path";
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
    throw new Error("Router has not been initialized");
  }
  return routerInstance;
};

export default {
  initRouter,
  getRouter,
};
