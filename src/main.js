import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PostForm } from "./components/PostForm";
import { Post } from "./components/Post";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { state, setLoggedIn } from "./store/state";

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
  const isLoggedIn = state.loggedIn;

  if (location.pathname === "/login") {
    return LoginPage();
  }
  if (location.pathname === "/profile") {
    if (isLoggedIn) {
      return ProfilePage();
    } else {
      history.pushState(null, "", "/login");
      return LoginPage();
    }
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

export const render = () => {
  document.getElementById("root").innerHTML = App();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", newPathName); //url 바뀌어도 새로고침 방지
      render();
    });
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "login-form") {
      e.preventDefault();
      const username = document.getElementById("username")?.value || "";

      if (!username) {
        alert("사용자 이름을 입력해주세요.");
        return;
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email: "", bio: "" }),
        );
        // alert("로그인 정보가 저장되었습니다.");
        setLoggedIn({ newLoggedIn: true });
        history.pushState(null, "", "/"); //메인페이지 이동 - TODO "?" 생기는 증상
        render();
      }
    } else if (e.target.id === "profile-form") {
      e.preventDefault();
      const username = document.getElementById("username").value || "";
      const email = document.getElementById("email").value || "";
      const bio = document.getElementById("bio").value || "";

      localStorage.setItem(
        "user",
        JSON.stringify({ username: username, email: email, bio: bio }),
      );
    }
  });
};

render();
