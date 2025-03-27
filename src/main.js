import App from "./App.js";
import routeConfig from "./config/routerConfig.js";

// 초기 렌더링
document.body.innerHTML = `<div id="root"></div>`;

// 해시 모드로 설정
routeConfig.setMode("history");

// 앱 실행
App();
