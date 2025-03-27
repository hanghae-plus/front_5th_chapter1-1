import Router from "./router/browserRouter";
import { setRouterType } from "./router/router";

setRouterType("browser"); // 라우터 타입 'browser'로 설정
const router = new Router(); // 브라우저 라우터 사용

window.addEventListener("popstate", () => {
  router.render();
});

router.render();
