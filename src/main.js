// path: ~/Develop/front_5th_chapter1-1/src/main.js
import { router } from "./router/router.js";

// 초기화 함수
const init = () => {
  // 루트 요소 확인
  if (!document.getElementById("root")) {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  } else {
    // 이미 루트가 있으면 비우기
    document.getElementById("root").innerHTML = "";
  }

  // 라우터 초기 렌더링
  router.render();

  // 앞으로/뒤로 버튼 이벤트 처리
  window.addEventListener("popstate", () => {
    // state를 router에서 가져와야 함
    router.state.currentPath = window.location.pathname;
    router.render();
  });
};

// 앱 시작
init();
