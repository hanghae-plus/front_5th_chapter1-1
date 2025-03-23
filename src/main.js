import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./components/NotFound";
import { RootLayout } from "./layouts/RootLayout";
import { navigate } from "./utils/navigation";
import { getLocalStorage, setLocalStorage } from "./utils/storage";

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

const App = () => {
  const isLoggedIn = !!getLocalStorage("user");
  if (location.pathname === "/profile" && !isLoggedIn) {
    navigate("/login", render);
  }

  const page = routes[location.pathname] || NotFound;
  if (location.pathname !== "/login") {
    return RootLayout({ children: page, isLoggedIn });
  }

  return page;
};

const handleClick = (event) => {
  const { target } = event;

  const isLogout = target.id === "logout";
  if (isLogout) {
    localStorage.removeItem("user");
  }

  const isLink = target.tagName === "A" && target.href;
  if (isLink) {
    event.preventDefault();
    navigate(target.href, render);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  const username = document.getElementById("username")?.value?.trim();
  if (!username) return;

  setLocalStorage("user", { username, email: "", bio: "" });
  navigate("/", render);
};

export const render = () => {
  document.body.innerHTML = App();
  document.body.addEventListener("click", handleClick);
  document.body.addEventListener("submit", handleSubmit);
};

window.addEventListener("popstate", render);

render();
