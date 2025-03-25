/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} bio
 */

const store = {
  state: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  /**
   * @param {User | null} user
   */
  setUser(user) {
    if (!user) {
      this.state.user = null;
      localStorage.removeItem("user");
      return;
    }

    this.state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  updateUser(user) {
    if (!this.state.user) {
      return;
    }

    this.state.user = { ...this.state.user, ...user };
    localStorage.setItem("user", JSON.stringify(this.state.user));
  },
  isLoggedIn() {
    return this.state.user !== null;
  },
};

export default store;
