import { userInfo } from "./constant";
import { initUser, setUser } from "./state";
import { render, navigate } from "./routes";

let userInput = {
  username: "",
  password: "",
};

let profileInput = {
  username: "",
  email: "",
  bio: "",
};

window.addEventListener("load", () => {
  initUser();
  render(window.location.pathname);
});

window.addEventListener("popstate", () => {
  render(window.location.pathname);
});

document.body.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const href = event.target.getAttribute("href");

    if (href === "/logout") {
      setUser(null);
      navigate("/login");
    } else navigate(href);
  }
});

document.body.addEventListener("input", (event) => {
  if (event.target.id === "id-input") {
    userInput.username = event.target.value;
  }
  if (event.target.id === "pw-input") {
    userInput.password = event.target.value;
  }
  if (event.target.id === "username") {
    profileInput.username = event.target.value;
  }
  if (event.target.id === "email") {
    profileInput.email = event.target.value;
  }
  if (event.target.id === "bio") {
    profileInput.bio = event.target.value;
  }
});

document.body.addEventListener("submit", (event) => {
  if (event.target.id === "login-form") {
    event.preventDefault();
    if (
      userInfo.username === userInput.username &&
      userInfo.password === userInput.password
    ) {
      setUser(userInfo);
      navigate("/profile");
    } else {
      alert("로그인 실패!");
    }
  }

  if (event.target.id === "profile-form") {
    event.preventDefault();
    const newUser = {
      username: profileInput.username || userInfo.username,
      email: profileInput.email || userInfo.email,
      bio: profileInput.bio || userInfo.bio,
    };
    setUser(newUser);
  }
});
