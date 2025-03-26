import { CONST } from "../data/constants";
import { state } from "../data/state";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

const { pathname } = CONST;

export const routes = {
  [pathname.profile]: {
    render: ProfilePage,
    guard: () => !!state.loggedInUser,
    redirect: pathname.login,
  },
  [pathname.login]: {
    render: LoginPage,
    guard: () => !state.loggedInUser,
    redirect: pathname.main,
  },

  [pathname.main]: { render: MainPage },
  default: { render: ErrorPage },
};
