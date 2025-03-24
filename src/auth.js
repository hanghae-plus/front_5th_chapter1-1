export const UserStorage = {
  preferences: JSON.parse(localStorage.getItem("user")) || {},
  get(key) {
    return this.preferences[key];
  },
  set({ username, email = "", bio = "" }) {
    this.preferences.username = username;
    this.preferences.email = email;
    this.preferences.bio = bio;
    this.save();
  },
  save() {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(this.preferences));
  },
  clear() {
    localStorage.clear();
  },
};

export default {
  loggedIn: false,
  login(username) {
    UserStorage.set({
      username,
    });
    this.loggedIn = true;
    history.pushState({ path: "/" }, "", "/");
  },
  logout() {
    this.loggedIn = false;
    UserStorage.clear();
    history.pushState({ path: "/" }, "", "/");
  },
};
