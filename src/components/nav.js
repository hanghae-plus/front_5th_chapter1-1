import { CONST } from "../data/constants";
import { state } from "../data/state";

export const NavContent = () => {
  const getActiveClassName = (path) => {
    const isCurrentPath = window.location.pathname === path;
    return isCurrentPath ? "text-blue-600 font-bold" : "text-gray-600";
  };

  return `
    <ul class="flex justify-around">
      <li><a href="${CONST.pathname.main}" class="${getActiveClassName(CONST.pathname.main)}">홈</a></li>
      ${
        state.loggedInUser
          ? `<li><a href="${CONST.pathname.profile}" class="${getActiveClassName(CONST.pathname.profile)}">프로필</a></li>`
          : ""
      }
      ${
        state.loggedInUser
          ? '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>'
          : '<li><a href="#" id="login" class="text-gray-600">로그인</a></li>'
      }
    </ul>
`;
};

export class NavComponent {
  constructor(container) {
    this.container = container || document.createElement("div");
  }

  render() {
    this.container.innerHTML = NavContent();
    this.onMount();
  }

  onMount() {
    const nav = this.container;
    nav.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.id === "logout") {
        state.loggedInUser = null;
        localStorage.removeItem(CONST.lsKey.user);
        window.router.navigate(CONST.pathname.login);
      } else if (target.id === "login") {
        window.router.navigate(CONST.pathname.login);
      } else if (target.tagName === "A") {
        const path = target.getAttribute("href");
        window.router.navigate(path);
      }
    });
  }
}
