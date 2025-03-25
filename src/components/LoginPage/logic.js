import { setUserInfoToStorage } from "@/shared/logic/localStorage.js";

export function handleSubmitLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const username = formData.get("username");
  const bio = formData.get("bio");

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
