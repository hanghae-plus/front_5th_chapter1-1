import { userStore } from "../../entities/user";
import { LoginPage } from "../../pages/login";
import { router } from "../../shared/libs";

export const setupLoginRoutes = () => {
  router.addRoute("/login", () => {
    const isLogin = userStore.getIsLogin();
    if (isLogin) {
      return router.navigateTo("/");
    } else {
      new LoginPage().render();
    }
  });
};
