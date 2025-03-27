const Nav = () => {
  // 환경변수 가져오기
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "/";
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
      const fullPath = window.location.pathname;

      // BASE_URL을 경로에서 제거
      if (BASE_URL !== "/" && fullPath.startsWith(BASE_URL)) {
        // BASE_URL 이후의 경로 추출 (없으면 "/" 반환)
        const routePath = fullPath.substring(BASE_URL.length) || "/";

        // 추출된 경로가 슬래시로 시작하는지 확인
        return routePath.startsWith("/") ? routePath : `/${routePath}`;
      }

      return fullPath; // BASE_URL이 경로에 없으면 전체 경로 반환
    }
  };
  // localStorage에서 user 값을 가져옵니다.
  console.log("getCurrentPath", getCurrentPath());

  const user = localStorage.getItem("user");
  const currentPath = getCurrentPath();
  const isHomeActive = currentPath === "/";
  const isProfileActive = currentPath === "/profile";
  const homeClass = isHomeActive ? "text-blue-600 font-bold" : "text-gray-600";
  const profileClass = isProfileActive
    ? "text-blue-600 font-bold"
    : "text-gray-600";

  // 라우터 타입에 따라 href 속성 형식 결정 (수정된 부분)
  const getHref = (path) => {
    if (!path) return BASE_URL;

    if (routerType === "hash") {
      // 해시 라우팅 경로 형식
      return `#${path}`;
    } else {
      // 브라우저 라우팅 경로 형식
      if (path === "/") {
        return BASE_URL;
      }

      // 경로에서 선행 슬래시 제거
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;

      console.log("cleanPath", cleanPath);

      // BASE_URL에서 후행 슬래시 제거 여부 확인
      const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

      // 경로 조합
      return `${baseUrl}/${cleanPath}`;
    }
  };

  console.log("getHref", getHref());

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
