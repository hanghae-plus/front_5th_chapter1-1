import { setData, getData } from "../utils/localStorage";
import { navigate } from "../utils/navigate";
function LoginPage($container) {
  console.log("LoginPage");

  // TODO: 공통 로직으로 분리하기
  const user = getData("user", null);
  if (user) {
    navigate("/", true);
    return;
  }

  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = /*html*/ `
     <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" required type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="password" required type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
  this.render();

  this.form = this.$container.querySelector("#login-form");
  this.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const $idInput = this.form.querySelector("#username");
    const $passwordInput = this.form.querySelector("#password");

    const username = $idInput.value;
    const email = "";
    const bio = "";

    setData("user", { username, email, bio });

    $idInput.value = "";
    $passwordInput.value = "";

    navigate("/", true);
  });
}

export default LoginPage;
