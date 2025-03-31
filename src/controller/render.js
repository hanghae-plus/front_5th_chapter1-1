/**
 * HTML Elemnet를 parameter로 page 변경
 * @param {HTMLElement} page //
 */
const render = (page) => {
  document.body.innerHTML = page;
};

export default render;
