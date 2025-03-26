import { InvalidError } from "../../errors";

export const validateLoginForm = ({ username }) => {
  if (!username) {
    throw new InvalidError("아이디를 입력해주세요");
  }

  // if (!password) {
  //   throw new InvalidError("비밀번호를 입력해주세요");
  // }
};
