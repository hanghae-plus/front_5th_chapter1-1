class LocalStorage {
  constructor() {
    const initUserInfo = window.localStorage.getItem("user");
    this.userInfo = initUserInfo ? JSON.parse(initUserInfo) : null;
  }
  init() {
    window.localStorage.removeItem("user");
    this.init();
  }

  getStorage() {
    return this.userInfo;
  }

  setStorage(userInfo) {
    window.localStorage.setItem("user", JSON.stringify(userInfo));
    this.userInfo = userInfo;
  }
}

export const storage = new LocalStorage();
