export const model = {
  path: "/",
  isLoggedIn: false,

  setPath(newPath) {
    this.path = newPath;
  },

  setLoginStatus(status) {
    this.isLoggedIn = status;
  },
};
