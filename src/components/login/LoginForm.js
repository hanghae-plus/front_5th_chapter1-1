import SubmitBtn from "../common/SubmitBtn";

const LoginForm = () => {
  return `
    <form id="login-form">
      <div class="mb-4">
        <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input id="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      ${SubmitBtn({ text: "로그인" })}
    </form>
  `;
};

export default LoginForm;
