import { loginRoutes } from "./login.routes";
import { mainRoutes } from "./main.routes";
import { notFoundRoutes } from "./not-found.routes";
import { profileRoutes } from "./profile.routes";

export const routes = () => {
  Object.values({
    main: mainRoutes,
    login: loginRoutes,
    profile: profileRoutes,
    notFound: notFoundRoutes,
  }).forEach((handler) => handler());
};
