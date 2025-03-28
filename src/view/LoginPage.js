import { router } from "../router";
import { setUser, isLoggedIn } from "../util/store";

export const LoginPage = {
  getHtml: () => {
    if (isLoggedIn()) {
      history.pushState(null, null, "/");
      router();
      // alert("이미 로그인된 사용자입니다.");
    }

    let user = {
      username: "",
      password: "",
    };

    return /*html*/ `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded" value="${user.username}">
          </div>
          <div class="mb-6">
            <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded" value="${user.password}">
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
  },
  afterRender: () => {
    const form = document.querySelector("#login-form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.querySelector("#username")?.value.trim() || "";
      // const password = document.querySelector("#password")?.value.trim() || "";

      const user = {
        username,
        email: "",
        bio: "",
      };

      setUser(user);

      history.pushState(null, null, "/");
      router();
    });
  },
};
