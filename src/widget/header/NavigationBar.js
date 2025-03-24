import { config } from "../../shared/config";

export const NavigationBar = (isLogin, pathname) => {
  return `
  <ul class="flex justify-around">
    <li><a href="/" data-link class="${pathname === `${config.basePath}` ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
   ${
     isLogin
       ? `<li><a href="/profile" data-link class="${pathname === `${config.basePath}/profile` ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
   <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`
       : ` <li><a href="/login" data-link class="text-gray-600">로그인</a></li>`
   }
  </ul>
`;
};
