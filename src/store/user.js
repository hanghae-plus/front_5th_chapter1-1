let isLoggedIn = false;
const user = {
  setIsLoggedIn(state) {
    isLoggedIn = typeof state === "boolean" ? state : !isLoggedIn;
  },
  getIsLoggedIn() {
    return isLoggedIn;
  },
};

console.log(`isLoggedIn : ${isLoggedIn}`);

export default user;
