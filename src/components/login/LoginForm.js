import { router } from "../../main";
import SubmitBtn from "../common/SubmitBtn";
import { login } from "../../store/Auth";

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login({ email, password, userName: "", bio: "" });
    router.navigate("/profile");
  };

  window.handleLogin = handleSubmit;

  return `
    <form id="login-form" onsubmit="handleLogin(event)">
      <div class="mb-4">
        <input id="email" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      ${SubmitBtn({ text: "로그인" })}
    </form>
  `;
};

export default LoginForm;
