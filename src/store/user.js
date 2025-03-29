export default class User {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user")) || {};
  }
  get() {
    return this.user;
  }
  set({ username = "", email = "", bio = "" }) {
    this.user = {
      username,
      email,
      bio,
    };
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  isLogin() {
    return this.get().username ? true : false;
  }
  clear() {
    localStorage.removeItem("user");
  }
}
