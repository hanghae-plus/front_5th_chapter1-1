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
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(this.preferences));
  },
  clear() {
    localStorage.clear();
  },
};

export default {
  loggedIn: false,
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
    history.pushState({ path: "/" }, "", "/");
  },
  getUser() {
    return UserStorage.get();
  },
  setUser(user = { username: this.username, email: "", bio: "" }) {
    UserStorage.set(user);
  },
};
