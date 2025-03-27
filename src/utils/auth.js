import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "./storage.js";

import auth from "../store/auth.js";

const LOCAL_STORAGE_KEY = "user";

const signIn = ({ username, email, bio }) => {
  const userInfo = { username, email, bio };

  auth.setUserInfo(userInfo);
  setLocalStorageItem(LOCAL_STORAGE_KEY, userInfo);

  window.navigateTo("/");

  return userInfo;
};

const signOut = () => {
  const currentUser = getLocalStorageItem(LOCAL_STORAGE_KEY);

  if (!currentUser) {
    return;
  }

  auth.clearUserInfo();
  removeLocalStorageItem(LOCAL_STORAGE_KEY);

  window.navigateTo("/login");
};

const getIsLoggedIn = () => {
  return auth.getIsLoggedIn();
};

const restoreAuth = () => {
  const userInfo = getLocalStorageItem(LOCAL_STORAGE_KEY);

  if (!userInfo) {
    auth.clearUserInfo();
    return;
  }

  auth.setUserInfo(userInfo);

  return userInfo;
};

export { signIn, signOut, getIsLoggedIn, restoreAuth };
