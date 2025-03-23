import router from "../module/route";

const nav = () => {
  const navList = [
    { name: "홈", href: "/" },
    { name: "프로필", href: "/profile" },
    { name: "로그인", href: "/login" },
  ];
  const path = router.getCurrentPath();
  const activeNav = navList.find((item) => item.href === path);

  return /* HTML */ `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${navList
          .map(
            (item) => /* HTML */ `
              <li>
                <a
                  href="${item.href}"
                  class="${activeNav === item
                    ? "text-blue-500"
                    : "text-gray-600"}"
                  id="nav-link"
                  >${item.name}</a
                >
              </li>
            `,
          )
          .join("")}
      </ul>
    </nav>
  `;
};

export default nav;
