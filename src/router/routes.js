import { CONST } from "../constants";
import {
  ErrorPage,
  LoginPage,
  MainPage,
  onRenderLogin,
  onRenderProfile,
  ProfilePage,
} from "../pages";

export const routes = {
  [CONST.pathname.main]: { render: MainPage },
  [CONST.pathname.login]: {
    render: LoginPage,
    onRender: onRenderLogin,
  },
  [CONST.pathname.profile]: {
    render: ProfilePage,
    onRender: onRenderProfile,
  },
  default: { render: ErrorPage },
};
