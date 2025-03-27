import { userContext } from "./context/userContext.js";
import { resolveRoute } from "./router/routeTable.js";

export function renderApp() {
  const state = userContext.getState();
  const result = resolveRoute(state.path);

  // 리다이렉트가 필요하면, baseUrl을 추가해서 경로를 올바르게 수정
  if (typeof result === "object" && result.redirect) {
    const { redirect } = result;
    const isGithubPages = window.location.origin.includes("github.io");

    // 배포 환경인 경우 baseUrl을 포함한 경로로 리다이렉트 처리
    const redirectTo = isGithubPages
      ? window.location.origin + "/front_5th_chapter1-1" + redirect
      : redirect; // 로컬 환경에서는 baseUrl 없이 상대 경로로 처리

    window.history.pushState({}, "", redirectTo);
    userContext.setState({ path: redirectTo });
    return;
  }

  document.getElementById("root").innerHTML = result;
}

userContext.subscribe(renderApp);
