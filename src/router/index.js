import { renderToRoot } from "../utils/render";

export class Router {
  constructor() {}

  render() {
    const matched = this.getMatched();
    matched && renderToRoot(matched);
  }

  getMatched() {}

  navigate() {}
}
