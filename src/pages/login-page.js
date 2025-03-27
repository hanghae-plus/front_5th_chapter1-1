import router from "../router";
import hashRouter from "../hashRouter";
import MainPage from "./main-page";

const LoginPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const hash = window.location.hash;
  if (isLoggedIn) {
    if (hash) {
      hashRouter.navigateTo("#/");
    } else {
      router.navigateTo("/");
      return MainPage(); // TODO: navigation 이상 처리 보완
    }
  }

  // setTimeout: DOM이 body에 들어간 후 이벤트를 바인딩하는 것을 보장
  // TODO: e2e 테스트에서는 이 이벤트만 바라봄, main.js에 등록한 이벤트 이후라서
  // user를 localStorage에서 가져와서 넣어줘야하는데 그 순서의 이유는 아직 잘 모름.
  setTimeout(() => {
    const hash = location.hash;
    const form = document.getElementById("login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user
        ? user.username
        : document.getElementById("username")?.value;

      localStorage.setItem(
        "user",
        JSON.stringify({ username: username || "", email: "", bio: "" }),
      );
      if (hash) {
        hashRouter.navigateTo("#/");
      } else {
        router.navigateTo("/");
      }
    });
  }, 0);

  return /* HTML */ `
    <div>
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
                placeholder="사용자 이름"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="mb-6">
              <input
                id="password"
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
    </div>
  `;
};

export default LoginPage;
