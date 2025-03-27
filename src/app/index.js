import { authStore } from "../features/auth";
import { setupNavigationClickEvents } from "./navigationEvents";
import { createRouter, setupRoutes } from "./routes";

export function initializeApp(isHashMode = false) {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  // 라우터 생성 (HashRouter인지 여부를 옵션으로 전달)
  const router = createRouter(rootElement, { isHashMode });

  // 사용자 상태 초기화 (localStorage에 저장된 사용자 정보 불러오기)
  authStore.init();

  authStore.subscribe(() => {
    router.start(); // 상태 변경 시 라우터 다시 시작
  });

  setupRoutes(router); // 라우트 등록
  setupNavigationClickEvents(router);

  router.start(); // 초기 라우팅 실행
}
