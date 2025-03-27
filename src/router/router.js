import Renderer from "../utils/renderer.js";

class RouterInterface {
  routes = {};
  middlewares = [];

  constructor(routes = []) {
    routes.forEach(({ path, component, meta }) => {
      this.routes[path] = { component, meta };
    });
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  render(path) {
    const component = (this.routes[path] ?? this.routes["/*"]).component();
    Renderer.render({ component });

    return component;
  }

  push() {}

  replace() {}

  navigate({ to: path, replace = false }) {
    const context = {
      path,
      meta: this.routes[path]?.meta,
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
