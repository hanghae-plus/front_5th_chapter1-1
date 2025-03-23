import initLinkNavigation from "./anchors";
import Layout from "../_components/layouts/Layout";
import routes from "../_constants/routes";

// FIXME:
import { loginAction } from "../_components/pages/LoginPage";

const render = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = Layout();
  initLinkNavigation();

  const pathname = location.pathname;

  if (pathname === routes.login.path) {
    loginAction();
  }
};

export default render;
