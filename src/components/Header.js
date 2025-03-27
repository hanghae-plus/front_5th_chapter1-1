import { ROUTE_PATHS } from "../constants";
import { router } from "../main";
import { authStore, logout } from "../store/authStore";
import { executeCleanup, registerCleanup } from "../util/cleanup";

const BASE_PATH = import.meta.env.BASE_URL;

const CLASS_NAME = {
  ACTIVE: "text-blue-600",
  INACTIVE: "text-gray-600",
  BOLD: "font-bold",
};

const Header = () => {
  const isLoggedIn = authStore.getState("isLoggedIn");

  const render = () => {
    return /* html */ `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
    
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" id="home" class="${CLASS_NAME.INACTIVE}">홈</a></li>
          ${
            isLoggedIn
              ? `
                <li><a href="/profile" id="profile" class="${CLASS_NAME.INACTIVE}">프로필</a></li>
                <li><a href="/login" id="logout" class="${CLASS_NAME.INACTIVE}">로그아웃</a></li>
              `
              : `<li><a href="/login" id="login" class="${CLASS_NAME.INACTIVE}">로그인</a></li>`
          }
        </ul>
      </nav>
    `;
  };

  const onRendered = () => {
    const pathname = window.location.pathname.replace(BASE_PATH, "/");

    const nav = document.querySelector("nav");
    const links = nav.querySelectorAll("li");
    const activeLink = nav.querySelector(`a[href="${pathname}"]`);

    if (activeLink) {
      activeLink.classList = `${CLASS_NAME.ACTIVE} ${CLASS_NAME.BOLD}`;
    }

    const handleClickLink = (event) => {
      event.preventDefault();

      if (event.target.classList.contains(CLASS_NAME.ACTIVE)) return;

      if (event.target.id === "logout") {
        executeCleanup("header");
        logout();
        router.navigate(ROUTE_PATHS.LOGIN);
        return;
      }

      const currentActiveLink = nav.querySelector(`a.text-blue-600`);

      currentActiveLink.classList = `${CLASS_NAME.INACTIVE}`;

      event.target.classList = `${CLASS_NAME.ACTIVE} ${CLASS_NAME.BOLD}`;

      router.navigate(event.target.pathname.replace(BASE_PATH, "/"));
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClickLink);

      registerCleanup(`header-${link.id}`, () =>
        link.removeEventListener("click", handleClickLink),
      );
    });
  };

  return {
    render,
    onRendered,
  };
};

export default Header;
