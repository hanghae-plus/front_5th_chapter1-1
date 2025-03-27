import { ERROR_CODE } from "@/shared/constants/error-code";

export class InvalidError extends Error {
  constructor(message = "아이디를 입력해주세요") {
    super(message, ERROR_CODE.AUTH.INVALID);
  }
}
