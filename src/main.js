import ProfilePage from "@/pages/profile-page";
import LoginPage from "@/pages/login-page";
import MainPage from "@/pages/main-page";
import router from "./router";

router.addRoute("/login", LoginPage);
router.addRoute("/profile", ProfilePage);
router.addRoute("/", MainPage);

router.navigateTo(location.pathname);

// 이벤트는 렌더링 후 일괄 등록
router.setAfterRender(() => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username")?.value;
      localStorage.setItem(
        "user",
        JSON.stringify({ username: username || "", email: "", bio: "" }),
      );
      router.navigateTo("/");
    });
  }

  const logout = document.getElementById("logout");
  logout?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    router.navigateTo("/login");
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
