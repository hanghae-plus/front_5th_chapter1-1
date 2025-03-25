import { NotFoundPage } from "../../pages/not-found";
import { router } from "../../shared/libs";

export const notFoundRoutes = () => {
  router.addRoute("*", () => {
    new NotFoundPage().render();
  });
};
