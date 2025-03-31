import { ErrorPage } from "../pages/Error";
import { MainPage } from "../pages/Home";
import { addEventLogin, LoginPage } from "../pages/Login";
import { addEventProfile, ProfilePage } from "../pages/Profile";
import { storage } from "../utils/localstorage";
import { router } from "../utils/route";

// roter path 에 따라 rendner 함수를 실행시킨다
function route(path, callback) {
  if (window.location.pathname === path) {
    callback();
  }
}

function loadContent(content, addevent) {
  document.body.innerHTML = content;
  if (addevent) {
    addevent();
  }
}

// 페이지 로드 시 라우팅 실행
function addEvent_load() {
  window.addEventListener("load", () => {
    const userInfo = storage.getStorage();
    const isUserInfo = userInfo?.username;
    route("/", () => loadContent(MainPage(userInfo)));
    route("/profile", () => {
      isUserInfo
        ? loadContent(ProfilePage(userInfo), addEventProfile)
        : router.navigateTo("/login");
    });
    route("/login", () => loadContent(LoginPage(), addEventLogin));
    if (!router.checkRoute(window.location.pathname)) {
      loadContent(ErrorPage());
    }
  });
}

function addRouter() {
  const userInfo = storage.getStorage();
  router.addRoute("/", () => loadContent(MainPage(userInfo)));
  router.addRoute("/profile", () =>
    loadContent(ProfilePage(userInfo), addEventProfile),
  );
  router.addRoute("/login", () => loadContent(LoginPage()), addEventLogin);
}

function init_routes() {
  addEvent_load();
  addRouter();
}

export default init_routes;
