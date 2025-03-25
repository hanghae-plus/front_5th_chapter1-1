export default class LoginStore {
  userInfo;
  key = "user";

  constructor() {
    if (LoginStore.instance) {
      return LoginStore.instance;
    }
    // localstorage에서 초기값을 받아오기
    const defaultValue = localStorage.getItem(this.key);
    this.userInfo = JSON.parse(defaultValue);
    LoginStore.instance = this;
  }

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(newUserInfo) {
    if (newUserInfo == null) {
      localStorage.removeItem(this.key);
      return;
    }

    this.userInfo = newUserInfo;
    localStorage.setItem(this.key, JSON.stringify(newUserInfo));
  }

  isLoggedIn() {
    return this.userInfo != null;
  }
}
