import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";

class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentPath = window.location.pathname;

    window.addEventListener("popstate", () => {
      this.currentPath = window.location.pathname;
      this.render();
    });
  }

  navigate(to) {
    window.history.pushState({}, "", to);
    this.currentPath = to;
    this.render();
  }

  render() {
    const page = this.routes[this.currentPath]
      ? this.routes[this.currentPath]()
      : ErrorPage();
    document.body.innerHTML = page;
  }
}

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

const routes = {
  "/": MainPage,
  "/profile": () => {
    if (!isLoggedIn()) {
      router.navigate("/login");
      return LoginPage();
    }
    return ProfilePage();
  },
  "/login": LoginPage,
};

const router = new Router(routes);
router.render();

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    router.navigate(e.target.getAttribute("href"));
  }
});
