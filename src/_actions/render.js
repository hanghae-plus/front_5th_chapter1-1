import interceptAnchors from "./interceptAnchors";
import Layout from "../_components/layouts/Layout";
import route from "../_constants/route";

// FIXME:
import { loginAction } from "../_components/pages/LoginPage";
import { profileAction } from "../_components/pages/ProfilePage";

const render = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = Layout();

  interceptAnchors();

  const pathname = location.pathname;
  if (pathname === route.login.path) {
    loginAction();
  }
  if (pathname === route.profile.path) {
    profileAction();
  }
};

export default render;
