import ProfilePage from "@/pages/profile-page";
import LoginPage from "@/pages/login-page";
import MainPage from "@/pages/main-page";
import hashRouter from "./hashRouter";

hashRouter.addRoute(`/login`, LoginPage);
hashRouter.addRoute(`/profile`, ProfilePage);
hashRouter.addRoute(`/`, MainPage);

window.addEventListener("hashchange", hashRouter.handleRoute);
window.addEventListener("load", hashRouter.handleRoute);

// 이벤트는 렌더링 후 일괄 등록
hashRouter.setAfterRender(() => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username")?.value;
      localStorage.setItem(
        "user",
        JSON.stringify({ username: username || "", email: "", bio: "" }),
      );
      hashRouter.navigateTo("#/");
    });
  }

  const logout = document.getElementById("logout");
  logout?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    hashRouter.navigateTo("#/login");
  });

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    });
  }
});
