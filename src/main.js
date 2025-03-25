import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PostForm } from "./components/PostForm";
import { Post } from "./components/Post";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { ErrorPage } from "./pages/ErrorPage";
import { state } from "./store/state";

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
      history.pushState(null, "", newPathName); //url 바뀌어도 새로고침 방지
      render();
    });
  });

  // // 주희 수정
  // const form = document.getElementById("login-form");

  // form.addEventListener("submit", () => {
  //   const username = document.getElementById("username").value;
  //   const password = document.getElementById("password").value;

  //   if (username === "") {
  //     alert("사용자 이름을 입력해주세요.");
  //     return;
  //   }

  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({
  //       username,
  //       email: "",
  //       bio: "",
  //     }),
  //   );
  // });

  // history.pushState(null, "", "/");
  // // 주희 수정

  // console.log("render");
};

render();
