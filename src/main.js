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
    state.notify();
    render();
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

window.addEventListener("hashchange", () => {
  const hashPath = window.location.hash?.toString();
  render(hashPath);
});
