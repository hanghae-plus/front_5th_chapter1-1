let previousRemoveEventCallback = () => {};
export const renderByNodeElement = (element, removeEventListenerCallback) => {
  const root = document.getElementById("root");
  const firstChild = root.firstElementChild;
  if (firstChild) {
    previousRemoveEventCallback?.();
    previousRemoveEventCallback = removeEventListenerCallback;
    firstChild.replaceWith(element);
  } else {
    root.appendChild(element);
  }
};
