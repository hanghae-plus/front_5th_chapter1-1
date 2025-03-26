import render from "./_actions/render";
import observer from "./_libs/observer";
import state from "./_libs/state";

state.routeType = "history";

window.addEventListener("load", render);
window.addEventListener("popstate", render);

// 상태를 구독하고 변경 시 리렌더링
observer.subscribe(render);
observer.subscribe(() => console.log("🚀 히스토리 상태 변경"));
