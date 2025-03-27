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
    this.state.isLoggedIn = !!user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  clearUser() {
    this.state.user = { username: "", email: "", bio: "" };
    this.state.isLoggedIn = false;
    localStorage.removeItem("user");
  },
  getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.state.user = user;
      this.state.isLoggedIn = true;
    }
  },
};
