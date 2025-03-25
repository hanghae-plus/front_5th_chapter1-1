import { Link, useRouter, useRoute } from "../libs/router";

import store from "../store";

const Header = () => {
  const router = useRouter();
  const route = useRoute();

  const isLoggedIn = store.isLoggedIn();
  const currentPathname = route.pathname;

  const headerNode = document.createElement("header");
  headerNode.classList.add(
    "bg-blue-600",
    "text-white",
    "p-4",
    "sticky",
    "top-0",
  );
  headerNode.innerHTML = `
    <h1 class="text-2xl font-bold">항해플러스</h1>
  `;

  const navItems = isLoggedIn
    ? `
      <li>${Link({ to: "/", className: currentPathname === "/" ? "text-blue-600 font-bold" : "text-gray-600", children: "홈" })}</li>
      <li>${Link({ to: "/profile", className: currentPathname === "/profile" ? "text-blue-600 font-bold" : "text-gray-600", children: "프로필" })}</li>
      <li><a href="#" id="logout" type="button" class="text-gray-600">로그아웃</a></li>
    `
    : `
      <li>${Link({ to: "/", className: currentPathname === "/" ? "text-blue-600" : "text-gray-600", children: "홈" })}</li>
      <li>${Link({ to: "/login", className: "text-gray-600", children: "로그인" })}</li>
    `;

  const navNode = document.createElement("nav");
  navNode.classList.add("bg-white", "shadow-md", "p-2", "sticky", "top-14");
  navNode.innerHTML = `
    <ul class="flex justify-around">
      ${navItems}
    </ul>
  `;

  const handleClickLogout = (event) => {
    if (event.target.id !== "logout") {
      return;
    }

    event.preventDefault();
    store.setUser(null);
    alert("로그아웃 되었습니다.");
    router.push("/login");
  };

  navNode.addEventListener("click", handleClickLogout);

  return [headerNode, navNode];
};

export default Header;
