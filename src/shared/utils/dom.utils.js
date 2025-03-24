export const ensureRootElement = () => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  return root;
};

// * a 태그 클릭 이벤트 위임
export const delegateNavigationEvents = (router) => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href) {
        router.navigateTo(href);
      }
    }
  });
};
