import { userContext } from "./context/userContext";
import { resolveRoute } from "./router/routeTable";

export function renderApp() {
  const state = userContext.getState();
  const result = resolveRoute(state.path);

  if (typeof result === "object" && result.redirect) {
    window.history.pushState({}, "", result.redirect);
    userContext.setState({ path: result.redirect });
    return;
  }

  document.getElementById("root").innerHTML = result;
}

userContext.subscribe(renderApp);
