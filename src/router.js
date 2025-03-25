import HomePage from "./pages/home.js";
import ProfilePage from "./pages/profile.js";
import LoginPage from "./pages/login.js";
import ErrorPage from "./pages/error.js";
import Layout from "./components/layout.js";
import store from "./store/store.js";

const routes = {
  "/": () => Layout(HomePage()),
  "/profile": () => Layout(ProfilePage()),
  "/login": LoginPage,
  "*": ErrorPage,
};

const handleRoute = () => {
  const path = window.location.pathname;
  const app = document.querySelector("#root");

  // 로그인된 상태에서 /login 접근 시 홈 페이지로 강제 이동
  if (path === "/login" && store.state.loggedIn) {
    window.history.pushState({}, "", "/");
    app.innerHTML = Layout(HomePage());
    return;
  }

  // 인증이 필요한 페이지 처리
  if (path === "/profile" && !store.state.loggedIn) {
    window.history.pushState({}, "", "/login");
    app.innerHTML = LoginPage();
    return;
  }

  const component = routes[path] || routes["*"];
  app.innerHTML = component();
};

export default handleRoute;
