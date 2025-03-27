import BrowserRouter from "./Router.browser";
import HashRouter from "./Router.hash";

//type추가해서 해결한다.
// function createRouter(type = "browser", options = {}) {
//   switch (type.toLowerCase()) {
//     case "hash":
//       return new HashRouter(options);
//     case "browser":
//       return new BrowserRouter(options);
//     default:
//       throw new Error(`Invalid router type: ${type}`);
//   }
// }

function createRouter(type = "browser") {
  console.log("createRouter", type.toLowerCase());
  switch (type.toLowerCase()) {
    case "hash":
      return new HashRouter();
    case "browser":
      return new BrowserRouter();
  }
}
export default createRouter;
