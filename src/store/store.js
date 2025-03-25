// src/store/store.js

import handleRoute from "../router";

export const store = {
  state: {
    loggedIn: !!localStorage.getItem("user"),
  },
  setLoggedIn(value) {
    this.state.loggedIn = value;
  },
  logout() {
    localStorage.removeItem("user");
    this.setLoggedIn(false);
    window.history.pushState({}, "", "/login");
    handleRoute();
  },
};

export default store;
