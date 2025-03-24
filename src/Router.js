import ErrorPage from "./pages/ErrorPage";
import { routes } from "./routes";
export function Router($container) {
  this.$container = $container;

  const findPage = () => {
    const TargetPage =
      routes.find((route) => route.path === location.pathname)?.component ||
      ErrorPage;

    new TargetPage(this.$container);
  };

  // historychanged가 발생했을 때 페이지를 변경 처리
  const router = () => {
    window.addEventListener("historychanged", ({ detail }) => {
      const { to, isReplace } = detail;

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

  router();
  findPage();
}
