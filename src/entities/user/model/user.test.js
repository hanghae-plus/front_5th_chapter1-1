import { describe, expect, it } from "vitest";
import { User } from "./user";

describe("User", () => {
  describe("build", () => {
    it("username, email, bio를 이용해서 User 생성", () => {
      const user = User.build({ username: "test", email: "test", bio: "test" });
      expect(user).toBeDefined();
      expect(user.getProfile()).toEqual({
        username: "test",
        email: "test",
        bio: "test",
      });
    });

    it("username만 이용해서 User 생성", () => {
      const user = User.build({ username: "test" });
      expect(user).toBeDefined();
      expect(user.getProfile()).toEqual({
        username: "test",
        email: "",
        bio: "",
      });
    });

    it("username이 없을 경우에는 null 반환", () => {
      const user = User.build({});
      expect(user).toBeNull();
    });
  });

  describe("update", () => {
    it("사용자 정보를 업데이트", () => {
      const user = User.build({ username: "test", email: "test", bio: "test" });
      user.update({ username: "test2", email: "test2", bio: "test2" });
      expect(user.getProfile()).toEqual({
        username: "test2",
        email: "test2",
        bio: "test2",
      });
    });
    it("사용자 정보를 업데이트하지 않으면, 기존 정보 유지", () => {
      const user = User.build({ username: "test", email: "test", bio: "test" });
      user.update({});
      expect(user.getProfile()).toEqual({
        username: "test",
        email: "test",
        bio: "test",
      });
    });
    it("사용자 정보를 일부만 업데이트할 경우 일부만 변경", () => {
      const user = User.build({ username: "test", email: "test", bio: "test" });
      user.update({ username: "test2" });
      expect(user.getProfile()).toEqual({
        username: "test2",
        email: "test",
        bio: "test",
      });
    });
  });

  describe("getProfile", () => {
    it("사용자 정보를 반환", () => {
      const user = User.build({ username: "test", email: "test", bio: "test" });
      expect(user.getProfile()).toEqual({
        username: "test",
        email: "test",
        bio: "test",
      });
    });
  });
});
