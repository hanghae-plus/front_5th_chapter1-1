export const Nav = () => {
  const isLoggedIn = localStorage.getItem("user") !== null;

  return `
      <nav class="bg-white shadow-md p-2 sticky top-0">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          ${
            isLoggedIn
              ? '<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>'
              : '<li><a href="/login" class="text-gray-600">로그인</a></li>'
          }
        </ul>
      </nav>
    `;
};

export const setupNavLogout = () => {
  const isLoggedIn = localStorage.getItem("user") !== null;

  if (isLoggedIn) {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        window.router.navigate("/login");
      });
    }
  }
};

export default Nav;
