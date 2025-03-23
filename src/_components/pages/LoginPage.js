import { goTo } from "../../_actions/goTo";
import routes from "../../_constants/routes";
import { setUserInfo } from "../../_utils/user";

const LoginPage = () => {
  return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
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
  /**
   * @param {SubmitEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const $form = e.target;

    /** @type {string} */
    const username = $form.elements.username.value;
    /** @type {string} */
    const email = $form.elements.email.value;
    /** @type {string} */
    const bio = $form.elements.bio.value;

    const userInfo = { username, email, bio };

    setUserInfo(userInfo);

    goTo(routes.home.path);
  };

  const $form = document.querySelector("#login-form");
  $form.addEventListener("submit", handleSubmit);
};
