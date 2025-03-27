import { createObserver } from "./createObserver";
import { NotFountPage } from "../pages";
import { BASE_URL } from "../constants";

/**
 * @function createRouter
 * @description SPA를 위한 클라이언트 사이드 라우터를 생성합니다.
 * URL 경로 변경을 감지하고, 해당 경로에 맞는 페이지 컴포넌트를 반환 및 이동을 처리합니다.
 */

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => window.location.pathname.replace(BASE_URL, "");

  const getTarget = () =>
    routes[window.location.pathname.replace(BASE_URL, "")] ?? NotFountPage;

  const push = (path) => {
    window.history.pushState({}, "", `${BASE_URL}${path}`);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return { push, subscribe, getTarget, getPath };
};
