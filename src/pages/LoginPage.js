import userStore from "../stores/userStore.js";
import { useRouter } from "../router/routes.js";

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" name="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <input name="email" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input name="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

document.body.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.closest("form") && location.pathname.endsWith("/login")) {
    const form = e.target;
    const username = form.querySelector("input[name='username']").value;
    const email = form.querySelector("input[name='email']").value;

    if (!username) {
      return;
    }

    const user = {
      username: username,
      email: email,
      bio: "",
    };

    userStore.setState({ user });
    localStorage.setItem("user", JSON.stringify(user));

    const router = useRouter();
    router.navigate({ to: "/" });
  }
});

export default LoginPage;
