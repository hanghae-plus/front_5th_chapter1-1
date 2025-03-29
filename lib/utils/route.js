/**
 * 주어진 경로와 일치하는 라우트 객체를 찾습니다.
 * @param {string} path - 찾고자 하는 URL 경로
 * @param {Array} routes - 라우트 객체 배열
 * @returns {Object|undefined} - 일치하는 라우트 객체 또는 undefined
 */
export const findRouteByPath = (path, routes) => {
  return routes.find((route) => route.path === path);
};
