export const userUtils = {
  getUser: () => localStorage.getItem("user"),
  setUser: (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
  },
  isLoggedIn: () => {
    return userUtils.getUser() !== null;
  },
  logout: () => {
    localStorage.removeItem("user");
  },
};
