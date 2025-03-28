export const USER_STORAGE_KEY = "user";

export const auth = {
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "{}");
    } catch (error) {
      console.error("Error parsing user data:", error);
      return {};
    }
  },

  setUser: (userData) => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  },

  removeUser: () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  },

  isAuthenticated: () => {
    try {
      return !!localStorage.getItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }
  },
};
