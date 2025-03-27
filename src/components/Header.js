import { render } from "../main";
import hashState from "../store/hash";
import user from "../store/user";

const Header = () => {
  const navCondition = (route) => {
    return hashState.getHashState()
      ? location.hash === "#" + route
      : location.pathname === route;
  };

  const template = () => {
    return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>

    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
      ${
        user.getIsLoggedIn()
          ? `
           <li><a id="btn-home" href="/" class="${navCondition("/") ? "font-bold text-blue-600" : "text-gray-600"}">홈</a></li>
           <li><a id="btn-profile" href="/profile" class="${navCondition("/profile") ? "font-bold text-blue-600" : "text-gray-600"}">프로필</a></li>
           <li><a id="logout" href="/" class="text-gray-600">로그아웃</a></li>`
          : `
            <li><a id="btn-home" href="/" class="text-blue-600 font-bold">홈</a></li>
            <li><a id="btn-login" href="/login" class="text-gray-600">로그인</a></li>
            `
      }
      </ul>
    </nav>`;
  };

  const action = () => {
    const navEl = document.querySelector("nav ul");
    if (navEl) {
      navEl.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.id === "btn-home") {
          if (!hashState.getHashState()) {
            render("/");
          } else {
            import("../main.hash").then((mainHash) =>
              mainHash.hashRender("#/"),
            );
          }
        }

        if (e.target.id === "btn-login") {
          if (!hashState.getHashState()) {
            render("/login");
          } else {
            import("../main.hash").then((mainHash) =>
              mainHash.hashRender("#/login"),
            );
          }
        }

        if (e.target.id === "btn-profile") {
          if (!hashState.getHashState()) {
            render("/profile");
          } else {
            import("../main.hash").then((mainHash) =>
              mainHash.hashRender("#/profile"),
            );
          }
        }

        if (e.target.id === "logout") {
          user.setIsLoggedIn(false);
          localStorage.removeItem("user");

          if (!hashState.getHashState()) {
            render("/login");
          } else {
            import("../main.hash").then((mainHash) =>
              mainHash.hashRender("#/login"),
            );
          }
        }
      });
    }
  };

  return { template, action };
};

export default Header;
