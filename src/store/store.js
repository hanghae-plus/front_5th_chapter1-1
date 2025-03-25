// src/store/store.js

export const store = {
  state: {
    loggedIn: !!localStorage.getItem("user"),
  },
  setLoggedIn(value) {
    this.state.loggedIn = value;
  },
};

export default store;
