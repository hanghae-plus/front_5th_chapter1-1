/**
 * ### 1) 라우팅 구현
 *
 * - History API를 사용하여 SPA 라우터 구현
 *     - '/' (홈 페이지)
 *     - '/login' (로그인 페이지)
 *     - '/profile' (프로필 페이지)
 * - 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
 * - 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
 * - 주소가 변경되어도 새로고침이 발생하지 않아야 한다.
 */

import render from "../../render";

let _routes = null;
let _errorRoute = null;

const createRouter = (routes = []) => {
  _routes = routes;
  _errorRoute = routes.find((route) => route.type === "error");

  return _routes;
};

const getCurrentComponent = () => {
  const currentPath = location.pathname;
  const currentRoute = _routes.find((route) => route.path === currentPath);

  return currentRoute ? currentRoute.component : _errorRoute.component;
};

const navigate = (path) => {
  const targetRoute = _routes.find((route) => route.path === path);

  // path에 해당하는 route 정보가 없으면 에러 컴포넌트 렌더링
  if (!targetRoute) {
    history.replaceState({}, "", _errorRoute.path);
    render(_errorRoute.component);
  }

  // path 받아서 history에 추가
  history.pushState({}, "", targetRoute.path);
  render(targetRoute.component);
};

const isMatched = (path) => {
  return location.pathname === path;
};

window.addEventListener("popstate", () => {
  navigate(location.pathname);
});

export { getCurrentComponent, createRouter, navigate, isMatched };
