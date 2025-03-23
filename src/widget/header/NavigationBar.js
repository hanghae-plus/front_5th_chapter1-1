export const NavigationBar = (isLogin, pathname) => {
  return `
  <ul class="flex justify-around">
    <li><a href="/" class="${pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
   ${
     isLogin
       ? `<li><a href="/profile" class="${pathname === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
   <li><a id="logout" href="#" class="text-gray-600">로그아웃</a></li>`
       : ` <li><a href="/login" class="text-gray-600">로그인</a></li>`
   }
  </ul>
`;
};
