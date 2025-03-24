import { setUserInfoToStorage } from "../../shared/logic/localStorage.js";

export function handleSubmitProfile(event) {
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
}
