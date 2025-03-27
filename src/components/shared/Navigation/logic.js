import { getPath } from "@/main.js";

function getPathNameFromHref(href) {
  let path = href.split("/").pop();
  path = path.split("?")[0];
  return `/${path}`;
}

export function setBoldFontToNavigationItem() {
  const path = getPath();
  const links = document.querySelectorAll("nav li a");
  links.forEach((link) => {
    const linkPath = getPathNameFromHref(link.href);

    if (linkPath === path) {
      link.classList.remove("text-gray-600");
      link.classList.add("text-blue-600");
      link.classList.add("font-bold");
    } else {
      link.classList.remove("font-bold");
      link.classList.remove("text-blue-600");
      link.classList.add("text-gray-600");
    }
  });
}
