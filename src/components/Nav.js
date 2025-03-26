const Nav = () => {
  // pathname으로 라우터 타입 자동 감지
  const detectRouterType = () => {
    // pathname에 hash.html이 포함되어 있으면 해시 라우팅
    return window.location.pathname.includes("hash.html") ? "hash" : "browser";
  };

  const routerType = detectRouterType();

  // 라우터 타입에 따라 현재 경로 확인 방법 결정
  const getCurrentPath = () => {
    if (routerType === "hash") {
      // 해시 라우팅: #/path 형식에서 경로 추출
      return window.location.hash.slice(1) || "/";
    } else {
      // 브라우저 라우팅: 일반 pathname 사용
      return window.location.pathname;
    }
  };
  // localStorage에서 user 값을 가져옵니다.
  const user = localStorage.getItem("user");
  const currentPath = getCurrentPath();
  const isHomeActive = currentPath === "/";
  const isProfileActive = currentPath === "/profile";
  const homeClass = isHomeActive ? "text-blue-600 font-bold" : "text-gray-600";
  const profileClass = isProfileActive
    ? "text-blue-600 font-bold"
    : "text-gray-600";

  // 라우터 타입에 따라 href 속성 형식 결정
  const getHref = (path) => {
    return routerType === "hash" ? `#${path}` : path;
  };

  let navItems;

  // user 값이 없으면 홈과 로그인 링크를 생성
  if (!user) {
    navItems = `
      <li><a href="${getHref("/")}" class="${homeClass}">홈</a></li>
      <li><a href="${getHref("/login")}" class="text-gray-600">로그인</a></li>
    `;
  } else {
    // user 값이 있으면 홈과 프로필, 로그아웃 링크를 생성
    navItems = `
      <li><a href="${getHref("/")}" class="${homeClass}">홈</a></li>
      <li><a href="${getHref("/profile")}" class="${profileClass}">프로필</a></li>
      <li><a id="logout" href="${getHref("/logout")}" class="text-gray-600">로그아웃</a></li>
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
