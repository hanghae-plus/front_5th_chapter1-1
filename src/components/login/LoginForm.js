import { router } from "../../main";
import SubmitBtn from "../common/SubmitBtn";
import { login } from "../../store/Auth";

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;

    login({ username, email: "", bio: "" });
    router.navigate("/profile");
  };

  window.handleLogin = handleSubmit;

  return `
    <form id="login-form">
      <div class="mb-4">
        <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      ${SubmitBtn({ text: "로그인" })}
    </form>
  `;
};

document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    login({ username, email: "", bio: "" });
    router.navigate("/profile");
  }
});

export default LoginForm;
