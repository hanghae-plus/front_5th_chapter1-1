import { isLoggedIn } from "../stores/auth";
import { ROUTE } from "./routes";

export const checkRedirect = (route) => {
  if (route.isPublic && isLoggedIn()) {
    return ROUTE.HOME;
  }

  if (route.isPrivate && !isLoggedIn()) {
    return ROUTE.LOGIN;
  }

  return null;
};
