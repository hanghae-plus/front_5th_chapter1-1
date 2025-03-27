import { state, getUser } from "./store";
import { router, navigate } from "./router";

window.addEventListener("popstate", () => {
  render();
});

const render = () => {
  const user = getUser();
  state.loginState = !!user;
  console.log("-----location.href----");
  console.log(location.href);

  router();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", newPathName);
      render();
    });
  });

  const profileForm = document.getElementById("profile-form");

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      const user = getUser();
      user.username = username;
      user.email = email;
      user.bio = bio;
      localStorage.setItem("user", JSON.stringify(user));
      render();
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      login();
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
};

const login = () => {
  const username = document.getElementById("username").value;
  const user = {
    username: username,
    email: "",
    bio: "",
  };
  localStorage.setItem("user", JSON.stringify(user));

  state.loginState = true;

  navigate("/");
  render();
};

const logout = () => {
  localStorage.removeItem("user");

  state.loginState = false;

  navigate("/login");
  render();
};

render();
