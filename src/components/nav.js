import { CONST } from "../data/constants";
import { state } from "../data/state";

export const NavContent = () => {
  return `
    <ul class="flex justify-around">
      <li><a href="/"  class="text-blue-600">홈</a></li>
      ${state.loggedInUser ? '<li><a href="/profile" class="text-gray-600">프로필</a></li>' : ""}
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
    const anchorList = this.container.querySelectorAll("a");
    anchorList.forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        if (anchor.id === "logout") {
          state.loggedInUser = null;
          localStorage.removeItem(CONST.lsKey.user);
          window.router.navigate(CONST.pathname.login);
        } else if (anchor.id === "login") {
          window.router.navigate(CONST.pathname.login);
        } else {
          const path = anchor.getAttribute("href");
          window.router.navigate(path);
        }
      });
    });
  }
}
