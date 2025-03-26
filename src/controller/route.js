class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      console.log("404 Not Found");
      history.pushState(null, "", "/error");
    }
  }
  checkRoute(path) {
    return Object.keys(this.routes).includes(path);
  }
}

export const router = new Router();
// router.addRoute('/', () => console.log('Home Page'));
// router.addRoute('/about', () => console.log('About Page'));

// document.querySelector('nav').addEventListener('click', (e) => {
//   if (e.target.tagName === 'A') {
//       e.preventDefault();
//       router.navigateTo(e.target.pathname);
//   }
// });
