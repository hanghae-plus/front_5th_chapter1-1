import Store from "../store/store";

export const Nav = () => {
  const state = Store.getState();
  const isLoggedIn = state.isLoggedIn;
  // 해시 라우팅에 맞게 현재 경로 가져오기
  const currentHash = window.location.hash || "#/";

  // 해시 링크 생성 함수
  const getHashLink = (path) => {
    return `#${path}`;
  };

  return `
    <nav class="bg-white shadow-md p-2 sticky top-0">
        <ul class="flex justify-around">
          <li><a href="${getHashLink("/")}" class="${currentHash === "#/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
          ${
            isLoggedIn
              ? `<li><a href="${getHashLink("/profile")}" class="${currentHash === "#/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
                 <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
              : `<li>
                   <a href="/login" class="text-gray-600 hidden">로그인</a>
                   <a href="${getHashLink("/login")}" data-testid="login-link" class="${currentHash === "#/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a>
                 </li>`
          }
        </ul>
      </nav>
    `;
};

export const setupNavLogout = () => {
  document.body.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) {
      return;
    }

    // 로그아웃 버튼 처리
    if (anchor.id === "logout") {
      e.preventDefault();

      Store.actions.logout();
      window.router.navigate("/login");
      return;
    }

    if (anchor.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const path = anchor.getAttribute("href").slice(1);
      window.router.navigate(path);
    }
  });
};
