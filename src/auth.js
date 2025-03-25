export const UserStorage = {
  preferences: JSON.parse(localStorage.getItem("user")) || {},
  get() {
    return this.preferences;
  },
  set({ username, email = "", bio = "" }) {
    this.preferences.username = username;
    this.preferences.email = email;
    this.preferences.bio = bio;
    this.save();
  },
  save() {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(this.preferences));
  },
  clear() {
    localStorage.removeItem("user");
  },
};

export default {
  loggedIn: localStorage.getItem("user") ? true : false,
  username: "",
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
    history.pushState({ path: "/login" }, "", "/login");
  },
  getUser() {
    return UserStorage.get();
  },
  setUser(user = { username: this.username, email: "", bio: "" }) {
    UserStorage.set(user);
  },
};
