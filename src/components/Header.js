import { render } from "../main";
import user from "../store/user";

let isLoggedIn = null;
let pathname = null;

const Header = () => {
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
           <li><a id="btn-home" href="/" class=${pathname === "/" ? "text-blue-600" : "text-gray-600"}>홈</a></li>
           <li><a id="btn-profile" href="/profile" class=${pathname === "/profile" ? "text-blue-600" : "text-gray-600"}>프로필</a></li>
           <li><a href="#" class="text-gray-600">로그아웃</a></li>`
          : `
            <li><a id="btn-home" href="/" class="text-blue-600">홈</a></li>
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
      render("/");
    });

    // NOTE : 로그인 버튼 클릭 시 로그인 페이지로
    const loginBtn = document.getElementById("btn-login");
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");
        render("/login");
      });
    }

    // NOTE : 프로필 버튼 클릭 시 프로필 페이지로
    const profileBtn = document.getElementById("btn-profile");
    if (profileBtn) {
      profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        render("/profile");
      });
    }
  };

  return { template, action };
};

export default Header;
