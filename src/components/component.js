import { isLoggedIn } from "../store/auth";
import { getRouter } from "../utils";
import { BASE_PATH } from "../utils/constants";

const Header = () => {
  const router = getRouter();

  const navClassName = (pathname) => {
    return router.currentPath === pathname
      ? "text-blue-600 font-bold"
      : "text-gray-600";
  };

  const template = /*html*/ `
      <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
              <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
  
          <nav id="nav_tab" class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
              <li><a href="${router.getLinkHref(BASE_PATH)}" class="${navClassName(BASE_PATH)}">홈</a></li>
      ${
        isLoggedIn()
          ? /*html*/ `
                  <li><a href="${router.getLinkHref(`${BASE_PATH}profile`)}" class="${navClassName(`${BASE_PATH}profile`)}">프로필</a></li>
                  <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>
                  `
          : /*html*/ `
                  <li><a href="${router.getLinkHref(`${BASE_PATH}login`)}" class="${navClassName(`${BASE_PATH}login`)}">로그인</a></li>
                  `
      }
              </ul>
          </nav>
    `;
  return template;
};

const Footer = () => /*html*/ `
        <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
    </div>
</div>
`;

const Post = (post) => {
  return /*html*/ `
  <div class="bg-white rounded-lg shadow p-4">
		<div class="flex items-center mb-2">
			<img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
			<div>
				<p class="font-bold">${post.name}</p>
				<p class="text-sm text-gray-500">${post.createdAt}</p>
			</div>
		</div>
		<p>${post.content}</p>
		<div class="mt-2 flex justify-between text-gray-500">
			<button>좋아요</button>
			<button>댓글</button>
			<button>공유</button>
		</div>
  </div>
  `;
};

export { Header, Footer, Post };
