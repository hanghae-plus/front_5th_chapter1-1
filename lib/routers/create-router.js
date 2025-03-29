import authGuard from "./auth-guard";
import { NotFound } from "@/pages/not-found";
import { router as routerFactory } from "./router";

/**
 * 라우터 생성 함수
 * @description 라우터 타입에 따라 라우터를 생성
 * @param {Object} routes - 라우트 정보
 * @param {string} type - 라우터 타입
 * @returns {Object} 라우터 기능을 담은 객체
 */
export function createRouter({ routes, type }) {
  if (!Array.isArray(routes)) throw new Error("Provide routes as array");

  let currentCleanup = null;

  const _renderPage = authGuard({
    routes,
    routerType: type,
    renderCallback: ({ redirectTo }) => {
      if (typeof currentCleanup === "function") {
        currentCleanup();
        currentCleanup = null;
      }

      const rootElement = document.getElementById("root");

      if (!redirectTo) {
        rootElement.innerHTML = NotFound();
        return;
      }

      currentCleanup = redirectTo.element(rootElement);
    },
  });

  const router = routerFactory(type)(_renderPage);

  const navigate = (newPath) => {
    router.navigate(newPath);
    _renderPage();
  };

  const run = () => {
    router.run();
    _renderPage();
  };

  return {
    navigate,
    run,
  };
}
