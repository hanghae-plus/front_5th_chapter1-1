import "./main.hash.js";

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const route = hash.slice(1);
  const page = document.querySelector(`[data-route="${route}"]`);
  if (page) {
    document.querySelector("main").innerHTML = page.innerHTML;
  }
});
