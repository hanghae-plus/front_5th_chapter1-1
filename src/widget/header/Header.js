import { userStore } from "../../entities/user";
import { AuthenticationService } from "../../features/authentication/";
import { NavigationBar } from "./NavigationBar";

export class Header {
  constructor() {
    this.isLogin = userStore.getUser();
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
