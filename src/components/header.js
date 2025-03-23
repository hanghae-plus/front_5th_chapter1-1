import { logout } from "../services/auth.js";

const Header = ({ isLoggedIn }) => {
  const isActive = (path) => {
    const isHashRouter = window.location.href.includes("index.hash.html");

    if (isHashRouter) {
      const hash = window.location.hash;
      const hashPath = hash ? hash.substring(1) : "/";
      return hashPath === path;
    }

    return window.location.pathname === path;
  };

  const navigationLinks = isLoggedIn
    ? [
        { path: "/", text: "홈" },
        { path: "/profile", text: "프로필" },
        { path: "#", text: "로그아웃", id: "logout" },
      ]
    : [
        { path: "/", text: "홈" },
        { path: "/login", text: "로그인" },
      ];

  const template = `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navigationLinks
          .map(
            (link) => `
              <li>
                <a 
                  href="${link.path}" 
                  class="${isActive(link.path) ? "text-blue-600 font-bold" : "text-gray-600"}"
                  ${link.id ? `id="${link.id}"` : ""}
                >
                  ${link.text}
                </a>
              </li>
            `,
          )
          .join("")}
      </ul>
    </nav>
  `;

  // 이벤트 핸들러 설정 함수
  const init = () => {
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  };

  return {
    template,
    init,
  };
};

export default Header;
