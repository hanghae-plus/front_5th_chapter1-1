import userStore from "../store/userStore";
import { navigate } from "../router";
import { userService } from "../services/userService";

export const loginAction = (e) => {
  e.preventDefault();
  const username = userService.getLoginFormData();
  userStore.setUser({
    username: username,
    email: "",
    bio: "",
  });
  navigate("/profile");
};

export const logoutAction = () => {
  userStore.clearUser();
  navigate("/login");
};

export const profileUpdateAction = () => {
  const user = userStore.getUser();
  const formData = userService.getProfileFormData();
  userStore.setUser({ ...user, ...formData });
  navigate("/profile");
};
