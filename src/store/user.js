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
  }

  get() {
    return this.user;
  }

  save() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  clear() {
    localStorage.removeItem("user");
  }
}
