export const authStore = {
  get user() {
    return JSON.parse(localStorage.getItem("user") || "null");
  },
  set user(data) {
    localStorage.setItem("user", JSON.stringify(data));
  },
  clear() {
    localStorage.removeItem("user");
  },
};
