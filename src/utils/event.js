import { Router } from "./router.js";
import store from "../store/index.js";

window.addEventListener("popstate", () => {
  //url이 바뀔때마다 popstate 이벤트로 URL 변경 감지

  Router.render();
});

document.addEventListener("click", (e) => {
  if (
    e.target.id === "profile" ||
    e.target.id === "logout" ||
    e.target.id === "login" ||
    e.target.id === "home"
  ) {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      localStorage.removeItem("user");
      if (Router.RouterType === "hash") {
        // if (window.location.hash !== '') {
        window.location.hash = "/login";
      } else {
        window.history.pushState({}, "", "/login");
      }
      Router.render();
      return;
    }
    console.log("e.target.href", e.target.href);
    const path = e.target.href.split("/").pop();
    console.log("path", path);

    if (Router.RouterType === "hash") {
      // if (window.location.hash !== '') {
      window.location.hash = path ? "/" + path : "/";
      console.log("window.location.hash", window.location.hash);
    } else {
      window.history.pushState({}, "", path ? "/" + path : "/");
    }
    Router.render();
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();

    const username = document.getElementById("username").value;

    store.setState({
      username,
      email: "",
      bio: "",
    });

    if (username !== "") {
      history.pushState(null, "", "/profile");
      Router.render("/profile");
      // ❯ 5. 상태 관리 구현 (1)
      //× 로그인 상태에 따라 UI가 변경된다
      //여기서 프로필 화면 간건데 로그인 페이지를 받았다고 나온다
    }
  } else if (e.target.id === "profile-form") {
    e.preventDefault();
    console.log("프로필 제출");
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    store.setState({
      username,
      email,
      bio,
    });
    console.log("store", store.state);
    // localStorage.setItem('user', JSON.stringify({
    //     username,
    //     email,
    //     bio
    // }))
  }
});
