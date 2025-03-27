import { render } from "./pageHandlers";

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && e.target.id !== "logout") {
    console.log("A 태그 클릭 in hash");
    e.preventDefault();
    const hash = e.target.getAttribute("href");
    window.location.hash = hash;
    render();
  }
});

const initializeApp = () => {
  if (!window.location.hash) {
    window.location.replace(`${window.location.hash}#/`);
    return;
  }
  render();
};

window.addEventListener("load", initializeApp);
window.addEventListener("hashchange", render);
