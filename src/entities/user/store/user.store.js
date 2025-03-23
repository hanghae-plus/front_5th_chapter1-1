class UserStore {
  constructor() {
    this.user = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  updateUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    return this.user ?? null;
  }

  removeUser() {
    localStorage.removeItem("user");
    this.user = null;
  }
  getIsLogin() {
    return this.user !== null;
  }
}

// ? 여기도 singleton pattern을 위해 사용
export const userStore = new UserStore();
