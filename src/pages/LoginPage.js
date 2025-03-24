import { setData, getData } from "../utils/localStorage";

function LoginPage($container) {
  // TODO: 공통 로직으로 분리하기
  const user = getData("user", null);
  if (user) {
    history.pushState(null, null, "/");
  }

  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = /*html*/ `
     <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input required type="text" placeholder="아이디" class="id-input w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input required type="password" placeholder="비밀번호" class="password-input w-full p-2 border rounded">
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
    const $idInput = this.form.querySelector(".id-input");
    const $passwordInput = this.form.querySelector(".password-input");

    const id = $idInput.value;
    const password = $passwordInput.value;

    setData("user", { id, password });

    $idInput.value = "";
    $passwordInput.value = "";
  });
}

export default LoginPage;
