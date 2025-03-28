import { BASE_PATH } from "../router/router";

const matchedPath = (path) => {
  const currentPath = window.location.hash
    ? window.location.hash.slice(1) || "/"
    : window.location.pathname.replace(BASE_PATH, "") || "/";
  return currentPath === path;
};

export const Header = ({ loggedIn }) => {
  return /* html */ `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${matchedPath("/") ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
        ${
          loggedIn
            ? /* html */ `
          <li><a href="/profile" class="${matchedPath("/profile") ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
          <li id="logout"><a href="#" class="text-gray-600">로그아웃</a></li>
          `
            : /* html */ `
          <li><a href="/login" class="${matchedPath("/login") ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>
          `
        }
        </ul>
      </nav>
`;
};

export const Footer = () => /* html */ `
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
`;

export const Layout = ({ child }) => {
  return /* html */ `
       <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header({ loggedIn: true })}
          ${child}
         ${Footer()}
        </div>
      </div>

  `;
};
