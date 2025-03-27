import { baseURL } from "../main.js";

export function isHashUrl() {
  return location.hash ? true : false;
}

export function getPath() {
  // 최초 index.hash.html 로드시
  if (!location.hash && location.pathname === `/index.hash.html`) {
    history.pushState({}, '', `/index.hash.html#${baseURL}`);
  }
  return isHashUrl() ? changeToBaseRoute(location.hash) : location.pathname;
}

// 해시라우터를 일반 라우터로 변경
export function changeToBaseRoute(route) {
  return route.substr(1, route.length);
}

//  일반 라우터를 해시라우터로 변경
export function changeToHashRoute(route) {
  return '#' + route;
}
