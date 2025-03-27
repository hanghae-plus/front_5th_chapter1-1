// 전역 상태 관리
// 상태 관리할 변수 프라이빗 형태
function state() {
  let info = {
    username: '',
    email: '',
    bio: '',
  };
  function updateState({ username, email, bio }) {
    info = { username, email, bio };
  }
  function getState() {
    return info;
  }
  return {
    updateState: updateState,
    getState: getState,
  };
}

export const pageState = state();
