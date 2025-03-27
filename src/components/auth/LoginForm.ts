import { useUserStore } from "@/store";
import getRouter from "@/router/router";

const LoginForm = () => {
  const userStore = useUserStore();
  const Router = getRouter(); // 라우터 클래스 가져오기
  const router = new Router(); // 라우터 클래스의 인스턴스 생성해서 사용

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
        userStore.login(usernameValue.toString());

        router.navigate("/");
      }
    };

    document
      .querySelector("#login-form")
      ?.addEventListener("submit", handleSubmit);
  };

  return { template, setEventHandlers };
};

export default LoginForm;
