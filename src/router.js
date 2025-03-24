import HomePage from "./pages/home.js";
import ProfilePage from "./pages/profile.js";
import LoginPage from "./pages/login.js";
import ErrorPage from "./pages/error.js";

const routes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/login", component: LoginPage },
  { path: "*", component: ErrorPage },
];

const handleRoute = () => {
  const path = window.location.pathname;

  // 경로 매칭
  const potentialMatch = routes.find(
    (route) => route.path === path || route.path === "*",
  );

  // 404 처리
  const app = document.querySelector("#root");
  app.innerHTML = potentialMatch.component();
};

export default handleRoute;
