import { routerRender } from "./utils/routerRender";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

export const routerState = {
  mode: "",
  isProduct: "",
  isEventAttached: false,

  getRoute() {
    const isProduct = this.isProduct;
    const mode = this.mode;

    let productBasePath = "";

    if (isProduct) {
      productBasePath = mode === "history" ? "/front_5th_chapter1-1/" : "#/";
    }

    if (!isProduct) {
      productBasePath = mode === "history" ? "/" : "#/";
    }

    return {
      [`${productBasePath}`]: MainPage,
      [`${productBasePath}login`]: LoginPage,
      [`${productBasePath}profile`]: ProfilePage,
    };
  },
};
export const routerManager = (mode) => {
  routerState.isProduct = import.meta.env.MODE === "production";
  routerState.mode = mode;

  routerRender();
};
