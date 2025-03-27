import ErrorPage from "@/pages/error-page";
const routes = {};
let afterRender = () => {};

/** route 목록에 path, handler(특정 page 이동)쌍 추가합니다. */
const addRoute = (path, handler) => {
  routes[path] = handler;
};

/** 입력받은 path로 이동합니다.
 *
 * 입력받은 path로 URL을 변경하고, route를 실행합니다.
 */
const navigateTo = (path) => {
  history.pushState(null, "", path);
  handleRoute(path);
};

const setAfterRender = (callback) => {
  afterRender = callback;
};

/**
 * 전달받은 path에 대한 route를 실행합니다.
 *
 * routes 목록에 있으면 대응하는 handler를 실행합니다.
 *
 * routes 목록에 없으면 error page를 보여줍니다.
 *
 */
// const handleRoute = (path) => {
//   const handler = routes[path];
//   if (handler) {
//     document.body.innerHTML = handler();
//   } else {
//     document.body.innerHTML = ErrorPage();
//   }
// };
const handleRoute = (path) => {
  const handler = routes[path];
  const result = handler?.() ?? ErrorPage();

  if (typeof result === "string") {
    const root = document.getElementById("root");
    if (root) root.innerHTML = result;
  }

  afterRender();
};

/**
 * popstate 발생 시 핸들러
 *
 * 뒤로가기, 앞으로가기 동작 시 history 스택에서 이전 항목으로 이동하며 URL이 변경됩니다.
 *
 * 그 후 postate 이벤트가 발생하고, 이 시점의 (변경된 URL의)path에 대해 handleRoute를 실행시켜
 *
 * path에 해당하는 핸들러를 실행(페이지 보여주기)합니다.
 * */
const handlePopState = () => {
  handleRoute(location.pathname);
};
window.addEventListener("popstate", handlePopState);

// 전역 인스턴스로 export
export default { addRoute, navigateTo, setAfterRender };
