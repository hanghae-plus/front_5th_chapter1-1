import { getUser } from "../auth/auth";

function Header(path) {
  const user = getUser();

  return `
		<header class="bg-blue-600 text-white p-4 sticky top-0">
			<h1 class="text-2xl font-bold">항해플러스</h1>
		</header>

		<nav class="bg-white shadow-md p-2 sticky top-14">
			<ul class="flex justify-around">
			${
        user
          ? `<li><a href="/" data-link class="${path === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
				<li><a href="/profile" data-link class="${path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
				<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="/" data-link class="${path === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
				<li><a href="/login" class="text-gray-600">로그인</a></li>`
      }
			
			</ul>
		</nav>
		`;
}

export default Header;
