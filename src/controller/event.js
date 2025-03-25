import { router } from "./route";

const $loginBtn = document.getElementById("submit-login");

$loginBtn.addEventListener("submit", () => {
  // if (targetId === "submit-login") {
  const $email = document.getElementById("email");
  const emailvalue = $email.innerText;

  const $password = document.getElementById("password");
  const passwordvalue = $password.innerText;

  const item = { email: emailvalue, password: passwordvalue };
  window.localStorage.setItem("userInfo", JSON.stringify(item));

  router.navigateTo("/login");
  // }
});
