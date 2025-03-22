import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./template.js";

const loginUser = { id: "", password: "" };

const createTemplate = (url = "") => {
  const template = document.createElement("template");
  if (url === "/profile") template.innerHTML = ProfilePage();
  else if (url === "/login") template.innerHTML = LoginPage();
  else if (url === "" || url === "/") template.innerHTML = MainPage();
  else if (url === "/error") template.innerHTML = ErrorPage();
  else template.innerHTML = ErrorPage();
  const content = template.content;

  const loginButton = content.querySelector("li:has(a[href='/login'])");
  const logoutButton = content.querySelector("li:has(a[href='/logout'])");
  const profileButton = content.querySelector("li:has(a[href='/profile'])");

  if (loginUser.id) {
    if (loginButton) loginButton.style.display = "none";
  } else {
    if (logoutButton) logoutButton.style.display = "none";
    if (profileButton) profileButton.style.display = "none";
  }

  content.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let url = e.target.getAttribute("href");
      if (url === "/profile" && !loginUser.id) url = "/login";
      history.pushState({}, "", url);
      root.innerHTML = "";
      root.appendChild(createTemplate(url));
    });
  });
  return content;
};

window.onpopstate = () => {
  root.innerHTML = "";
  root.appendChild(createTemplate(location.pathname));
};

const root = document.querySelector("#root");
root.appendChild(createTemplate());
