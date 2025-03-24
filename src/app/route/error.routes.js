import { ErrorPage } from "../../pages/errors";
import { router } from "../../shared/libs";

export const errorRoutes = () => {
  router.addRoute("*", () => {
    new ErrorPage().render();
  });
};
