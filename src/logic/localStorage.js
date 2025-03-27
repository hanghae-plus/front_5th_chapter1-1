const USER_KEY = "user";

export function getUserInfoFromStorage() {
  const userInfoFromLocalStorage = localStorage.getItem(USER_KEY);
  return userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null;
}

export function setUserInfoToStorage(userInfo) {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
}

export function removeUserInfoFromStorage() {
  localStorage.removeItem(USER_KEY);
}
