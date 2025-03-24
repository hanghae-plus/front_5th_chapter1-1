import login from "../module/login";
import router from "../module/route";
import user from "../module/user";

const nav = () => {
  const navList = [
    { id: "home", name: "홈", href: "/" },
    { id: "profile", name: "프로필", href: "/profile" },
    { id: "auth", name: "로그인", href: "/login" },
  ];
  const path = router.getCurrentPath();
  const activeNav = navList.find((item) => item.href === path);
  const { isLoggedIn } = user();

  return /* HTML */ `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList
          .map((item) => {
            if (item.id === "auth") {
              return isLoggedIn
                ? /* HTML */ `
                    <li>
                      <button id="logout" class="text-gray-600">
                        로그아웃
                      </button>
                    </li>
                  `
                : /* HTML */ `
                    <li>
                      <a
                        href="${item.href}"
                        class="${activeNav?.id === item.id
                          ? "text-blue-500"
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
                  href="${item.href}"
                  class="${activeNav?.id === item.id
                    ? "text-blue-500"
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

    console.log("jiwon 로그아웃 버튼 클릭");
    const { logout } = login;
    logout();
  }
});

export default nav;
