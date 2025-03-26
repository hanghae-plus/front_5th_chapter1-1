export const store = {
  state: {
    loggedIn: !!localStorage.getItem("user"),
  },
  setLoggedIn(value) {
    this.state.loggedIn = value;
  },
  actions: {
    login(username) {
      if (!this.isHash) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email: "", bio: "" }),
        );
        store.setLoggedIn(true);
      }
    },
    logout() {
      if (!this.isHash) {
        localStorage.removeItem("user");
        store.setLoggedIn(false);
      }
    },
  },
};

export default store;
