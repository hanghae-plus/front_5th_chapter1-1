import { state } from "../state/state.js";

const Header = () => {
  const { pathname, hash } = location;

  // 라우팅 방식이 Hash인지 History API인지 구분
  const isHashRouting = hash !== "";

  return /*html*/ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14" tagItem="tab">
      <ul class="flex justify-around">
        <!-- 홈 메뉴 -->
        <li>
          <a 
            href="${isHashRouting ? "#/" : "/"}" 
            class="${(isHashRouting ? hash : pathname) === (isHashRouting ? "#/" : "/") ? "text-blue-600 font-bold" : "text-gray-600"}" 
            tagItem="nav"
          >
            홈
          </a>
        </li>

        <!-- 로그인 상태에서만 보이는 메뉴 -->
        ${
          state.loggedIn
            ? `
              <li>
                <a 
                  href="${isHashRouting ? "#/profile" : "/profile"}" 
                  class="${(isHashRouting ? hash : pathname) === (isHashRouting ? "#/profile" : "/profile") ? "text-blue-600 font-bold" : "text-gray-600"}" 
                  tagItem="nav"
                >
                  프로필
                </a>
              </li>
              <li>
                <a href="${isHashRouting ? "#/logout" : "/logout"}" id="logout" class="text-gray-600" tagItem="nav">
                  로그아웃
                </a>
              </li>
            `
            : `
              <li>
                <a 
                  href="${isHashRouting ? "#/login" : "/login"}" 
                  class="text-gray-600" 
                  tagItem="nav"
                >
                  로그인
                </a>
              </li>
            `
        }
      </ul>
    </nav>
  `;
};

export default Header;
