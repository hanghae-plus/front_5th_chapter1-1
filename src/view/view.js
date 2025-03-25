import { MainPage } from "./pages/homepage";
import { ErrorPage } from "./pages/notFoundPage";
import { ProfilePage } from "./pages/profilePage";
import { LoginPage } from "./pages/loginPage";

export function view(model) {
  let content;
  const path = model.path;

  if (path === "/" || path === "/home") {
    content = MainPage();
  } else if (path === "/login") {
    content = LoginPage();
  } else if (path === "/profile") {
    if (!model.isLoggedIn) {
      console.log("User not logged in, redirecting to /login");
      model.setPath("/login");
      window.history.replaceState(null, "", "/login");
      content = LoginPage();
    } else {
      content = ProfilePage(); // 로그인 상태라면 프로필 페이지 렌더링
    }
  } else {
    content = ErrorPage(); // 존재하지 않는 페이지는 ErrorPage 렌더링
  }

  render(content);
}

function render(content) {
  document.getElementById("root").innerHTML = content;
}
