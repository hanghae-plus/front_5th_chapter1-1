import router from "../router";

const NavigationMenu = ({ id, href, label, onLoggedIn, onLoggedOut }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const unselectedStyle = "text-gray-600";
  const selectedStyle = "text-blue-600 font-bold";
  const iseSelected = location.pathname === href;

  const isVisible = (isLoggedIn && onLoggedIn) || (!isLoggedIn && onLoggedOut);

  return /* HTML */ isVisible
    ? `
    <li>
      <a id=${id} href=${href} class=${iseSelected ? selectedStyle : unselectedStyle}
        >${label}</a
      >
    </li>
  `
    : undefined;
};

const Navigation = () => {
  const menus = [
    { id: "home", href: "/", label: "홈", onLoggedIn: true, onLoggedOut: true },
    {
      id: "profile",
      href: "/profile",
      label: "프로필",
      onLoggedIn: true,
      onLoggedOut: false,
    },
    {
      id: "logout",
      href: "#",
      label: "로그아웃",
      onLoggedIn: true,
      onLoggedOut: false,
    },
    {
      id: "login",
      href: "/login",
      label: "로그인",
      onLoggedIn: false,
      onLoggedOut: true,
    },
  ];

  setTimeout(() => {
    const button = document.getElementById("logout");
    button?.addEventListener("click", (e) => {
      e.preventDefault();
      // 1. local storage에 사용자 정보 삭제
      localStorage.removeItem("user");
      console.log(localStorage.getItem("user"));

      // 2. Main Page로 라우트
      router.navigateTo("/login");
    });
  });

  return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${menus.map((menu) => NavigationMenu(menu)).join("")}
        </ul>
      </nav>  
  `;
};

export default Navigation;
