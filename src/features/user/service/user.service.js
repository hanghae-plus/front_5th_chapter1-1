import { userStore } from "@/entities/user";

import { UserNotFoundError, UserUpdateError } from "../errors";
import { validateUserUpdateForm } from "../libs/validator";

export const UserService = () => ({
  updateProfile: (userData) => {
    try {
      validateUserUpdateForm(userData);
      const user = userStore.getUser();
      if (!user) {
        throw new UserNotFoundError();
      }
      user.update({ ...user.getProfile(), ...userData });
      userStore.setUser(user);
    } catch (error) {
      throw new UserUpdateError(
        `사용자 정보를 업데이트 중 오류가 발생했습니다: ${error.message}`,
      );
    }
  },
});
