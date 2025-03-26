const Header = (/*html*/) => {
  const loggedIn = isLoggedIn();

  function isLoggedIn() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData !== null;
  }

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  console.log(currentPath);
  console.log(currentHash);

  return `
    <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="${currentPath === "/" || currentHash == "#/" ? "text-blue-600 font-bold" : "text-gray-600"}">홈</a></li>
            </li>
            ${
              loggedIn
                ? `<li><a href="/profile" class="${currentPath === "/profile" || currentHash == "#/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a></li>
                <li><a href="/login" class="${currentPath === "/login" || currentHash == "#/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그아웃</a></li>
              `
                : `<li><a href="/login" id='logout' class="${currentPath === "/login" || currentHash == "#/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a></li>`
            }
            
         
          </ul>
        </nav>
  `;
};

export default Header;
