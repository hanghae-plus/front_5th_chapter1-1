import { render } from "./main.js";
import { auth } from "./store/user.js";
import { setLocalStorageItem } from "./utils/stroage.js";
export const attachLoginHandler = () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = form.querySelector("#username").value;
    if (username) {
      const user = {
        username,
        email: "",
        bio: "",
      };

      setLocalStorageItem("user", user);
      setLocalStorageItem("loggedIn", "true");

      auth.loggedIn = true;
      auth.loggedIn = true;
      auth.username = username;
      auth.user = user; // ✅ 이거 빠지면 ProfilePage에서 못 씀

      history.pushState(null, "", "/");
      render();
    }
  });
};

export const LoginPage = () => {
  return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
