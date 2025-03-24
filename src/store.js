const DEFAULT_USER_INFO = { username: "", email: "", bio: "" };

export const Store = {
  localStorageKey: "user",

  //상태 가져올 때
  getState() {
    const item = localStorage.getItem(this.localStorageKey);
    return item ? JSON.parse(item) : DEFAULT_USER_INFO;
  },

  //상태 저장 시
  setState(newState) {
    const json = JSON.stringify(newState);
    localStorage.setItem(this.localStorageKey, json);
  },
  //로그인 시
  logIn() {
    const user = this.getState();
    return Boolean(user.username);
  },
  //로그 아웃 시
  logout() {
    this.setState(null);
    localStorage.removeItem(this.localStorageKey);
  },
};
