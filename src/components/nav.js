import { CONST } from "../data/constants";
import { state } from "../data/state";

export const NavContent = () => {
  return `
      <ul class="flex justify-around">
        <li><a href="/"  class="text-blue-600">홈</a></li>
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
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
      if (anchor.id === "logout") {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          state.loggedInUser = null;
          localStorage.removeItem(CONST.lsKey.user);
          this.render(CONST.pathname.login);
        });
      } else {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const path = anchor.getAttribute("href");
          window.router.navigate(path);
        });
      }
    });
  }
}
