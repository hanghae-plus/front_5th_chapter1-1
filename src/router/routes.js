import { CONST } from "../data/constants";
import { state } from "../data/state";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

const { pathname } = CONST;

export const routes = {
  [pathname.profile]: {
    page: ProfilePage,
    guard: () => !!state.loggedInUser,
    redirect: pathname.login,
  },
  [pathname.login]: {
    page: LoginPage,
    guard: () => !state.loggedInUser,
    redirect: pathname.main,
  },

  [pathname.main]: { page: MainPage },
  default: { page: ErrorPage },
};
