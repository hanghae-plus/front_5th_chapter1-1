export const store = {
  state: {
    loggedIn: false,
  },
  setLoggedIn(value) {
    this.state.loggedIn = value;
  },
};

export default store;
