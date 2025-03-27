import { isMatched } from "../../core/router/router";
import Link from "../../core/router/Link";

const Header = () => {
  // TODO: 로그인 유효성 검사
  const isLoggedIn = true;

  return /* HTML */ `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NavItem({ to: "/", label: "홈" })}
        ${isLoggedIn
          ? `
              ${NavItem({ to: "/profile", label: "프로필" })}
              <li><a href="#" class="text-gray-600">로그아웃</a></li>
            `
          : NavItem({
              to: "/login",
              label: "로그인",
            })}
      </ul>
    </nav>
  `;
};

const NavItem = ({ to, label }) => {
  return /* HTML */ `
    <li>
      ${Link({
        to,
        label,
        className: isMatched(to) ? "text-blue-600" : "text-gray-600",
      })}
    </li>
  `;
};

export default Header;
