class Auth {
  constructor() {
    this.user = null;
    this.isLoggedIn = false;
    this.listeners = [];
  }

  getUserInfo() {
    return this.user;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  setUserInfo(user) {
    this.user = user;
    this.isLoggedIn = true;
    this._notifyListeners();
  }

  clearUserInfo() {
    this.user = null;
    this.isLoggedIn = false;
    this._notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  _notifyListeners() {
    const state = { user: this.user, isLoggedIn: this.isLoggedIn };

    this.listeners.forEach((listener) => listener(state));
  }
}

const auth = new Auth();

export default auth;
