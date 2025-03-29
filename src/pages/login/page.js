import app from "@lib/contexts/app";

import { loginTemplate } from "./page.template";

export default function LoginPage(container) {
  if (!container) return null;

  const handleSubmit = (event) => {
    const form = event.target;

    event.preventDefault();
    const formData = new FormData(form);

    const username = formData.get("username");
    // const password = formData.get("password");

    app.authService.login({ username });
  };

  container.innerHTML = loginTemplate();

  const loginForm = document.getElementById("login-form");
  if (loginForm) loginForm.addEventListener("submit", handleSubmit);

  return () => {
    const loginForm = document.getElementById("login-form");
    loginForm?.removeEventListener("submit", handleSubmit);
  };
}
