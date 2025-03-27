import { storage } from "../utils/storage";

const USER_KEY = "user";

export const authService = {
  getUser() {
    return storage.get(USER_KEY);
  },

  login(user) {
    storage.set(USER_KEY, user);
  },

  logout() {
    storage.remove(USER_KEY);
  },

  isLoggedIn() {
    return this.getUser() !== null;
  },

  updateUser(userData) {
    const currentUser = this.getUser();
    storage.set(USER_KEY, { ...currentUser, ...userData });
  },
};
