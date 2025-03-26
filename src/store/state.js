export const state = {
  _user: JSON.parse(localStorage.getItem("user")) || null,
  get loggedIn() {
    return !!this._user;
  },
  get user() {
    return this._user;
  },
  setUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    this._user = userData;
  },
  logout() {
    localStorage.removeItem("user");
    this._user = null;
  },
  init() {
    window.addEventListener("storage", () => {
      this._user = JSON.parse(localStorage.getItem("user")) || null;
    });
  },
};

state.init();
