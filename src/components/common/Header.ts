import { useUserStore } from "@/store";

const Nav = () => {
  const userStore = useUserStore();
  const pathname = location.pathname;
  const hash = location.hash;
  const splittedPathname = pathname.split("/");
  const currentHref = hash
    ? hash.slice(1)
    : `/${splittedPathname[splittedPathname.length - 1]}`;
  const status = userStore.user ? "loggedIn" : "logout";
  const menus = {
    loggedIn: [
      {
        href: "/",
        id: "home",
        title: "홈",
      },
      {
        href: "/profile",
        id: "profile",
        title: "프로필",
      },
      {
        href: "/login",
        id: "logout",
        title: "로그아웃",
      },
    ],
    logout: [
      {
        href: "/",
        id: "home",
        title: "홈",
      },
      {
        href: "/login",
        id: "/login",
        title: "로그인",
      },
    ],
  };

  return /* HTML */ `<nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      ${menus[status]
        .map(
          ({ href, id, title }) =>
            `<li><a href="${href}" id=${id} class="${currentHref === href ? "font-bold text-blue-600" : "text-gray-600"}">${title}</a></li>`,
        )
        .join("")}
    </ul>
  </nav>`;
};

const Header = () => {
  const userStore = useUserStore();

  const template = () =>
    /* HTML */ `<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>
      ${Nav()} `;

  const setEventHandlers = () => {
    const handleClick = () => {
      userStore.logout();
    };

    document.getElementById("logout")?.addEventListener("click", handleClick);
  };

  return {
    template,
    setEventHandlers,
  };
};

export default Header;
