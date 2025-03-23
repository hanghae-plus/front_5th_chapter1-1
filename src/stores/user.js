class UserStore {
  #userInfo = null;
  #localKey = "userInfo:v1";
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
