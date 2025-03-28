// 페이지 렌더링

import { LoginPage } from "./login.js";
import { ProfilePage } from "./components/ProfilePage.js";
import { HomePage } from "./components/HomePage.js";
import { NotFoundPage } from "./components/NotFoundPage.js";

import { auth } from "./store/user.js";
import { getCurrentPath } from "./utils/route.js";

// App()은 순수하게 어떤 HTML을 반환하는 함수여야 하고
// pushState()는 브라우저 주소만 바꾸기 때문에 DOM은 바뀌지 않아요
// 게다가 테스트는 DOM의 상태를 직접 검사하므로 **render()**가 반드시 다시 실행되어야 합니다

export const App = () => {
  const path = getCurrentPath();
  console.log("path", location.origin);

  if (path === "/front_5th_chapter1-1/") {
    return HomePage(); // ✅ 테스트에서도 통과
  }

  if (path === "/login") {
    if (auth.loggedIn) {
      history.pushState(null, "", "/");
      return HomePage(); // ✅ 테스트에서도 통과
    }
    return LoginPage(); // ❗ 로그인 안 됐을 경우
  }

  if (path === "/profile") {
    if (!auth.loggedIn) return LoginPage(); // ❗ 반드시 이 조건 있어야 함
    return ProfilePage();
  }

  if (path === "/") return HomePage();

  return NotFoundPage();
};
