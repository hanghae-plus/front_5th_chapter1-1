import { push, render } from "./router/util";
import {
  getFormValue,
  getLocalItem,
  removeLocalItem,
  setLocalItem,
} from "./utils";

const onLinkClick = (event) => {
  const link = event.target.closest("a");

  if (link && link.origin === location.origin) {
    event.preventDefault();

    push(link.pathname);
  }
};

const onLoginSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const username = getFormValue(form, "input[type='text']");

  setLocalItem("user", {
    username,
    email: "",
    bio: "",
  });

  push("/profile");
};

const onProfileSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const username = getFormValue(form, "input[name='username']");
  const email = getFormValue(form, "input[name='email']");
  const bio = getFormValue(form, "textarea[name='bio']");

  const user = getLocalItem("user");

  setLocalItem("user", {
    ...user,
    username,
    email,
    bio,
  });

  alert("프로필 업데이트가 완료되었습니다.");

  push("/profile");
};

const onSubmit = (event) => {
  event.preventDefault();

  const form = event.target;

  switch (form.id) {
    case "login-form": {
      onLoginSubmit(event);

      return;
    }

    case "profile-form": {
      onProfileSubmit(event);

      return;
    }

    default:
      push("/404");

      return;
  }
};

const onClickLogout = (event) => {
  const logoutLink = event.target.closest("#logout");

  if (logoutLink) {
    event.preventDefault();

    removeLocalItem("user");
    push("/login");
  }
};

const init = () => {
  window.addEventListener("popstate", () => render(location.pathname));

  document.addEventListener("click", onLinkClick);
  document.addEventListener("click", onClickLogout);
  document.addEventListener("submit", onSubmit);

  render(location.pathname);
};

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
