import { userStore } from "../../../entities/user";
import { router } from "../../../shared/libs";

export const AuthenticationService = () => {
  return {
    login: (username) => {
      userStore.setUser({
        username: username,
        email: "",
        bio: "",
      });
      router.navigateTo("/profile");
    },

    logout: () => {
      userStore.removeUser();
      router.navigateTo("/login");
    },
  };
};
