import { CUSTOM_EVENT, ROUTES } from "../config/index.js";
import store from "../store/index.js";

const LoginPage = () => {
  const eventListner = () => {
    const loginForm = document.querySelector("#login-form");
    if (!loginForm) return;
    loginForm.addEventListener("submit", (e) => {
      console.log(e);
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const password = formData.get("password");
      if (username && password) {
        store.set({ username });
      }
      const url = ROUTES.MAIN;
      const config = { detail: { url }, bubbles: true, cancelable: true };
      document.dispatchEvent(new CustomEvent(CUSTOM_EVENT.PAGE_PUSH, config));
    });
  };

  const template = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded" required>
          </div>
          <div class="mb-6">
            <input type="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded" required>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `;

  return { template, eventListner };
};
export default LoginPage;
