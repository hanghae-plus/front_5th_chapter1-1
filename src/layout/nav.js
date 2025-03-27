import router from "../module/route.js";
import userStore from "../module/userStore.js";
import routeConfig from "../config/routerConfig.js";
import login from "../module/login.js";

const createNav = () => {
  let isInitialized = false; // 한 번만 구독하도록 클로저로 관리

  const render = () => {
    const navList = [
      { id: "home", name: "홈", href: "/" },
      { id: "profile", name: "프로필", href: "/profile" },
      { id: "auth", name: "로그인", href: "/login" },
    ];
    const path = router.getCurrentPath();
    const activeNav = navList.find((item) => item.href === path);
    const isLoggedIn = userStore.isLoggedIn();

    const getHref = (path) => {
      return routeConfig.getMode() === "hash" ? `#${path}` : path;
    };

    return /* HTML */ `
      <nav class="bg-white shadow-md p-2 sticky top-14" id="navigation">
        <ul class="flex justify-around">
          ${navList
            .map((item) => {
              if (item.id === "auth") {
                return isLoggedIn
                  ? `<li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>`
                  : `<li>
                      <a href="${getHref(item.href)}"
                         class="${activeNav?.id === item.id ? "text-blue-600 font-bold" : "text-gray-600"}"
                         id="nav-link">${item.name}</a>
                     </li>`;
              }
              return `<li>
                <a href="${getHref(item.href)}"
                   class="${activeNav?.id === item.id ? "text-blue-600 font-bold" : "text-gray-600"}"
                   id="nav-link">${item.name}</a>
              </li>`;
            })
            .join("")}
        </ul>
      </nav>
    `;
  };

  const mount = () => {
    if (!isInitialized) {
      userStore.subscribe(() => {
        const container = document.getElementById("nav");
        if (container) {
          container.innerHTML = render();
        }
      });
      isInitialized = true;
    }
    return render();
  };

  return mount;
};

// document 레벨에서 이벤트 위임
document.addEventListener("click", (e) => {
  if (e.target.id === "logout") {
    e.preventDefault();
    login.logout();
  }
});

const nav = createNav();

export default nav;
