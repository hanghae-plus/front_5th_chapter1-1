const userStore = {
  state: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
  },
  observers: new Set(),

  getUser() {
    return this.state.user;
  },

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.state.user = user;
    this.notify();
    return user;
  },

  clearUser() {
    localStorage.removeItem("user");
    this.state.user = null;
    this.notify();
    return null;
  },

  isLoggedIn() {
    return !!this.state.user;
  },

  subscribe(observer) {
    this.observers.add(observer);
  },

  unsubscribe(observer) {
    this.observers.delete(observer);
  },

  notify() {
    this.observers.forEach((observer) => observer(this.state.user));
  },
};

export default userStore;
