import { html } from "../common/useHtml";
import { Router } from "../public/router";
import { setUser } from "../common/store";

export const LoginPage = {
  render: () => {
    return html`
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">
            항해플러스
          </h1>
          <form id="login-form">
            <div class="mb-4">
              <input
                id="username"
                type="text"
                placeholder="이메일 또는 전화번호"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="mb-6">
              <input
                id="pass"
                type="password"
                placeholder="비밀번호"
                class="w-full p-2 border rounded"
              />
            </div>
            <button
              id="login"
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
            >
              로그인
            </button>
          </form>
          <div class="mt-4 text-center">
            <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          </div>
          <hr class="my-6" />
          <div class="text-center">
            <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">
              새 계정 만들기
            </button>
          </div>
        </div>
      </main>
    `;
  },
  afterRender: () => {
    // submit -> 홈으로 리다이렉트
    //        -> 로그인 처리
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let userName = document.getElementById("username").value;
        console.log(userName); //ok
        // localStorage에 정보 저장
        setUser(userName);
        Router.navigate("/");
      });
    }
  },
};
