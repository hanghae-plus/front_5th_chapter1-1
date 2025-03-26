import { ROUTE } from "../router/routes";

const isLoggedIn = () => !!localStorage.getItem("user");
const getUser = () =>
  isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;
const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const onLogin = (user) => {
  setUser(user);
  window.navigate(ROUTE.HOME.path, true);
};

const onLogout = () => {
  localStorage.clear();
  window.navigate(ROUTE.LOGIN.path, true);
};

export { isLoggedIn, getUser, setUser, onLogin, onLogout };
