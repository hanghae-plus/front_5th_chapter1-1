import page from "./pages";

export const render = () => {
  const renderPage = page();
  renderPage();
};

// 앞으로 가기, 뒤로 가기 이벤트에 실행됨
window.addEventListener("popstate", () => {
  render();
});

render();
