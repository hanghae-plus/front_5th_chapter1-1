export default class User {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user")) || {};
  }
  set({ username = "", email = "", bio = "" }) {
    this.user = {
      username,
      email,
      bio,
    };
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  get() {
    return this.user;
  }
  clear() {
    localStorage.removeItem("user");
  }
  isLogin() {
    return this.get().username ? true : false;
  }
}
