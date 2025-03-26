import BrowserRouter from "./BrowserRouter";
import HashRouter from "./HashRouter";

//type추가해서 해결한다.
function createRouter(type = "browser", options = {}) {
  switch (type.toLowerCase()) {
    case "hash":
      return new HashRouter(options);
    case "browser":
      return new BrowserRouter(options);
    default:
      throw new Error(`Invalid router type: ${type}`);
  }
}

export default createRouter;
