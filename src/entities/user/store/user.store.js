import { User } from "../model/user";

class UserStore {
  user;
  constructor() {
    // ? 1-4 SPA를 만들기 위한 지식 뭉치에서 나오는 코드 패턴
    // if (UserStore.instance) return UserStore.instance;
    // UserStore.instance = this;

    this.user = null;
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user.toEntity()));
  }

  updateUser(userData) {
    const user = User.build({ ...this.user.toEntity(), ...userData });
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user.toEntity()));
  }

  getUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !this.user) {
      const userData = JSON.parse(storedUser);
      this.user = User.build(userData);
    }
    return this.user ?? null;
  }

  removeUser() {
    localStorage.removeItem("user");
    this.user = null;
  }

  getIsLogin() {
    return this.getUser() !== null;
  }
}

// ? singleton pattern을 위해 사용
export const userStore = new UserStore();
