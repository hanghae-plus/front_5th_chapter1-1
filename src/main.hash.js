import routeConfig from "./config/routerConfig.js";
import router from "./module/route.js";
import render from "./App.js";

// DOM 초기화
document.body.innerHTML = `<div id="root"></div>`;

// 해시 모드로 설정
routeConfig.setMode("hash");

// 초기 렌더링
render();

// 라우터 초기화
router.init();
