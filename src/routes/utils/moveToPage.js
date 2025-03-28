import { routerState } from "../routerManager";
import { routerRender } from "./routerRender";

export const moveToPage = (page) => {
  const basePath = routerState.isProduct ? "/front_5th_chapter1-1" : "";

  if (routerState.mode === "history") {
    window.history.pushState(null, null, `${basePath}${page}`);
    routerRender();
  }

  if (routerState.mode === "hash") {
    window.location.hash = `#${page}`;
  }
};
