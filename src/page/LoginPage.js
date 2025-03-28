import auth from "../auth";
import { renderByNodeElement } from "./utils";
import Dialog from "../components/Dialog";

export default () => {
  const component = `
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
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
  `;
  const element = Dialog(component);
  const loginSubmitHanlder = (e) => {
    e.preventDefault();
    const username = element.querySelector("#username").value;
    // const password = loginForm.querySelector('input[type="password"]').value
    if (!username) {
      alert("사용자 이름을 입력해주세요.");
      return;
    }
    auth.login(username);
    window.router.navigate("/");
  };
  element
    .querySelector("#login-form")
    .addEventListener("submit", loginSubmitHanlder);
  const removeEventListenerCallback = () => {
    element
      .querySelector("#login-form")
      .removeEventListener("submit", loginSubmitHanlder);
  };
  renderByNodeElement(element, removeEventListenerCallback);
};
