import { MainPage, NotFoundPage, LoginPage, ProfilePage } from "./pages";
import { useUserStore } from "./stores/user";

export const routes = {
  "/": { redirect: "/main" },
  "/login": { component: LoginPage },
  "/main": { component: MainPage },
  "/profile": { component: ProfilePage },
  "*": { component: NotFoundPage },
};

export const onBeforeEach = (nextPathname, next) => {
  const userStore = useUserStore();
  if (!userStore.isAuthenticated && nextPathname === "/profile") {
    next("/login");
  } else if (userStore.isAuthenticated && nextPathname === "/login") {
    next("/");
  } else {
    next();
  }
};
