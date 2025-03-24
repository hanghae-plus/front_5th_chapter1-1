import { render } from "./render";

export function handleSubit(e, user) {
  e.preventDefault();

  if (e.target && e.target.id === "login-form") {
    let username = document.getElementById("username")?.value;
    user.set({ username });
    user.save();
    history.pushState(null, "", "profile");

    render();
  }

  if (e.target && e.target.id === "profile-form") {
    let username = document.getElementById("username")?.value;
    let bio = document.getElementById("bio")?.value;
    let email = document.getElementById("email")?.value;

    user.set({ username, bio, email });
    user.save();
  }
}

export function handleClick(e, user) {
  if (e.target && e.target.nodeName == "A") {
    e.preventDefault();
    const nextPathName = e.target.href.replace(location.origin, "");
    history.pushState(null, "", nextPathName);
    render();
  }

  if (e.target && e.target.id === "logout") {
    user.clear();
    history.pushState(null, "", "login");
    render();
  }
}
