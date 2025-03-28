export default (children) => {
  let element = document.createElement("main");
  element.classList.add(
    "bg-gray-100",
    "flex",
    "items-center",
    "justify-center",
    "min-h-screen",
  );
  element.innerHTML = children;
  return element;
};
