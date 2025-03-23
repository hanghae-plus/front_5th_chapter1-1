import Renderer from "../utils/renderer.js";

class RouterInterface {
  constructor(routes = []) {
    this.routes = {};
    this.routesMeta = {};

    this.middlewares = [];

    routes.forEach(({ path, component, meta }) => {
      this.routes[path] = component;
      this.routesMeta[path] = meta;
    });
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  render(path) {
    const component = (this.routes[path] ?? this.routes["/*"])();
    Renderer.render({ component });

    return component;
  }

  push() {}

  replace() {}

  navigate({ to: path, replace = false }) {
    const context = {
      meta: this.routesMeta[path],
      redirect: null,
    };

    for (const middleware of this.middlewares) {
      const result = middleware(context);

      if (result === false && context.redirect) {
        this.replace(context.redirect);

        return this.render(context.redirect);
      }
    }

    replace ? this.replace(context.redirect) : this.push(path);

    return this.render(path);
  }
}

export default RouterInterface;
