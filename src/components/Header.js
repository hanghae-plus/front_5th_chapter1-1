import StorageHelper from "../utils/storageHelper";

const setActiveClass = (currentUrl, targetUrl) => {
  return currentUrl === targetUrl ? "text-blue-600 font-bold" : "text-gray-600";
};

const LoggedInMenu = (currentUrl) => {
  return `
    <li><a href="/" class="${setActiveClass(currentUrl, "/")}">홈</a></li>
    <li><a href="/profile" class="${setActiveClass(currentUrl, "/profile")}">프로필</a></li>
    <li><a id="logout" href="/login" class="text-gray-600">로그아웃</a></li>
  `;
};

const LoggedOutMenu = (currentUrl) => {
  return `
    <li><a href="/" class="${setActiveClass(currentUrl, "/")}">홈</a></li>
    <li><a href="/login" class="${setActiveClass(currentUrl, "/login")}">로그인</a></li>
  `;
};
const Header = (currentUrl) => {
  const isLoggedIn = StorageHelper.isLoggedIn();
  const renderMenu = () => {
    if (isLoggedIn) {
      return LoggedInMenu(currentUrl);
    } else {
      return LoggedOutMenu(currentUrl);
    }
  };

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${renderMenu()}
        </ul>
      </nav>
  `;
};

export default Header;
