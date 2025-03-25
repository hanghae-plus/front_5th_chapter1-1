import { AuthenticationService } from "../../features/authentication";
import { ensureRootElement } from "../../shared/utils";

export class LoginPage {
  constructor() {
    this.template = this.template();
  }

  template() {
    return `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input 
                id="username"
                name="username"
                type="text" 
                placeholder="사용자 이름" 
                class="w-full p-2 border rounded"
              >
            </div>
            <div class="mb-6">
              <input 
                id="password"
                name="password"
                type="password" 
                placeholder="비밀번호" 
                class="w-full p-2 border rounded"
              >
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          </form>
          <div class="mt-4 text-center">
            <a data-link href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6">
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
          </div>
        </div>
      </main>
  `;
  }

  addEvent() {
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        AuthenticationService().login({
          username: formData.get("username"),
          password: formData.get("password"),
        });
      } catch (error) {
        alert(error.message);
      }
    });
  }

  render() {
    const root = ensureRootElement();
    root.innerHTML = this.template;
    this.addEvent();
    return this.template;
  }
}
