export const state = {
  isLoggedIn: localStorage.getItem("user")?.username,
  user: { username: "", email: "", bio: "" },
  subscribers: [],

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  setUserInfo(info) {
    this.user = info;
    localStorage.setItem("user", JSON.stringify(info));
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
