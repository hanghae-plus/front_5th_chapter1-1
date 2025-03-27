export const loginFormSubmitEvent = (event) => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.removeEventListener("submit", event);
    loginForm.addEventListener("submit", event);
  }
};

export const profileFormSubmitEvent = (event) => {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.removeEventListener("submit", event);
    profileForm.addEventListener("submit", event);
  }
};

export const navLinkClickEvent = (event) => {
  const navLink = document.querySelector("nav");
  if (navLink) {
    navLink.removeEventListener("click", event);
    navLink.addEventListener("click", event);
  }
};
