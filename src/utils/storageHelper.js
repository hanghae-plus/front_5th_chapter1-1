const storageKey = {
  user: "user",
};

class StorageHelper {
  static saveUserInfo(user) {
    localStorage.setItem(storageKey.user, JSON.stringify(user));
  }

  static getUserInfo() {
    const userInfo = localStorage.getItem(storageKey.user);
    return userInfo ? JSON.parse(userInfo) : "";
  }

  static logout() {
    localStorage.removeItem(storageKey.user);
  }

  static isLoggedIn() {
    return localStorage.getItem(storageKey.user) ? true : false;
  }
}

export default StorageHelper;
