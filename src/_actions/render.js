import interceptAnchors from "./interceptAnchors";
import Layout from "../_components/layouts/Layout";
import authMiddleware from "../_libs/middlewares/authMiddleware";

import { loginAction, logoutAction } from "../_components/pages/LoginPage";
import { profileAction } from "../_components/pages/ProfilePage";

const render = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = authMiddleware(Layout);

  interceptAnchors();

  // TODO: 해당 페이지와 묶어서 처리하고 싶은데 방법을 모르겠음
  loginAction();
  profileAction();
  logoutAction();
};

export default render;
