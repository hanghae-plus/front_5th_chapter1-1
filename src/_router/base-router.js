// 라우터 인터페이스 정의
class BaseRouter {
  constructor() {
    this.lastPath = null;
    this.lastHash = null;
    this.routes = [];
  }

  addRoute = (path, handler, guards = []) => {
    this.routes.push({
      path,
      handler,
      guards,
    });
  };

  init = () => {
    this.handleRouteChange();
  };

  navigate = () => {
    throw new Error("navigate must be implemented");
  };

  handleRouteChange = () => {
    throw new Error("handleRouteChange must be implemented");
  };
}

export default BaseRouter;
