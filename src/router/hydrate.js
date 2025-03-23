import { CONST } from "../constants";
import { state } from "../state";
import { render } from "./router";

export const hydrateLinkIntoRouter = () => {
  const anchorList = document.getElementsByTagName("a");
  for (const anchor of anchorList) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.href;
      const newPathname = new URL(href).pathname;
      render(newPathname);
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      state.loggedInUser = null;
      localStorage.removeItem(CONST.lsKey.user);
    });
  }
};
