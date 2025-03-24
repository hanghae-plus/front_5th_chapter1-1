class UserStore {
  constructor() {
    // ? 1-4 SPA를 만들기 위한 지식 뭉치에서 나오는 코드 패턴
    // if (UserStore.instance) return UserStore.instance;
    // UserStore.instance = this;

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
    this.user = { ...this.user, ...user };
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

// ? singleton pattern을 위해 사용
export const userStore = new UserStore();
