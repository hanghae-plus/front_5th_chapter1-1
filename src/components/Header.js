import Nav from "./Nav.js";

export default function Header() {
  const wrapper = document.createElement("div");

  const header = document.createElement("header");
  header.className = "bg-blue-600 text-white p-4 sticky top-0 z-10";

  const h1 = document.createElement("h1");
  h1.className = "text-2xl font-bold";
  h1.textContent = "항해플러스";

  header.appendChild(h1);
  wrapper.appendChild(header);

  wrapper.appendChild(Nav());

  return wrapper;
}
