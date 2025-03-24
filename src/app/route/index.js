import { errorRoutes } from "./error.routes";
import { loginRoutes } from "./login.routes";
import { mainRoutes } from "./main.routes";
import { profileRoutes } from "./profile.routes";

export const routes = () => {
  Object.values({
    main: mainRoutes,
    login: loginRoutes,
    profile: profileRoutes,
    error: errorRoutes,
  }).forEach((handler) => handler());
};
