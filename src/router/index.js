import { MainPage, LoginPage, ProfilePage, ErrorPage } from "../pages";

const routes = {
  "/": {
    component: MainPage,
  },
  "/login": {
    component: LoginPage,
  },
  "/profile": {
    component: ProfilePage,
    needAuth: true,
  },
  404: {
    component: ErrorPage,
  },
};

export default routes;
