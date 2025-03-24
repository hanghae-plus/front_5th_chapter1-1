import { CONST } from "../data/constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

export const routes = {
  [CONST.pathname.main]: { render: MainPage },
  [CONST.pathname.login]: {
    render: LoginPage,
  },
  [CONST.pathname.profile]: {
    render: ProfilePage,
  },
  default: { render: ErrorPage },
};
