export const user = {
  loggedIn() {
    return !!this.getUser();
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    const currentUserData = this.getUser();
    const newUserData = {
      ...currentUserData,
      ...user,
    };

    localStorage.setItem("user", JSON.stringify(newUserData));
  },

  login(username, email = "", bio = "") {
    const user = { username, email, bio };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem("user");
  },
};
