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

window.addEventListener("submit", (e) => {
  if (e.target.id === "profile-form") {
    state.setUserInfo({
      username: document.querySelector("#username")?.value,
      email: document.querySelector("#email")?.value,
      bio: document.querySelector("#bio")?.value,
    });
    state.notify();
  }
});
