const render = (component) => {
  const root = document.getElementById("root");

  // 컴포넌트 렌더링
  root.innerHTML = component();
};

export default render;
