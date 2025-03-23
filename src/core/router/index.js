import { HashRouter } from "./hashRouter.js";
import { HistoryRouter } from "./historyRouter.js";

export function createRouter(root, routes, { mode }) {
  switch (mode) {
    case "history":
      return new HistoryRouter(root, routes);
    case "hash":
      return new HashRouter(root, routes);
    default:
      throw new Error("올바른 라우터 타입이 아닙니다.");
  }
}
