import { Store } from "../store";
import { renderProfilePage } from "./profile";

export const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

export const initLoginPage = () => {
  const form = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
      alert("이메일 또는 전화번호를 입력해주세요.");
      return;
    }

    if (username.length < 3) {
      alert("3글자 이상 입력해주세요.");
      return;
    }

    Store.setState({
      isLoggedIn: true,
      userInfo: {
        username: username,
      },
    });
    window.history.pushState(null, "", "/profile");
    renderProfilePage();
  });
};
