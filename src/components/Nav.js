import Store from "../store/store";

export const Nav = () => {
  const state = Store.getState();
  const isLoggedIn = state.isLoggedIn;

  const BASE_ROUTE = window.BASE_ROUTE || "";

  const isHashMode = window.location.hash.length > 0;

  const currentHash = window.location.hash.slice(1) || "/";
  const currentPathname =
    window.location.pathname.replace(BASE_ROUTE, "") || "/";

  const getHashLink = (path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `#${normalizedPath}`;
  };

  const getPathLink = (path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_ROUTE}${normalizedPath}`;
  };

  const getLink = (path) => {
    return isHashMode ? getHashLink(path) : getPathLink(path);
  };

  const isActive = (path) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return isHashMode
      ? currentHash === normalizedPath
      : currentPathname === normalizedPath;
  };

  return `
    <nav class="bg-white shadow-md p-2 sticky top-0">
      <ul class="flex justify-around">
        <li>
          <a href="${getLink("/")}" 
             class="${isActive("/") ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a>
        </li>
        ${
          isLoggedIn
            ? `
            <li>
              <a href="${getLink("/profile")}" 
                 class="${isActive("/profile") ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a>
            </li>
            <li>
              <a href="#" id="logout" class="text-gray-600">로그아웃</a>
            </li>
            `
            : `
            <li>
              <a href="${getLink("/login")}"
                 class="${isActive("/login") ? "text-blue-600 font-bold" : "text-gray-600"}"
                 data-testid="login-link">로그인</a>
            </li>
            `
        }
      </ul>
    </nav>
  `;
};

export const setupNavLogout = () => {
  document.body.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    // 로그아웃 버튼 처리
    if (anchor.id === "logout") {
      e.preventDefault();
      Store.actions.logout();

      if (window.location.hash) {
        window.hashRouter.navigate("/login");
      } else {
        window.router.navigate("/login");
      }
      return;
    }

    // 해시 링크 처리
    if (anchor.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const path = anchor.getAttribute("href").slice(1);
      window.hashRouter.navigate(path);
      return;
    }

    // BASE_ROUTE가 포함된 경로 링크 처리
    const BASE_ROUTE = window.BASE_ROUTE || "";
    const href = anchor.getAttribute("href");

    if (BASE_ROUTE && href.startsWith(BASE_ROUTE)) {
      e.preventDefault();
      const path = href.replace(BASE_ROUTE, "");
      window.router.navigate(path);
    }
  });
};
