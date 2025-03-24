import Router from "./Router";
import routes from "./routes";

let routerInstance = null;

export const initRouter = (options = { mode: "history" }) => {
  routerInstance = Router.getInstance(routes, options);
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
