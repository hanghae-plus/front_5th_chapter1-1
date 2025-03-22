/**
 * String TO Element
 * @param {string | string[]} element
 * @returns DocumentFragment
 */
export const $CE = (element) => {
  const template = document.createElement("template");
  template.innerHTML =
    typeof element === "string" ? element : element.join("\n");
  return template.content;
};
