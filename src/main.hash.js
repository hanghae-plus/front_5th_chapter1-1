import Router from "./router/hashRouter";
import { setRouterType } from "./router/router";

setRouterType("hash"); // 라우터 타입 'hash'로 설정
const router = new Router(); // 해시 라우터 사용

addEventListener("popstate", () => {
  router.render();
});

addEventListener("hashchange", () => {
  router.render();
});

router.render();
