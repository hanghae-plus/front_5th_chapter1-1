import Store from "../store/store"; // 경로가 맞는지 확인하세요

const LoginPage = (container) => {
  if (!container) return;

  container.innerHTML = `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
          </div>
          <div class="mb-6">
            <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
        <div class="mt-4 text-center">
          <a href="/" class="text-blue-600">홈으로 돌아가기</a>
        </div>
      </div>
    </main>
    `;

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;

    if (username.length === 0)
      return alert("아이디 혹은 비밀번호를 입력해주세요!");

    Store.actions.login(username, "");
    console.log(Store.getState().isLoggedIn, "login 상태확인");

    window.router.navigate("/");
  });
};

export default LoginPage;
