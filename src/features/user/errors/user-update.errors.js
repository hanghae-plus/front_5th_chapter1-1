import { ERROR_CODE } from "../../../shared/constants/error-code";

export class UserUpdateError extends Error {
  constructor(message = "사용자 정보를 업데이트 중 오류가 발생했습니다") {
    super(message, ERROR_CODE.USER.UPDATE);
  }
}
