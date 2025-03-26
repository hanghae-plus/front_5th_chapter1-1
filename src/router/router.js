// 가존에 이 부분을 넣었는데, 테코에서는 호출이라고 해야되나.. 그게 안되서.. 음. 빼고 각 함수안에다가 임시로 집어넣음./
// const isHashMode =
//   window.location.pathname.includes("index.hash.html") ||
//   window.location.hash !== "";

// if(window.location.pathname.includes("index.hash.html") && window.)
console.log("나는 router.js야");

const router = {
  // hash모드이면 #을 제거한 /login OR / 아니면 그냥 pathname(history mode)
  getCurrentPath: () => {
    // console.log("getCurrentPath");
    const isHashMode =
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== "";

    return isHashMode
      ? window.location.hash.slice(1) || "/"
      : window.location.pathname;
  },
  navigate: (path) => {
    console.log("router - navigate");
    const isHashMode =
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== "";

    if (isHashMode) {
      window.location.hash = path; // Hash Router 방식
    } else {
      window.history.pushState({}, "", path); // History Router 방식
      //   window.dispatchEvent(new Event("popstate")); // 라우트 변경 이벤트 발생
    }
  },
};

export default router;
