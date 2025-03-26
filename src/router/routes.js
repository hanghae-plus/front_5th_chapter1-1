import { CONST } from "../data/constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "../pages";

const { pathname } = CONST;

export const routes = {
  [pathname.main]: { render: MainPage },
  [pathname.login]: { render: LoginPage },
  [pathname.profile]: { render: ProfilePage },
  default: { render: ErrorPage },
};
