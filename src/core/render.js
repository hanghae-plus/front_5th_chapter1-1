import { registerEvent, resetEvent } from "./event";

const render = (component) => {
  const root = document.getElementById("root");

  // 컴포넌트 호출 전 이벤트 초기화
  resetEvent();

  // 컴포넌트 렌더링
  root.innerHTML = component();

  // 컴포넌트 호출 후 이벤트 등록
  registerEvent(root);
};

export default render;
