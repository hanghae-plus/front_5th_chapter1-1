export const store = {
  state: {
    isLoggedIn: false,
    user: {
      username: "",
      email: "",
      bio: "",
    },
  },
  setUser(user) {
    this.state.user = user;
    this.state.isLoggedIn = true;
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser() {
    this.state.user = { username: "", email: "", bio: "" };
    localStorage.removeItem("user");
    this.state.isLoggedIn = false;
  },
  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.state.user = user;
    }
  },
};
