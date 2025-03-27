import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
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
