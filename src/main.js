import { render } from "./lib/render";
import { clearUser, setUser } from "./store/user";

const root = document.getElementById("root");

render();

window.addEventListener("popstate", () => {
  render();
});

root.addEventListener("submit", function (e) {
  e.preventDefault();

  if (e.target && e.target.id === "login-form") {
    let username = document.getElementById("username")?.value;
    setUser({ username });
    history.pushState(null, "", "profile");
    render();
  }

  if (e.target && e.target.id === "profile-form") {
    let username = document.getElementById("username")?.value;
    let bio = document.getElementById("bio")?.value;
    let email = document.getElementById("email")?.value;
    setUser({ username, bio, email });
  }
});

root.addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "A") {
    e.preventDefault();
    const nextPathName = e.target.href.replace(location.origin, "");
    history.pushState(null, "", nextPathName);
    render();
  }

  if (e.target && e.target.id === "logout") {
    clearUser();
    history.pushState(null, "", "login");
    render();
  }
});
