// 전역 상태 관리
// 상태 관리할 변수 프라이빗 형태
function state() {
  let info = {
    username: '',
    email: '',
    bio: '',
  };
  function updateState({ username, email, bio }) {
    if (username === '' && email === '' && bio === '') {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify({ username, email, bio }));
    }
    info = { username, email, bio };
  }
  function getState() {
    return info;
  }

  function isLogin() {
    return info.username ? true : false;
  }
  return {
    updateState: updateState,
    getState: getState,
    isLogin: isLogin,
  };
}

export const pageState = state();
