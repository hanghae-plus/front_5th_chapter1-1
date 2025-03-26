//전역객체
const globalState = {
  //상태 가져오기
  getUser(key) {
    //type 확인
    return JSON.parse(localStorage.getItem(key));
  },

  //상태 설정
  setUser(key, value) {
    // this.user = user;
    localStorage.setItem(key, JSON.stringify(value));
  },

  //상태 초기화
  initUser(key) {
    localStorage.removeItem(key);
  },
};

export default globalState;
