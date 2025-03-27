import { userContext } from "../context/userContext.js";

export function navigateTo(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
    userContext.setState({ path });
  }
}
