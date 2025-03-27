import { Component } from "../core/Component";
import { getUser } from "../utils/storage";

export class Header extends Component {
  template() {
    const user = getUser();
    const hash = window.location.hash || "#/";

    const isActive = (route) =>
      hash === `#${route}` ? "text-blue-600 font-bold" : "text-gray-600";

    return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" id="home" class="${isActive("/")}">홈</a></li>
        ${
          user
            ? `<li>
                  <a href="/profile" id="profile" class="${isActive("/profile")}">
                    프로필
                  </a>
              </li>`
            : ""
        }
      <li>
    ${
      user
        ? `<a href="/login" id="logout" class="text-gray-600">로그아웃</a>`
        : `<a href="/login" id="login" class="text-gray-600">로그인</a>`
    }
  </li>
      </ul>
    </nav>
    `;
  }
}
