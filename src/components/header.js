import { CONST } from "../constants";
import { state } from "../state";

export const HeaderContent = () => {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600">홈</a></li>
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
`;
};

export class HeaderComponent {
  constructor() {
    this.container = document.createElement("div");
  }

  render() {
    this.container.innerHTML = HeaderContent();
    this.addEventListeners();
    return this.container.innerHTML;
  }

  addEventListeners() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        state.loggedInUser = null;
        localStorage.removeItem(CONST.lsKey.user);
        this.render(CONST.pathname.login);
      });
    }
  }
}
