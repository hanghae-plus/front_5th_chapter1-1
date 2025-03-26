import { ID } from "@/constant.js";
import { getUserInfoFromStorage } from "@/logic/localStorage.js";

const loginLink = () => {
  return `<li><a href="/login" class="text-gray-600">로그인</a></li>`;
};

const logoutLink = () => {
  return `<li><a href="#" id=${ID.LOGOUT_BUTTON} class="text-gray-600">로그아웃</a></li>`;
};

export const Navigation = () => {
  const loggedInUserInfo = getUserInfoFromStorage();

  return `
   <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          ${loggedInUserInfo ? logoutLink() : loginLink()}
        </ul>
      </nav>
  `;
};
