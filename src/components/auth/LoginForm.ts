export { default as LoginForm } from "./LoginForm";

import { login } from "@/utils/auth";

const LoginForm = () => {
  const template = () =>
    /* HTML */ ` <form id="login-form">
      <div class="mb-4">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="사용자 이름"
          class="w-full p-2 border rounded"
        />
      </div>
      <div class="mb-6">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          class="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded font-bold"
      >
        로그인
      </button>
    </form>`;

  const setEventHandlers = () => {
    const handleSubmit = (e: Event) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const usernameValue = formData.get("username");

      if (!usernameValue) {
        alert("사용자 이름이 입력되지 않았습니다.");
      } else {
        login(usernameValue.toString());

        history.pushState(null, "", "/");
      }
    };

    document
      .querySelector("#login-form")
      ?.addEventListener("submit", handleSubmit);
  };

  return { template, setEventHandlers };
};

export default LoginForm;
