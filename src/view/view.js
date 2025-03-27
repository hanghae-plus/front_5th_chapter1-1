import { MainPage } from "./pages/homepage";
import { ErrorPage } from "./pages/notFoundPage";
import { ProfilePage } from "./pages/profilePage";
import { LoginPage } from "./pages/loginPage";
import { store, actions, navigateTo } from "../store/store";

export function view(state) {
  let content;
  const path = state.path;

  if (path === "/" || path === "/home") {
    content = MainPage(state);
  } else if (path === "/login") {
    if (state.isLoggedIn) {
      const newPath = "/";
      store.dispatch(actions.setPath(newPath));
      window.history.replaceState(null, "", newPath);
      // 새로운 state로 MainPage를 렌더링
      content = MainPage({ ...state, path: newPath });
    } else {
      content = LoginPage(state.isLoggedIn);
    }
  } else if (path === "/profile") {
    if (!state.isLoggedIn) {
      store.dispatch(actions.setPath("/login"));
      window.history.replaceState(null, "", "/login");
      content = LoginPage();
    } else {
      content = ProfilePage(state);
    }
  } else {
    content = ErrorPage(state.isLoggedIn);
  }

  render(content);

  // Nav의 로그아웃 버튼 이벤트 리스너
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      store.dispatch(actions.logout());
      navigateTo(store.dispatch.bind(store), "/login");
    });
  }
}

function render(content) {
  document.getElementById("root").innerHTML = content;
}
