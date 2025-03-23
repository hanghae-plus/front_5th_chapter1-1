import { MainPage } from "../../pages/main";
import { router } from "../../shared/libs";

export const setupMainRoutes = () => {
  router.addRoute("/", () => {
    new MainPage().render();
  });
};
