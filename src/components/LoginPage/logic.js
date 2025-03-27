import { setUserInfoToStorage } from "@/logic/localStorage.js";
import { ID } from "@/constant.js";
import { renderPage } from "@/main.js";

function handleSubmitLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email") || "";
  const username = formData.get("username");
  const bio = formData.get("bio") || "";

  if (!username) {
    return false;
  }

  setUserInfoToStorage({
    username,
    email,
    bio,
  });

  return true;
}

export function addEventListenerToLoginForm() {
  const loginForm = document.getElementById(ID.LOGIN_FORM);
  loginForm?.addEventListener("submit", (event) => {
    const loginSuccess = handleSubmitLogin(event);
    loginSuccess && renderPage();
  });
}
