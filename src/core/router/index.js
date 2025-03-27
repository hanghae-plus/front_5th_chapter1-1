import { HashRouter } from "./hashRouter.js";
import { HistoryRouter } from "./historyRouter.js";

export function createRouter(root, routes, { mode }) {
  const basePath = import.meta.env.VITE_BASE_PATH ?? "/";
  switch (mode) {
    case "history":
      return new HistoryRouter(root, routes, { basePath });
    case "hash":
      return new HashRouter(root, routes, { basePath });
    default:
      throw new Error("올바른 라우터 타입이 아닙니다.");
  }
}
