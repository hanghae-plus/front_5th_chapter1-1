// 만들었었으나 미사용

/**
 * String to Element, create element
 * @param {string | string[]} element
 * @returns ChildNode
 */
export const $CE = (element) => {
  const div = document.createElement("div");
  div.innerHTML = typeof element === "string" ? element : element.join("\n");
  const node = Array.from(div.childNodes).find(
    (node) => node.nodeType === Node.ELEMENT_NODE,
  );
  return node || div;
};

/**
 * Append Child
 * @param {Node} target ParentNode
 * @param {ChildNode[]} arr ChildNodes
 * @returns target
 */

export const $AC = (target, arr) => {
  arr?.forEach((el) => target.appendChild(el));
  return target;
};
