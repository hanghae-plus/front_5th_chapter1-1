import store from "../../store";
import router from "../../router";

const Header = () => {
  const { navigate } = router();

  const addLogoutHandler = () => {
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        store.dispatch({ type: "LOGOUT" });
        navigate("/login");
      });
    }
  };

  const init = () => {
    addLogoutHandler();
  };

  const render = ({ isLoggedIn }) => {
    const currentPathName = location.pathname;

    const Nav = () => {
      const NavItems = isLoggedIn
        ? /*html*/ `
            <li>
              <a href="/profile" class="${currentPathName === "/profile" ? "text-blue-600 font-bold" : "text-gray-600"}">프로필</a>
            </li>
            <li>
              <a id="logout" href="#" class="text-gray-600">로그아웃</a>
            </li>
          `
        : /*html*/ `
            <li>
              <a href="/login" class="${currentPathName === "/login" ? "text-blue-600 font-bold" : "text-gray-600"}">로그인</a>
            </li>
          `;

      return /*html*/ `
        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="${currentPathName === "/" ? "text-blue-600 font-bold" : "font-gray-600"}">홈</a></li>
            ${NavItems}
          </ul>
        </nav>
      `;
    };

    return /*html*/ `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${Nav()}
    `;
  };

  return { init, render };
};

export default Header;
