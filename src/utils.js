export const createNodeElement = (str) => {
  const frag = document.createDocumentFragment();

  const elem = document.createElement("div");
  elem.innerHTML = str;

  while (elem.childNodes[0]) {
    frag.appendChild(elem.childNodes[0]);
  }

  return frag.firstElementChild;
};

export const renderByNodeElement = (element) => {
  const root = document.getElementById("root");
  const firstChild = root.firstElementChild;
  if (firstChild) {
    firstChild.replaceWith(element);
  } else {
    root.appendChild(element);
  }
};
