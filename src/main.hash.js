import { createHashRouter } from "./lib/createHashRouter";
import { LoginPage, MainPage, ProfilePage } from "./pages";
import { userStorage } from "./storage";
import { store } from "./store";
import { App } from "./App";

/**
 * @constant {Object} router
 * @description URL 경로에 따라 알맞은 페이지 컨포넌트를 렌더링하는 라우터 객체입니다.
 * 각 경로에 필요한 컴포넌트 설정과 함께 사용자 인증 및 권한 검사를 수행합니다.
 */

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

const router = createHashRouter(routes);

App(router, store, userStorage);
