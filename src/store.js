const DEFAULT_STATE = {
  isLoggedIn: false,
  userInfo: { name: "", introduction: "" },
};

export const Store = {
  localStorageKey: "user-data",

  //상태 가져올 때
  getState() {
    const item = localStorage.getItem(this.localStorageKey);
    return item ? JSON.parse(item) : DEFAULT_STATE;
  },

  //상태 저장 시
  setState(newState) {
    const json = JSON.stringify(newState);
    localStorage.setItem(this.localStorageKey, json);
  },
};
