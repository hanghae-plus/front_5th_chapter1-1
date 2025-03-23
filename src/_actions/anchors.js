import goTo from "./goTo";

/** `<a>` 기본 동작을 막고, 클릭 시 페이지 이동하는 함수 */
const initLinkNavigation = () => {
  const $anchors = document.querySelectorAll("a");

  $anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      /** @type {HTMLAnchorElement} */
      const event = e;
      /** @type {string} */
      const href = event.target.href;
      const targetPathname = href.replace(window.location.origin, "");

      goTo(targetPathname);
    });
  });
};

export default initLinkNavigation;
