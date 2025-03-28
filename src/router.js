import { MainPage } from "./view/MainPage";
import { LoginPage } from "./view/LoginPage";
import { ProfilePage } from "./view/ProfilePage";
import { NotFoundPage } from "./view/NotFoundPage";

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

export const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

// router: URL에 맞는 View로 변경
export const router = () => {
  const path = location.pathname;
  const Page = routes[path] || NotFoundPage;
  const pageHtml = Page.getHtml();

  document.querySelector("#root").innerHTML = pageHtml;

  // Page컴포넌트에 afterRender가 있는 경우 실행
  if (typeof Page.afterRender === "function") {
    Page.afterRender();
  }
};

// setupRouter: 이벤트 바인딩과 초기 라우팅을 위함
export const setupRouter = () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  window.addEventListener("popstate", () => {
    router();
  });

  router();
};

window.addEventListener("popstate", setupRouter);
document.addEventListener("DOMContentLoaded", setupRouter);
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
    router();
  }
});
