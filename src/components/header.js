import store from "../store/store";
import handleRoute from "../router";

const matchedPath = (path) => {
  return location.pathname === path;
};

const logout = () => {
  localStorage.removeItem("user");
  store.setLoggedIn(false);
  window.history.pushState({}, "", "/login");
  handleRoute();
};

document.body.addEventListener("click", function (e) {
  if (e.target && e.target.id === "logout") {
    logout();
  }
});

const Header = (loggedIn) => /* html */ {
  return `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${matchedPath("/") ? "text-blue-600" : "text-gray-600"}">홈</a></li>
      ${
        loggedIn
          ? `
            <li><a href="/profile" class="${matchedPath("/profile") ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
            <li><button id="logout" class="text-gray-600">로그아웃</button></li>
          `
          : `
            <li><a href="/login" class="${matchedPath("/login") ? "text-blue-600" : "text-gray-600"}">로그인</a></li>
          `
      }
    </ul>
  </nav>
`;
};

export default Header;
