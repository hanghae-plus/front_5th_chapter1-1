import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./components/NotFound";
import { RootLayout } from "./layouts/RootLayout";

const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

export const App = ({ user }) => {
  const isHashRouter = location.hash;
  const currentPath = isHashRouter ? location.hash.slice(1) : location.pathname;

  const pageComponent = routes[currentPath];
  if (!pageComponent) {
    return NotFound();
  }
  const page = pageComponent({ user });

  return currentPath.includes("login")
    ? page
    : RootLayout({ children: page, user });
};
