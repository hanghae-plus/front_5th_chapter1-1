import store from "../store/store.js";
import { routes } from "./routes.js";

const app = document.querySelector("#root");
const render = (page) => {
  app.innerHTML = page();
};

export const hashHandleRoute = () => {
  const path = location.hash.replace(/^#/, "") || "/";
  const page = routes[path] || routes["*"];
  if (path === "/login" && store.state.loggedIn) {
    hashNavigateTo("/");
    return;
  }
  if (path === "/profile" && !store.state.loggedIn) {
    hashNavigateTo("/login");
    return;
  }
  render(page);
};

// 페이지 이동을 위한 유틸리티 함수
export const hashNavigateTo = (path) => {
  location.hash = path;
  hashHandleRoute();
};
