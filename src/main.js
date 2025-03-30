import { Router } from "./utils/router";
import { setLocalStorage } from "./utils/storage";

const handleClick = (event) => {
  const { target } = event;
  const { id, tagName, href, pathname } = target;

  const isLogoutButtonClicked = id === "logout";
  if (isLogoutButtonClicked) {
    Router.clearAuth();
  }

  if (tagName === "BUTTON") {
    return;
  }

  const isLinkClicked = tagName === "A" && href;
  if (isLinkClicked) {
    event.preventDefault();

    const isHashRouter = href?.includes("#");
    if (isHashRouter) {
      Router.navigate(href);
    } else {
      Router.navigate(pathname);
    }
  }
};

const handleProfileUpdate = (username) => {
  const email = document.getElementById("email")?.value?.trim();
  const bio = document.getElementById("bio")?.value?.trim();

  setLocalStorage("user", { username, email, bio });
  alert("프로필이 업데이트 되었습니다.");
};

const handleSubmit = (event) => {
  const username = document.getElementById("username")?.value?.trim();
  if (!username) return;

  event.preventDefault();
  if (event.target.id === "login-form") {
    setLocalStorage("user", { username, email: "", bio: "" });
    Router.navigate("/");
  }

  if (event.target.id === "profile-form") {
    handleProfileUpdate(username);
  }
};

Router.init({
  onClick: handleClick,
  onSubmit: handleSubmit,
});
