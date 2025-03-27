import SubmitBtn from "../common/SubmitBtn";
import { LOGIN_FORM_FIELDS } from "../../consts/form";
import LoginFormField from "./LoginFormField";

const LoginForm = () => {
  return `
    <form id="login-form">
      ${LOGIN_FORM_FIELDS.map((config) => LoginFormField(config)).join("")}
      ${SubmitBtn({ text: "로그인" })}
    </form>
  `;
};

export default LoginForm;
