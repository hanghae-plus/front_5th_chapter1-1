import { authStore } from "./auth";
import { BASE_URL } from "../../shared/constants/constants";

export function bindLoginEvent(container, router) {
  const loginForm = container.querySelector("#login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.querySelector("input[type='text']").value;

    if (!username) return;

    const userData = {
      username,
      email: "",
      bio: "",
    };

    authStore.setUser(userData);
    router.navigateTo(`${BASE_URL}/`);
  });
}
