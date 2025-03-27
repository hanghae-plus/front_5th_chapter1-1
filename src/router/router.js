import store from "../store/store.js";
import { BASE_PATH } from "../config.js";
import { routes } from "./routes.js";

const app = document.querySelector("#root");

const render = (page) => {
  app.innerHTML = page();
  console.log(page);
};

export const handleRoute = () => {
  const path = window.location.pathname.replace(BASE_PATH, "") || "/";
  const page = routes[path] || routes["*"];
  if (path === "/login" && store.state.loggedIn) {
    navigateTo("/");
    return;
  }
  if (path === "/profile" && !store.state.loggedIn) {
    navigateTo("/login");
    return;
  }
  render(page);
};

// 페이지 이동을 위한 유틸리티 함수
export const navigateTo = (path) => {
  window.history.pushState({}, "", `${BASE_PATH}${path}`);
  handleRoute();
};
