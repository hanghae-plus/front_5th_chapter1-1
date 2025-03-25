import { InvalidError } from "../../errors/invalid.errors";

export const validateUserUpdateForm = ({ username, bio }) => {
  if (!username) {
    throw new InvalidError("아이디를 입력해주세요");
  }
  // * test case 를 위해 주석 처리
  // if (!email) {
  //   throw new InvalidError("이메일을 입력해주세요");
  // }
  if (!bio) {
    throw new InvalidError("자기소개를 입력해주세요");
  }
};
