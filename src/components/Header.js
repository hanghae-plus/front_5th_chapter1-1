const NavComponent = () => `
          <li><div id="home" class="text-blue-600">홈</div></li>
          <li><div id="login" class="text-gray-600">로그인</div></li>
`;

const NavComponentWithLoggedIn = () => `
          <li><div id="home" class="text-blue-600">홈</div></li>
          <li><div id="profile" class="text-gray-600">프로필</div></li>
          <li><div id="logout" class="text-gray-600">로그아웃</div></li>
`;

const HeaderComponent = (userInfo) => {
  const isUserInfo = userInfo?.username;
  return `

<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${isUserInfo ? NavComponentWithLoggedIn() : NavComponent()}
        </ul>
      </nav>
`;
};

export default HeaderComponent;
