import Layout from "../_components/layouts/Layout";
import { loginAction } from "../_components/pages/LoginPage";
import { profileAction } from "../_components/pages/ProfilePage";
import route from "../_constants/route";
import states from "../_states";

const hashRender = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = Layout();

  const pathname = states.pathname;
  if (pathname === route.login.path) {
    loginAction();
  }
  if (pathname === route.profile.path) {
    profileAction();
  }
};

export default hashRender;
