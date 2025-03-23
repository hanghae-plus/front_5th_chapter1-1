import { useUserStore } from "../stores/user.js";
import { defineComponent } from "../helpers/component";

const HeaderContent = {
  name: "Header",
  template: () => {
    const userStore = useUserStore();
    const isHashRouter = window.location.href.includes("index.hash.html");

    function isActive(path) {
      const currentPath = isHashRouter
        ? window.location.hash.slice(1) || "/"
        : window.location.pathname;
      return currentPath === path ? "text-blue-600 font-bold" : "text-gray-600";
    }

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around" id="menu">
          <li><a href="/" data-link class="${isActive("/")}">홈</a></li>
          <li><a href="/profile" data-link class="${isActive("/profile")}">프로필</a></li>
          ${
            userStore.isAuthenticated
              ? '<li><a href="/login" id="logout" data-link class="text-gray-600">로그아웃</a></li>'
              : `<li><a href="/login" data-link class="${isActive("/login")}">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
  },
  domEvent: () => {
    const userStore = useUserStore();
    const logoutButton = document.querySelector("#logout");

    logoutButton?.addEventListener("click", (event) => {
      event.preventDefault();
      userStore.removeUserInfo();
    });
  },
};

export default defineComponent(HeaderContent);
