export function mount(rootSelector) {
  const root = document.querySelector(rootSelector);

  if (root) {
    root.innerHTML = "";
  } else {
    document.body.innerHTML = "<div id='root'></div>";
  }
  return document.querySelector(rootSelector);
}
