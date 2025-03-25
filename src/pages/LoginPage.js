import { setLoggedIn } from "../store/state";

export const LoginPage = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", () => {
      const username = document.getElementById("username").value;

      if (username === "") {
        alert("사용자 이름을 입력해주세요.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ username, email: "", bio: "" }),
      );
    });

    alert("로그인 정보가 저장되었습니다.");
    history.pushState(null, "", "/"); //메인페이지 이동 TODO "?" 생기는 증상
    setLoggedIn(); //로그인 상태 저장 TODO 테스트 필요
  });

  return /*html*/ `
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
        <button type="submit" id="loginBtn" class="w-full bg-blue-600 text-white p-2 rounded font-bold" >로그인</button>
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
