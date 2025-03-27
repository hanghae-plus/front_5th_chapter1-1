import { store } from "../store/store.js";
const Nav = () => {
  const isLoggedIn = store.state.isLoggedIn;
  return `
     <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
            <li><a href="/" class="text-blue-600">홈</a></li>
            ${
              isLoggedIn
                ? `
                  <li><a href="/profile" class="text-gray-600">프로필</a></li>
                  <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
                `
                : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
            }
        </ul>
    </nav>
    `;
};

export default Nav;
