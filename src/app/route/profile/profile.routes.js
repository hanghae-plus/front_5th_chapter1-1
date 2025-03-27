import { ProfilePage } from "@/pages/profile";
import { router } from "@/shared/libs";

export const profileRoutes = () => {
  router.addRoute("/profile", () => {
    const isLogin = localStorage.getItem("user");
    if (isLogin) {
      new ProfilePage().render();
    } else {
      router.navigateTo("/login");
    }
  });
};
