const Nav = () => {
  // localStorage에서 user 값을 가져옵니다.
  const user = localStorage.getItem("user");
  const currentPath = location.pathname;
  const isHomeActive = currentPath === "/";
  const isProfileActive = currentPath === "/profile";
  const homeClass = isHomeActive ? "text-blue-600 font-bold" : "text-gray-600";
  const profileClass = isProfileActive
    ? "text-blue-600 font-bold"
    : "text-gray-600";

  let navItems;

  // user 값이 없으면 홈과 로그인 링크를 생성
  if (!user) {
    navItems = `
      <li><a href="/" class="${homeClass}">홈</a></li>
      <li><a href="/login" class="text-gray-600">로그인</a></li>
    `;
  } else {
    // user 값이 있으면 홈과 프로필, 로그아웃 링크를 생성
    navItems = `
      <li><a href="/" class="${homeClass}">홈</a></li>
      <li><a href="/profile" class="${profileClass}">프로필</a></li>
      <li><a id="logout" href="/logout" class="text-gray-600">로그아웃</a></li>
    `;
  }

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navItems}
      </ul>
    </nav>
  `;
};

export default Nav;
