export function mount(rootId) {
  const root = getElement(rootId);

  if (root) {
    root.innerHTML = "";
  } else {
    document.body.innerHTML = `<div id='${rootId}'></div>`;
  }

  return root;
}

export function getElement(selector) {
  try {
    if (typeof selector === "string") {
      return document.querySelector(selector);
    } else {
      return selector;
    }
  } catch (error) {
    throw new Error("올바른 셀렉터를 입력해주세요.", error);
  }
}
