import { ERROR_CODE } from "@/shared/constants/error-code";

export class UserNotFoundError extends Error {
  constructor(message = "사용자를 찾을 수 없습니다") {
    super(message, ERROR_CODE.USER.NOT_FOUND);
  }
}
