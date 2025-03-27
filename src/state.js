export const state = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("user")),

  setUserInfo(info) {
    this.user = info;
    if (info) {
      localStorage.setItem("user", JSON.stringify(info));
    } else {
      localStorage.removeItem("user");
    }
  },

  setIsLoggedIn(val) {
    this.isLoggedIn = val;
    localStorage.setItem("isLoggedIn", val);
  },
};
