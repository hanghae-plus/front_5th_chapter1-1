const isProduction = import.meta.env.MODE === "production";
const BASE = isProduction ? "/front_5th_chapter1-1" : "";

const router = {
  // hash모드이면 #을 제거한 /login OR / 아니면 그냥 pathname(history mode)
  getCurrentPath: () => {
    // console.log("start getCurrentPath");
    const isHashMode =
      window.location.pathname.includes("index.hash.html") ||
      window.location.hash !== "";

    // 배포모드이고 해쉬모드일 때
    if (isProduction && isHashMode) {
      return isHashMode
        ? BASE + window.location.hash.slice(1) || BASE + "/"
        : window.location.pathname;
    } else {
      return isHashMode
        ? window.location.hash.slice(1) || "/"
        : window.location.pathname;
    }
  },
  navigate: (path) => {
    // console.log("router - navigate");
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
