import { User, userStore } from "@/entities/user";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { UserService } from "../service/user.service";

describe("UserService", () => {
  describe("updateProfile", () => {
    const newUserData = {
      username: "test2",
      email: "test2@gmail.com",
      bio: "test description!",
    };

    beforeEach(() => {
      userStore.setUser(
        User.build({
          username: "test1",
          email: "test1@gmail.com",
          bio: "test description",
        }),
      );
    });
    afterEach(() => {
      userStore.removeUser();
    });

    it("사용자 정보를 업데이트", () => {
      const userService = UserService();
      userService.updateProfile(newUserData);
      const user = userStore.getUser();
      expect(user.getProfile()).toEqual(newUserData);
    });

    it("username을 입력하지 않았을 경우 Error 반환", () => {
      const userService = UserService();
      expect(() =>
        userService.updateProfile({
          email: "test2@gmail.com",
          bio: "test description!",
        }),
      ).toThrowError("아이디를 입력해주세요");
    });
    it("email을 입력하지 않았을 경우에는 정상 실행", () => {
      const userService = UserService();
      userService.updateProfile({
        username: "test1",
        bio: "test description!",
      });

      const user = userStore.getUser();
      expect(user.getProfile()).toEqual({
        username: "test1",
        email: "test1@gmail.com",
        bio: "test description!",
      });
    });

    it("bio을 입력하지 않았을 경우 Error 반환", () => {
      const userService = UserService();
      expect(() =>
        userService.updateProfile({
          username: "test2",
          email: "test2@gmail.com",
        }),
      ).toThrowError("자기소개를 입력해주세요");
    });
  });
});
