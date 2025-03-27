import { userContext } from "../context/userContext.js";

export function navigateTo(path) {
  const basePath = window.location.pathname.split("/").slice(0, -1).join("/");
  const fullPath = `${basePath}${path}`;
  if (window.location.pathname !== fullPath) {
    window.history.pushState({}, "", fullPath);
    userContext.setState({ path: fullPath });
  }
}
