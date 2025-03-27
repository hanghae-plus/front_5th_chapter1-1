import { ERROR_CODE } from "@/shared/constants/error-code";
import { CustomError } from "@/shared/errors";

export class LoginError extends CustomError {
  constructor(message = "로그인에 실패했습니다") {
    super(message, ERROR_CODE.AUTH.LOGIN);
  }
}
