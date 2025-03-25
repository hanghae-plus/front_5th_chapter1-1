import { render } from "./router";
import { state } from "./state";

const main = () => {
  render();
};

main();

window.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    state.setIsLoggedIn(false);
    state.setUserInfo(null);
    window.history.pushState({}, "", "/");
    state.notify();
  }
});
