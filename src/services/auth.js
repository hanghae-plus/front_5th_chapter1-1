import store from "../store.js";

const AUTH_KEY = "user";

const login = ({ username, email, bio }) => {
  const userData = {
    username,
    email,
    bio,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));

  store.setState({
    user: userData,
    isLoggedIn: true,
  });

  window.navigateTo("/");

  return userData;
};

const logout = () => {
  const loggedInUSer = localStorage.getItem(AUTH_KEY);
  if (!loggedInUSer) {
    return;
  }
  localStorage.removeItem(AUTH_KEY);

  store.setState({
    user: null,
    isLoggedIn: false,
  });

  window.navigateTo("/login");
};

const isLoggedIn = () => {
  return store.getState().isLoggedIn;
};

const getCurrentUser = () => {
  return store.getState().user;
};

const updateUser = ({ username, email, bio }) => {
  const userData = {
    username,
    email,
    bio,
  };

  store.setState({
    user: userData,
  });

  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
};

const keepAuth = () => {
  const userData = localStorage.getItem(AUTH_KEY);
  if (!userData) {
    store.setState({
      user: null,
      isLoggedIn: false,
    });
    return;
  }

  const parsedUserData = JSON.parse(userData);
  store.setState({
    user: parsedUserData,
    isLoggedIn: true,
  });

  return parsedUserData;
};

export { login, logout, updateUser, isLoggedIn, getCurrentUser, keepAuth };
