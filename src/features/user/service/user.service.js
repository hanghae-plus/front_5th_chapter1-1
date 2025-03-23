import { userStore } from "../../../entities/user";

export const UserService = () => ({
  updateProfile: (username, email, bio) => {
    userStore.updateUser({ username, email, bio });
  },
});
