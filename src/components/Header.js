import userStore from "../stores/userStore.js";

const navigations = [
  { href: "/", label: "홈", id: "home" },
  { href: "/profile", label: "프로필", id: "profile" },
  { href: "/login", label: "로그인", id: "login" },
  { href: "#", label: "로그아웃", id: "logout" },
];

const isVisibleLink = ({ id, isLoggedIn }) => {
  if (id === "home") return true;
  if (id === "profile") return isLoggedIn;
  if (id === "login") return !isLoggedIn;
  if (id === "logout") return isLoggedIn;

  return false;
};

const Nav = ({ isLoggedIn, currentPathname }) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      ${navigations
        .filter(({ id }) => isVisibleLink({ id, isLoggedIn }))
        .map(
          ({ href, label, id }) => `
            <li>  
              <a
                id="${id}"
                href="${href}"
                class="${currentPathname.endsWith(href) ? "text-blue-600 font-bold" : "text-gray-600"}">
                ${label}
              </a>
            </li>
          `,
        )
        .join("")}
    </ul>
  </nav>
`;

const Header = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  ${Nav({ isLoggedIn: userStore.isLoggedIn(), currentPathname: location.pathname })}
`;

export default Header;
