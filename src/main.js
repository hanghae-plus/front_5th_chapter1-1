// path: ~/Develop/front_5th_chapter1-1/src/main.js
import { router } from "./router/router.js";

// 초기화 함수
const init = () => {
  // 루트 요소가 없으면 생성, 있으면 비우기
  const existingRoot = document.getElementById("root");
  if (!existingRoot) {
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  } else {
    existingRoot.innerHTML = "";
  }

  // 라우터 초기 렌더링
  router.render();
};

// 앱 시작
init();
