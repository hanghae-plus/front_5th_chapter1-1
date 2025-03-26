import { useUserStore } from "../stores/user.js";
import { onMounted } from "../core/render/component.js";
import { inject } from "../core/context";

export default function Header() {
  const userStore = useUserStore();
  const router = inject("router");

  function isActive(path) {
    return router.getCurrentPath() === path;
  }

  function getClass(isSelected) {
    return isSelected ? "text-blue-600 font-bold" : "text-gray-600";
  }

  onMounted(() => {
    const logoutButton = document.getElementById("logout");

    logoutButton?.addEventListener("click", (event) => {
      event.preventDefault();
      userStore.removeUserInfo();
    });
  });

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around" id="menu">
          <li><a href="/" data-link class="${getClass(isActive("/") || isActive("/main"))}">홈</a></li>
          <li><a href="/profile" data-link class="${getClass(isActive("/profile"))}">프로필</a></li>
          ${
            userStore.isAuthenticated
              ? '<li><a href="/login" id="logout" data-link class="text-gray-600">로그아웃</a></li>'
              : `<li><a href="/login" data-link class="${getClass(isActive("/login"))}">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
}
