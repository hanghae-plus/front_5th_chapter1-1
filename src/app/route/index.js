import { loginRoutes } from "./login";
import { mainRoutes } from "./main";
import { notFoundRoutes } from "./not-found";
import { profileRoutes } from "./profile";

export const routes = () => ({
  start: () => {
    Object.values({
      main: mainRoutes,
      login: loginRoutes,
      profile: profileRoutes,
      notFound: notFoundRoutes,
    }).forEach((handler) => handler());
  },
});
