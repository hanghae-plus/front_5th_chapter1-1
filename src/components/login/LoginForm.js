import { isHash } from "../../utils/isHash";
import { setData } from "../../utils/localStorage";
import { browserNavigate } from "../../utils/navigate";

class LoginForm {
  constructor($container) {
    this.$container = $container;
    this.render();
  }

  render = () => {
    this.$container.innerHTML = /*html*/ `<form id="login-form">
    <div class="mb-4">
      <input id="username" required type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
    </div>
    <div class="mb-6">
      <input id="password" required type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
  </form>`;
    this.setEvent();
  };

  setEvent = () => {
    this.form = this.$container.querySelector("#login-form");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const $idInput = this.form.querySelector("#username");
      const $passwordInput = this.form.querySelector("#password");

      const username = $idInput.value;
      const email = "";
      const bio = "";

      setData("user", { username, email, bio });

      $idInput.value = "";
      $passwordInput.value = "";

      isHash ? (location.hash = "#/") : browserNavigate("/", true);
    });
  };
}

export default LoginForm;
