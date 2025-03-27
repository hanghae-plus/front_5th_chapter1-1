import ErrorPage from "./pages/404";
import { browserRoutes, hashRoutes } from "./routes";
export function Router($container) {
  this.$container = $container;

  const findPage = () => {
    console.log("location.hash", location.hash);
    const TargetPage =
      location.hash === ""
        ? browserRoutes.find((route) => route.path === location.pathname)
            ?.component || ErrorPage
        : hashRoutes.find((route) => route.path === location.hash)?.component ||
          ErrorPage;

    new TargetPage(this.$container);
  };

  // historychanged가 발생했을 때 페이지를 변경 처리
  const browserRouter = () => {
    window.addEventListener("historychanged", ({ detail }) => {
      const { to, isReplace } = detail;
      console.log("historychanged");
      if (isReplace || to === location.pathname)
        history.replaceState(null, "", to);
      else history.pushState(null, "", to);

      findPage();
    });
    window.addEventListener("popstate", () => {
      console.log("popstate");
      findPage();
    });
  };

  const hashRouter = () => {
    window.addEventListener("hashchange", () => {
      console.log("hashchange");
      // history.replaceState(null, "", e.target.hash);

      findPage();
    });
    window.addEventListener("popstate", () => {
      // console.log("popstate");
      findPage();
    });
  };

  hashRouter();
  browserRouter();
  // isHash ? hashRouter() : browserRouter();

  findPage();
}
