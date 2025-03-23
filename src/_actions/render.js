import initLinkNavigation from "./anchors";
import Layout from "../_components/layouts/Layout";
import routes from "../_constants/routes";

// FIXME:
import { loginAction } from "../_components/pages/LoginPage";
import { profileAction } from "../_components/pages/ProfilePage";

const render = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = Layout();
  initLinkNavigation();

  const pathname = location.pathname;

  if (pathname === routes.login.path) {
    loginAction();
  }
  if (pathname === routes.profile.path) {
    profileAction();
  }
};

export default render;
