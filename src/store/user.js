let isLoggedIn = !!localStorage.getItem("user");
const user = {
  setIsLoggedIn(state) {
    isLoggedIn = typeof state === "boolean" ? state : !isLoggedIn;
  },
  getIsLoggedIn() {
    return isLoggedIn;
  },
};

export default user;
