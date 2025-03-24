import { render } from "./render";

export const navigate = (pathname) => {
  history.pushState(null, "", pathname);
  render();
};
