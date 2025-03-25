import routeConfig from "./config/routerConfig";
import router from "./module/route";
import render from "./App";

// DOM 초기화
document.body.innerHTML = `<div id="root"></div>`;

// 해시 모드로 설정
routeConfig.setMode("hash");

// 초기 렌더링
render();

// 라우터 초기화
router.init();
