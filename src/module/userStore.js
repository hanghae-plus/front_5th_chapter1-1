class UserStore {
  constructor() {
    this.observers = new Set();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  // 구독자 추가
  subscribe(observer) {
    this.observers.add(observer);
  }

  // 구독자에게 알림 + 콜백 함수 실행
  notify() {
    this.observers.forEach((observer) => {
      observer(this.user);
    });
  }

  // 유저 정보 조회
  getUser() {
    return this.user;
  }

  // 유저 정보 저장
  saveUser(userData) {
    this.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    this.notify();
  }

  // 유저 정보 삭제
  removeUser() {
    this.user = null;
    localStorage.removeItem("user");
    this.notify();
  }

  // 로그인 여부 확인
  isLoggedIn() {
    return this.user !== null;
  }
}

const userStore = new UserStore(); // 싱글톤 인스턴스 생성
export default userStore;
