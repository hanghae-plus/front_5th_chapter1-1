import { MainPage } from "@/pages/main";
import { router } from "@/shared/libs";

export const mainRoutes = () => {
  router.addRoute("/", () => {
    new MainPage().render();
  });
};
