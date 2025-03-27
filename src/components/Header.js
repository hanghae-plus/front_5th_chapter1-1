import { state } from "../state";

export const Header = () => {
  const headerElem = document.createElement("header");
  headerElem.classList.add(
    "bg-blue-600",
    "text-white",
    "p-4",
    "sticky",
    "top-0",
  );

  const currPath = window.location.pathname;
  const makeLiClass = (href) => {
    return href === currPath ? "text-blue-600 font-bold" : "text-gray-600";
  };

  const render = () => {
    const isProduction = import.meta.env.MODE === "production";
    const BASE = isProduction ? "/front_5th_chapter1-1" : "";
    headerElem.innerHTML = `
      <h1 class="text-2xl font-bold">항해플러스</h1>
      <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
          ${
            state.isLoggedIn
              ? `
              <li><a href="${BASE}/" class="${makeLiClass(`/`)}">홈</a></li>
              <li><a href="${BASE}/profile" class="${makeLiClass(`/profile`)}">프로필</a></li>
              <li><a href="${BASE}/login" id="logout" class="text-gray-600">로그아웃</a></li>
              `
              : `
              <li><a href="${BASE}/" class="${makeLiClass(`/`)}">홈</a></li>
              <li><a href="${BASE}/login" class="${makeLiClass(`/login`)}">로그인</a></li>
              `
          }
          </ul>
      </nav>
  `;
  };

  render();
  state.subscribe(render);
  return headerElem;
};
