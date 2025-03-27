export const state = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("user")),
  subscribers: [],

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  setUserInfo(info) {
    this.user = info;
    if (info) {
      localStorage.setItem("user", JSON.stringify(info));
    } else {
      localStorage.removeItem("user");
    }
    this.notify();
  },

  setIsLoggedIn(val) {
    this.isLoggedIn = val;
    localStorage.setItem("isLoggedIn", val);
    this.notify();
  },

  notify() {
    this.subscribers.forEach((callback) => callback());
  },
};
