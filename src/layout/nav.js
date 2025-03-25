import login from "../module/login.js";
import router from "../module/route.js";
import user from "../module/user.js";
import routeConfig from "../config/routerConfig.js";

const nav = () => {
  const navList = [
    { id: "home", name: "홈", href: "/" },
    { id: "profile", name: "프로필", href: "/profile" },
    { id: "auth", name: "로그인", href: "/login" },
  ];
  const path = router.getCurrentPath();
  const activeNav = navList.find((item) => item.href === path);
  const { isLoggedIn } = user();

  // href 속성 생성 함수
  const getHref = (path) => {
    return routeConfig.getMode() === "hash" ? `#${path}` : path;
  };

  return /* HTML */ `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList
          .map((item) => {
            if (item.id === "auth") {
              return isLoggedIn
                ? /* HTML */ `
                    <li>
                      <a href="#" id="logout" class="text-gray-600">로그아웃</a>
                    </li>
                  `
                : /* HTML */ `
                    <li>
                      <a
                        href="${getHref(item.href)}"
                        class="${activeNav?.id === item.id
                          ? "text-blue-600 font-bold"
                          : "text-gray-600"}"
                        id="nav-link"
                        >${item.name}</a
                      >
                    </li>
                  `;
            }

            // 일반 항목
            return /* HTML */ `
              <li>
                <a
                  href="${getHref(item.href)}"
                  class="${activeNav?.id === item.id
                    ? "text-blue-600 font-bold"
                    : "text-gray-600"}"
                  id="nav-link"
                  >${item.name}</a
                >
              </li>
            `;
          })
          .join("")}
      </ul>
    </nav>
  `;
};

document.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    e.preventDefault();

    const { logout } = login;
    logout();
  }
});

export default nav;
