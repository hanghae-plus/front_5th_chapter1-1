import router from "../_libs/router";

/** `<a>` 기본 동작을 막고, 클릭 시 페이지 이동하는 함수 */
const interceptAnchors = () => {
  // 이벤트 버블링을 이렇게 예시로들면 솔직히 이건 좀 억지 아닌가요?
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const href = e.target.href;
      const targetPathname = href.replace(window.location.origin, "");

      router.push(targetPathname);
    }
  });
};

export default interceptAnchors;
