import { CONST } from "../data/constants";
import { state } from "../data/state";

export function LoginPage(container) {
  if (!container) return;

  if (state.loggedInUser) {
    return window.router.navigate(CONST.pathname.main);
  }

  container.innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="${CONST.loginForm.formId}">
          <div class="mb-4">
            <input type="text" name="${CONST.loginForm.field.username}" id="${CONST.loginForm.field.username}" placeholder="이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input type="password" name="${CONST.loginForm.field.password}" id="${CONST.loginForm.field.password}" placeholder="비밀번호" class="w-full p-2 border rounded">
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

  // 로그인 상태면 메인 페이지로 이동
  if (state.loggedInUser) {
    return window.router.navigate(CONST.pathname.main);
  }

  const loginForm = document.getElementById(CONST.loginForm.formId);
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const { username } = Object.fromEntries(formData);

    if (!username) {
      return alert("이름을 입력해주세요");
    }

    const userInfo = state.users.find((user) => user.username === username);

    if (userInfo) {
      state.loggedInUser = userInfo;
    } else {
      const newUserInfo = state.initUser({ username });
      state.loggedInUser = newUserInfo;
      state.users.push(newUserInfo);
      localStorage.setItem(CONST.lsKey.users, JSON.stringify(state.users));
    }

    localStorage.setItem(CONST.lsKey.user, JSON.stringify(state.loggedInUser));
    window.router.navigate(CONST.pathname.main);
  });
}
