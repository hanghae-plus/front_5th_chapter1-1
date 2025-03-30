const Router = {
  routes: {},
  observers: new Set(),

  addRoute(path, component) {
    this.routes[path] = component;
  },

  navigate(path) {
    window.history.pushState({}, "", path);
    this.notify();
  },

  getComponent() {
    const path = window.location.pathname;
    const component = this.routes[path] || this.routes["404"];
    return typeof component === "function" ? component() : component;
  },

  subscribe(observer) {
    this.observers.add(observer);
  },

  unsubscribe(observer) {
    this.observers.delete(observer);
  },

  notify() {
    this.observers.forEach((observer) => observer());
  },
};

export default Router;
