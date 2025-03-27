import route from "../../_constants/route";
import router from "../../_libs/router";
import state from "../../_libs/state";

/**
 * 진짜 안되면 클래스형으로 바꾸기
 */
const LoginPage = () => {
  /**
   * 리액트 컴포넌트처럼 사용하고 싶은데 방법을 모르겠어요
   * 1. window.addEventListener("load", () => {});
   * 2. window.addEventListener("beforeunload", () => {});
   */

  return `
    <main role="main" class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4">
            <input type="text" id="email" name="email" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" id="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <textarea id="bio" name="bio" placeholder="자기소개" class="w-full p-2 border rounded"></textarea>
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
};

export default LoginPage;

export const loginAction = () => {
  const $form = document.querySelector("#login-form");
  if (!$form) return;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    const $form = e.target;

    /** @type {string} */
    const username = $form.elements.username.value;
    /** @type {string} */
    const email = $form.elements.email.value;
    /** @type {string} */
    const bio = $form.elements.bio.value;

    const userInfo = { username, email, bio };

    state.user = userInfo;

    router.push(route.home.path);
  });
};

export const logoutAction = () => {
  const $logoutButton = document.getElementById("logout");
  if (!$logoutButton) return;

  $logoutButton.addEventListener("click", () => {
    state.user = null;
    router.push(route.login.path);
    return LoginPage();
  });
};
