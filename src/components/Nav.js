import { userContext } from "../context/userContext.js";

export const Nav = () => {
  const state = userContext.getState();
  const { isLoggedIn, path } = state;

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li>
          <a href="/" class="${path === "/" ? "text-blue-600 font-bold" : "text-gray-600"}">
            홈
          </a>
        </li>
        ${
          isLoggedIn
            ? `
            <li>
              <a href="/profile" class="${path === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">
                프로필
              </a>
            </li>
            <li>
              <a href="/login" id="logout" class="text-gray-600">로그아웃</a>
            </li>
            `
            : `
            <li>
              <a href="/login" class="${path === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}">
                로그인
              </a>
            </li>
            `
        }
      </ul>
    </nav>
  `;
};

// 로그아웃 이벤트 리스너 등록
document.addEventListener("click", (event) => {
  if (event.target.id === "logout") {
    event.preventDefault();
    // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    // 상태 업데이트
    userContext.setState({
      isLoggedIn: false,
      user: null,
      path: "/login",
    });

    // 로그인 페이지로 리다이렉트
    window.history.pushState({}, "", "/login");
    userContext.setState({ path: "/login" });
  }
});
