import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
export const browserRoutes = [
  { path: "/", component: MainPage },
  { path: "/login", component: LoginPage },
  { path: "/profile", component: ProfilePage },
];

export const hashRoutes = [
  { path: "#/", component: MainPage },
  { path: "#/login", component: LoginPage },
  { path: "#/profile", component: ProfilePage },
];
