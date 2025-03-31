import { MainPage } from "../pages/Home";
import { addEventLogin, LoginPage } from "../pages/Login";
import { addEventProfile, ProfilePage } from "../pages/Profile";
import { storage } from "../utils/localstorage";
import { router } from "../utils/route";

export function loadContent(content, addevent) {
  // document.body.innerHTML = content;
  document.getElementById("root").innerHTML = content;
  if (addevent) {
    addevent();
  }
}

function addRoute() {
  const userInfo = storage.getStorage();
  const isUserInfo = userInfo?.username;
  router.addRoute("/", () => loadContent(MainPage(userInfo)));
  router.addRoute("/profile", () => {
    isUserInfo
      ? loadContent(ProfilePage(userInfo), addEventProfile)
      : router.navigateTo("/login");
  });
  router.addRoute("/login", () => loadContent(LoginPage(), addEventLogin));
}

function handleRouter() {
  window.addEventListener("load", () => {
    addRoute();
    const currentPath = window.location.pathname;
    router.handleRoute(currentPath);
  });
}

function init_routes() {
  handleRouter();
}

export default init_routes;
