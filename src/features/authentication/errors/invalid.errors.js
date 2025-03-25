import { ERROR_CODE } from "../../../shared/constants/error-code";
import { CustomError } from "../../../shared/errors";

export class InvalidError extends CustomError {
  constructor(message = "입력값이 올바르지 않습니다") {
    super(message, ERROR_CODE.AUTH.INVALID);
  }
}
