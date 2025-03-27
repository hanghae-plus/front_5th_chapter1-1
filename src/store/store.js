import { MOCK_POSTS } from "../util/data";

class Store {
  #userInfo = null;
  #localKey = "user";
  state = {
    loggedIn: false,
    posts: MOCK_POSTS,
  };

  constructor() {
    this.#userInfo = JSON.parse(localStorage.getItem(this.#localKey) || "null");
    this.state.loggedIn = this.#userInfo !== null;
  }

  setUserInfo(info) {
    this.#userInfo = info;
    localStorage.setItem(this.#localKey, JSON.stringify(info));
    this.state.loggedIn = true;
  }

  removeUserInfo() {
    this.#userInfo = null;
    localStorage.removeItem(this.#localKey);
    this.state.loggedIn = false;
  }

  get userInfo() {
    return this.#userInfo;
  }

  getState() {
    return this.state;
  }
}

const store = new Store();

export default store;

export function useStore() {
  return store;
}
