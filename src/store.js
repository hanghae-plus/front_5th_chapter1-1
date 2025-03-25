const DEFAULT_USER_INFO = { username: "", email: "", bio: "" };

export const Store = {
  localStorageKey: "user",

  //상태 가져올 때
  getUser() {
    const item = localStorage.getItem(this.localStorageKey);
    return item ? JSON.parse(item) : DEFAULT_USER_INFO;
  },

  //상태 저장 시
  setUser(newState) {
    const json = JSON.stringify(newState);
    localStorage.setItem(this.localStorageKey, json);
  },
  //로그인 시
  logIn() {
    const user = this.getUser();
    return Boolean(user.username);
  },
  //로그 아웃 시
  logout() {
    this.setUser(null);
    localStorage.removeItem(this.localStorageKey);
  },
};
