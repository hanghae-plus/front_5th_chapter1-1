export const Header = () => {
  const userInfo = localStorage.getItem("user");

  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
  
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-blue-600">홈</a></li>

            ${
              userInfo
                ? ` <li><a href="/profile" class="text-gray-600">프로필</a></li>
                            <li><a href="#" id=logout class="text-gray-600">로그아웃</a></li>`
                : `<li><a href="/login" class="text-gray-600">로그인</a></li> `
            } 
           
           
          </ul>
        </nav>
  
  `;
};

// 로그아웃 처리
export function Logout() {
  const logoutLink = document.getElementById("logout");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("로그아웃 클릭됨"); // 디버깅용 로그
      localStorage.removeItem("user");

      if (window.location.hash.length > 0) {
        window.location.hash = "#/"; // Hash Router
      } else {
        window.history.pushState({}, "", "/"); // History Router
      }
      window.router(); // 라우터 호출로 페이지 갱신
    });
  }
}
