// 전역 상태 관리
// 상태 관리할 변수 프라이빗 형태
function state() {
  /* 테스트코드에서 goto 함수는 페이지를 리로드해서 기존 메모리에 저장된 info가 날라감
   * 따라서 localStorage에서 가져오도록 변경
   */
  // let info = {
  //   username: '',
  //   email: '',
  //   bio: '',
  // };
  function updateState({ username, email, bio }) {
    if (username === '' && email === '' && bio === '') {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify({ username, email, bio }));
    }
    // info = { username, email, bio };
  }

  function getState() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
  }

  function isLogin() {
    const userInfo = getState();
    return userInfo && userInfo.username ? true : false;
  }
  return {
    updateState: updateState,
    getState: getState,
    isLogin: isLogin,
  };
}

export const pageState = state();
