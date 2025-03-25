function createStore() {
  const state = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  };

  // 상태 키별로 구성된 구독 함수들을 저장
  const listeners = {};

  // 지정된 상태 키의 현재 값을 반환
  function getState(key) {
    return state[key];
  }

  // 특정 상태 속성을 새 값으로 업데이트
  function setState(key, newState) {
    state[key] = newState;

    // 상태 변경 시, 로컬스토리지에도 반영
    if (key === "user") {
      if (!newState) {
        localStorage.removeItem("user");
        return;
      }
      localStorage.setItem("user", JSON.stringify(newState));
    }
    if (key === "isLoggedIn") {
      localStorage.setItem("isLoggedIn", newState ? "true" : "false");
    }

    notify(key);
  }

  // 특정 상태 키가 변경될 때 실행될 콜백 함수를 등록
  function subscribe(key, listener) {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(listener);
  }

  // 특정 상태 키에 등록된 모든 리스너 함수를 실행
  function notify(key) {
    if (listeners[key]) {
      listeners[key].forEach((listener) => listener());
    }
  }

  return { getState, setState, subscribe };
}

const store = createStore();
export default store;
