class UserStore {
  #userInfo = null;
  #localKey = "user";
  static instance;

  constructor() {
    if (UserStore.instance) return UserStore.instance;
    UserStore.instance = this;
    this.#userInfo = JSON.parse(localStorage.getItem(this.#localKey) || "null");
  }

  setUserInfo(info) {
    this.#userInfo = info;
    localStorage.setItem(this.#localKey, JSON.stringify(info));
  }

  removeUserInfo() {
    this.#userInfo = null;
    localStorage.removeItem(this.#localKey);
  }

  get userInfo() {
    return this.#userInfo;
  }

  get isAuthenticated() {
    return this.#userInfo !== null;
  }
}

export function useUserStore() {
  return new UserStore();
}
