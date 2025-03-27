import render from "../_actions/render";
import state from "./state";

const router = {
  /**
   * 페이지 이동
   * @param {string} path
   */
  push(path) {
    const baseUrl = import.meta.env.VITE_BASE_URL ?? "/";

    if (state.routeType === "history") {
      window.history.pushState({}, "", `${baseUrl}${path}`);
    }
    if (state.routeType === "hash") {
      window.location.hash = `${baseUrl}${path}`;
    }

    // FIXME: render 빼는법 알아보기
    render();
  },

  /**
   * 페이지 이동
   * @param {string} path
   */
  replace(path) {
    const baseUrl = import.meta.env.VITE_BASE_URL ?? "/";

    console.log("🚀 baseUrl >> ", baseUrl);

    if (state.routeType === "history") {
      window.history.replaceState({}, "", `${baseUrl}${path}`);
    }
    if (state.routeType === "hash") {
      window.location.hash = `${baseUrl}${path}`;
    }

    // FIXME: render 빼는법 알아보기
    render();
  },
};

export default router;
