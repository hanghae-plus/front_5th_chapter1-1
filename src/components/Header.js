import { render } from "../main";
import hashState from "../store/hash";
import user from "../store/user";

let isLoggedIn = null;
let pathname = null;

const Header = () => {
  const navCondition = (route) => {
    return hashState.getHashState()
      ? location.hash === "#" + route
      : location.pathname === route;
  };

  const template = () => {
    isLoggedIn = user.getIsLoggedIn();
    pathname = window.location.pathname;
    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
      ${
        isLoggedIn
          ? `
           <li><a id="btn-home" href="/" class="${navCondition("/") ? "font-bold text-blue-600" : "text-gray-600"}">홈</a></li>
           <li><a id="btn-profile" href="/profile" class="${navCondition("/profile") ? "font-bold text-blue-600" : "text-gray-600"}">프로필</a></li>
           <li><a id="logout" href="/" class="text-gray-600">로그아웃</a></li>`
          : `
            <li><a id="btn-home" href="/" class="text-blue-600 font-bold">홈</a></li>
            <li><a id="btn-login" href="/login" class="text-gray-600">로그인</a></li>
            `
      }
      </ul>
    </nav>`;
  };

  const action = () => {
    // NOTE : 메인 버튼 클릭 시 메인 페이지로
    const homeBtn = document.getElementById("btn-home");
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!hashState.getHashState()) {
        render("/");
      } else {
        import("../main.hash").then((mainHash) => mainHash.hashRender("#/"));
      }
    });

    // NOTE : 로그인 버튼 클릭 시 로그인 페이지로
    const loginBtn = document.getElementById("btn-login");
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (!hashState.getHashState()) {
          render("/login");
        } else {
          import("../main.hash").then((mainHash) =>
            mainHash.hashRender("#/login"),
          );
        }
      });
    }

    // NOTE : 프로필 버튼 클릭 시 프로필 페이지로
    const profileBtn = document.getElementById("btn-profile");
    if (profileBtn) {
      profileBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (!hashState.getHashState()) {
          render("/profile");
        } else {
          import("../main.hash").then((mainHash) =>
            mainHash.hashRender("#/profile"),
          );
        }
      });
    }
  };

  // NOTE : 로그아웃 버튼 클릭 시 로그아웃 후 리다이렉션
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      user.setIsLoggedIn(false);
      localStorage.removeItem("user");

      if (!hashState.getHashState()) {
        render("/login");
      } else {
        import("../main.hash").then((mainHash) =>
          mainHash.hashRender("#/login"),
        );
      }
    });
  }

  return { template, action };
};

export default Header;
