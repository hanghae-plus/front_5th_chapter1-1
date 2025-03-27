import render from "./_actions/render";
import observer from "./_libs/observer";
import router from "./_libs/router";
import states from "./_libs/state";

states.routeType = "hash";
router.push("/");

window.addEventListener("load", render);
window.addEventListener("popstate", render);
window.addEventListener("hashchange", render);

// 상태를 구독하고 변경 시 리렌더링
observer.subscribe(render);
observer.subscribe(() => console.log("🚀 해시 상태 변경"));
