export const authStore = {
  user: null,
  listeners: new Set(), // 구독 콜백들을 저장하는 Set

  // 로컬스토리지에서 사용자 정보 불러오기
  init() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  },

  setUser(newUser) {
    this.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));

    this.notify();
  },

  logout() {
    this.user = null;
    localStorage.removeItem("user");

    this.notify();
  },

  getUser() {
    return this.user;
  },

  isLoggedIn() {
    return !!this.user;
  },

  // 상태 변화에 반응할 콜백 등록 (구독)
  subscribe(cb) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  },

  // 모든 구독자에게 현재 사용자 정보 알림
  notify() {
    for (const cb of this.listeners) {
      cb(this.user);
    }
  },
};
