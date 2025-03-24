import { navigate } from "../router";

export function login(data) {
  localStorage.setItem("user", JSON.stringify(data));
  navigate("/profile");
}

export function logout() {
  localStorage.removeItem("user");
  navigate("/");
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function updateProfile(data) {
  localStorage.setItem("user", JSON.stringify(data));
}
