export function render(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) {
    document.body.innerHTML = "<div id='root'></div>";
  } else {
    root.innerHTML = "";
  }
  return document.querySelector(rootSelector);
}
