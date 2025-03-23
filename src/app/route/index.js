import { setupErrorRoutes } from "./error.routes";
import { setupLoginRoutes } from "./login.routes";
import { setupMainRoutes } from "./main.routes";
import { setupProfileRoutes } from "./profile.routes";

export const setupRoutes = () => {
  setupMainRoutes();
  setupLoginRoutes();
  setupProfileRoutes();
  setupErrorRoutes();
};
