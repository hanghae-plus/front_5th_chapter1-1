import { HomePage, ProfilePage, LoginPage, NotFoundPage } from "@/pages";

const ROUTES = {
  home: {
    pathname: "/",
    page: HomePage,
  },
  login: {
    pathname: "/login",
    page: LoginPage,
  },
  profile: {
    pathname: "/profile",
    page: ProfilePage,
  },
  error: {
    pathname: "/error",
    page: NotFoundPage,
  },
};

export default ROUTES;
