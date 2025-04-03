import { getUserInfo, removeUserinfo } from "../../utils";
import { navigateTo } from "../../app/router";

function Header() {
  const isLoggedIn = !!getUserInfo();

  return `
     <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1> 
     </header>
     <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}" data-link>홈</a></li>
          ${isLoggedIn ? `<li><a href="/profile" class="${location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}" data-link>프로필</a></li>` : ""}
          <li><a href="#" class="text-gray-600" id="logout" data-userinfo>${isLoggedIn ? "로그아웃" : "로그인"}</a></li>
        </ul>
     </nav>
  `;
}

export function setUpHeaderEvents() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton)
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();

      const isLoggedIn = !!getUserInfo();

      if (isLoggedIn) {
        removeUserinfo();
        localStorage.removeItem("user");
        navigateTo("/");
      } else {
        navigateTo("/login");
      }
    });

  const nav = document.querySelector("nav");
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");

    if (link) {
      event.preventDefault();
      const url = link.getAttribute("href");
      navigateTo(url);
    }
  });
}

export default Header;
