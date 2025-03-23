import { ErrorPage } from "../../pages/errors";
import { router } from "../../shared/libs";

export const setupErrorRoutes = () => {
  router.addRoute("*", () => {
    new ErrorPage().render();
  });
};
