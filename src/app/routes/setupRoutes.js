import { routes } from "./routes";

// 라우터에 routes 배열에 정의된 경로들을 등록해주는 함수
export function setupRoutes(router) {
  routes.forEach(({ path, guard, redirect, render }) => {
    router.addRoute(path, (container) => {
      // guard 조건이 있고, 통과하지 못하면 redirect
      if (guard && !guard()) {
        router.navigateTo(redirect);
        return;
      }

      render(container, router);
    });
  });
}
