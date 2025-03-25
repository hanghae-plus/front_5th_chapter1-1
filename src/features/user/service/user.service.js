import { userStore } from "../../../entities/user";

export const UserService = () => ({
  updateProfile: (userData) => {
    const user = userStore.getUser();
    if (!user) return;
    user.update({ ...user.toEntity(), ...userData });
    userStore.setUser(user);
  },
});
