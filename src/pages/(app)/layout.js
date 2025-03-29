import app from "@lib/contexts/app";
import { Header, Nav, Footer } from "@components";

export default function Layout(container, { children }) {
  if (!container) return null;

  const handleNavigation = (e) => {
    if (e.target && e.target.matches('nav a:not([id="logout"])')) {
      e.preventDefault();
      const href = e.target.getAttribute("href");
      app.router.navigate(href);
    }
  };

  const handleLogout = (e) => {
    if (e.target && e.target.id === "logout") {
      e.preventDefault();
      app.authService.logout();
    }
  };

  const html = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ title: "항해플러스" })}
        ${Nav()}
        <main class="p-4">
          ${children()}
        </main>
        ${Footer()}
      </div>
    </div>
  `;

  const cleanUp = () => {
    document.removeEventListener("click", handleNavigation);
    document.removeEventListener("click", handleLogout);
  };

  document.addEventListener("click", handleNavigation);
  document.addEventListener("click", handleLogout);

  return {
    html,
    cleanUp,
  };
}
