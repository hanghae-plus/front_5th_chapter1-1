import render from "../_actions/render";
import state from "./state";

const BASE_URL = process.env.VITE_BASE_URL ?? "/";

const router = {
  /**
   * 페이지 이동
   * @param {string} path
   */
  push(path) {
    if (state.routeType === "history") {
      window.history.pushState({}, "", `${BASE_URL}${path}`);
    }
    if (state.routeType === "hash") {
      window.location.hash = `${BASE_URL}${path}`;
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
      window.history.replaceState({}, "", `${BASE_URL}${path}`);
    }
    if (state.routeType === "hash") {
      window.location.hash = `${BASE_URL}${path}`;
    }

    // FIXME: render 빼는법 알아보기
    render();
  },
};

export default router;
