import { getData } from "./localStorage";
import { browserNavigate } from "./navigate";

export const authGuard = (pathName, routerType) => {
  const user = getData("user", null);

  switch (routerType) {
    case "browser":
      // 만약 user가 있고 현재 페이지가 login이면 홈으로 리다이렉트
      if (user && pathName === "/login") {
        browserNavigate("/", true);
      }
      // 만약 user가 없고 현재 페이지가 profile이면 login으로 리다이렉트
      else if (!user && pathName === "/profile") {
        browserNavigate("/login", true);
      }
      break;

    case "hash":
      if (user && pathName === "#/login") {
        location.hash = "/";
      } else if (!user && pathName === "#/profile") {
        location.hash = "/login";
      }
      break;
  }
};
