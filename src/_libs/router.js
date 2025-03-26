import render from "../_actions/render";
import state from "./state";

const router = {
  /**
   * 페이지 이동
   * @param {string} path
   */
  push(path) {
    if (state.routeType === "history") {
      window.history.pushState({}, "", path);
    }
    if (state.routeType === "hash") {
      window.location.hash = path;
    }

    // FIXME: render 빼는법 알아보기
    render();
  },

  /**
   * 페이지 이동
   * @param {string} path
   */
  replace(path) {
    if (state.routeType === "history") {
      window.history.replaceState({}, "", path);
    }
    if (state.routeType === "hash") {
      window.location.hash = path;
    }

    // FIXME: render 빼는법 알아보기
    render();
  },
};

export default router;
