import LoginPage, { bindLoginEvent, authStore } from "../../features/auth";
import ProfilePage, { bindProfileEvent } from "../../features/profile";
import MainPage from "../../features/main";
import NotFoundPage from "../../features/error";
import { BASE_URL } from "../../shared/constants/constants";

export const routes = [
  {
    path: `${BASE_URL}/`,
    render: (container) => {
      container.innerHTML = MainPage();
    },
  },
  {
    path: `${BASE_URL}/login`,
    guard: () => !authStore.isLoggedIn(),
    redirect: `${BASE_URL}/`,
    render: (container, router) => {
      container.innerHTML = LoginPage();
      bindLoginEvent(container, router);
    },
  },
  {
    path: `${BASE_URL}/profile`,
    guard: () => authStore.isLoggedIn(),
    redirect: `${BASE_URL}/login`,
    render: (container) => {
      container.innerHTML = ProfilePage("/profile");
      bindProfileEvent(container);
    },
  },
  {
    path: "404",
    render: (container) => {
      container.innerHTML = NotFoundPage();
    },
  },
];
