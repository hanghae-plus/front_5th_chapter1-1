import { setUserInfoToStorage } from "@/logic/localStorage.js";
import { ID } from "@/constant.js";
import { renderPage, updateUserInfo } from "@/main.js";

function handleSubmitProfile(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const username = formData.get("username");
  const bio = formData.get("bio");

  setUserInfoToStorage({
    username,
    email,
    bio,
  });
  updateUserInfo();
}

export function addEventListenerToProfileForm() {
  const profileForm = document.getElementById(ID.PROFILE_FORM);
  profileForm?.addEventListener("submit", (event) => {
    handleSubmitProfile(event);
    renderPage();
  });
}
