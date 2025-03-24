export const navigateTo = (path) => {
  history.pushState(null, "", path);
  // 렌더링 이슈
  setTimeout(() => window.render(), 0);
};
