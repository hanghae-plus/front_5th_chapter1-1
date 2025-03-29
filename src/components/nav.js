import app from "@lib/contexts/app";
import { NAV_CONFIGS } from "@lib/configs/nav";
import AuthService from "@lib/services/auth";

export function Nav() {
  const isAuthenticated = AuthService.isAuthenticated;

  const navLink = (link) => {
    const { href, id, label } = link;

    const isActive =
      app.routerType === "hash"
        ? window.location.hash === `#${href}`
        : window.location.pathname === href;

    return `<li><a id="${id}" href="${href}" class="${isActive ? "font-bold text-blue-600" : "text-gray-600"}">${label}</a></li>`;
  };

  return `
    <nav id="nav" role="navigation" class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${NAV_CONFIGS.common.map(navLink).join("")}
        ${isAuthenticated ? NAV_CONFIGS.authenticated.map(navLink).join("") : ""}
        ${!isAuthenticated ? NAV_CONFIGS.unauthenticated.map(navLink).join("") : ""}
      </ul>
    </nav>
  `;
}
