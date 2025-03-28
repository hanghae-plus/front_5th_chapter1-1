export const renderByNodeElement = (element) => {
  const root = document.getElementById("root");
  const firstChild = root.firstElementChild;
  if (firstChild) {
    firstChild.replaceWith(element);
  } else {
    root.appendChild(element);
  }
};
