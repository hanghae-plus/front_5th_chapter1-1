import { MOCK_POSTS } from "./posts";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PostForm } from "./components/PostForm";
import { Post } from "./components/Post";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";

const state = {
  loggedIn: false,
  posts: MOCK_POSTS,
};

const MainPage = () => /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header({ loggedIn: state.loggedIn })}
      <main class="p-4">
      ${PostForm()}
        <div class="space-y-4">
        ${state.posts.map(Post).join("")}
        </div>
      </main>
      ${Footer()}
    </div>
  </div>
`;

const App = () => {
  if (location.pathname === "/login") {
    return LoginPage();
  }
  if (location.pathname === "/profile") {
    return ProfilePage();
  }
  if (location.pathname === "/") {
    return MainPage();
  }
  return ErrorPage();
};

//뒤로가기, 앞으로가기 동작
window.addEventListener("popstate", () => {
  render();
});

const render = () => {
  document.getElementById("root").innerHTML = App();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", newPathName);
      render();
    });
  });
};

render();
