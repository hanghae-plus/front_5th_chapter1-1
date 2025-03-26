import { authStore } from "../stores/authStore";
import { navigate } from "../router/router";

export default function Nav() {
  const isProd = location.hostname.includes("github.io");
  const isLoggedIn = authStore.user;
  const currentPath = location.hash ? location.hash.slice(1) : location.pathname;
  const BASE_PATH = isProd ? "/front_5th_chapter1-1" : "";

  const nav = document.createElement("nav");
  nav.className = "bg-white shadow-md p-2 sticky top-14";

  nav.innerHTML = `
    <ul class="flex justify-around">
      <li>
        <a 
          href="${BASE_PATH}/" 
          class="${currentPath === "/" ? "text-blue-600 font-bold" : "text-gray-600"}" 
          data-path="/">
          홈
        </a>
      </li>
      <li>
        <a 
          href="${BASE_PATH}/profile" 
          class="${currentPath === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}" 
          data-path="/profile">
          프로필
        </a>
      </li>
      <li>
        <a 
          href="${BASE_PATH}/login" 
          class="${currentPath === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}" 
          data-path="/login" 
          id="${isLoggedIn ? "logout" : "login-link"}">
          ${isLoggedIn ? "로그아웃" : "로그인"}
        </a>
      </li>
    </ul>
  `;

  nav.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[data-path]");
    if (anchor) {
      e.preventDefault();
      const path = anchor.getAttribute("data-path");
      navigate(path);
    }
  });

  const logoutButton = nav.querySelector("#logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      authStore.clear();
      navigate("/login");
    });
  }

  return nav;
}
