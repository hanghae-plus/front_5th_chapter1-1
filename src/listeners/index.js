import { navigate } from "../router";
import {
  loginAction,
  logoutAction,
  profileUpdateAction,
} from "../actions/userActions";

export const addListeners = () => {
  document.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      e.preventDefault();
      const path = e.target.getAttribute("href");
      navigate(path);
    }
    if (e.target.matches("#logout")) {
      e.preventDefault();
      logoutAction();
    }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.matches("#login-form")) {
      e.preventDefault();
      loginAction(e);
    }
    if (e.target.matches("#profile-form")) {
      e.preventDefault();
      profileUpdateAction();
    }
  });
};
