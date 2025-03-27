import {
  getStoreValue,
  removeStoreValue,
  setStoreValue,
} from "../utils/local-storage";

const initialState = {
  isLoggedIn: false,
  user: {
    username: "",
    email: "",
    bio: "",
  },
};

class Store {
  constructor() {
    this.state = initialState;
  }

  syncState(key) {
    this.state = {
      ...this.state,
      [key]: getStoreValue(key),
    };
  }

  setState(key, value) {
    setStoreValue(key, value);
  }

  clearState(key) {
    removeStoreValue(key);
  }

  getState(key) {
    this.syncState(key);
    return this.state?.[key] ?? initialState[key];
  }
}

export const store = new Store();
