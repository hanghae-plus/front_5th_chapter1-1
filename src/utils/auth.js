export const USER = "user";

export const USER_DATA = { username: "testuser", email: "", bio: "" };

export const authManager = {
  isLoggedIn(key) {
    return localStorage.getItem(key) !== null;
  },

  getUserData(key) {
    return JSON.parse(localStorage.getItem(key) || "null");
  },

  logout(key) {
    localStorage.removeItem(key);
  },

  setUserData(key, user) {
    localStorage.setItem(key, JSON.stringify(user));
  },
};
