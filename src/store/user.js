const user = {
  isLoggedIn: false,
  setIsLoggedIn(state) {
    if (state !== undefined) {
      this.isLoggedIn(state);
    } else {
      this.isLoggedIn = !this.isLoggedIn;
    }
  },
};

export default user;
