import { userStore } from "../../entities/user";
import { AuthenticationService } from "../../features/authentication/";
// ? 현재 FSD로 프로젝트를 구성했는데 이런 widget안에서만 사용할 Component같은 경우에는 같은 레이어에 관리하고 Header만 내보내는 것이 더 유지보수 혹은 가독성이 좋을 지 혹은 header/components/NavigationBar 같이 뎁스를 하나 더 넣는 것이 나을지 궁금합니다.
import { NavigationBar } from "./NavigationBar";

export class Header {
  constructor() {
    this.isLogin = userStore.getIsLogin();
    this.pathname = window.location.pathname;
  }

  render() {
    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header> 
      <nav class="bg-white shadow-md p-2 sticky top-14">
        ${NavigationBar(this.isLogin, this.pathname)}
      </nav>`;
  }

  bindEvents() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", this.handleLogout);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    return AuthenticationService().logout();
  }
}
