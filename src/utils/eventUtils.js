import { userUtils } from "./userUtils.js";
import { customRouterUtils } from "./routerUtils.js";
import render from "../App.js";

const eventHandler = (() => {
  const handleLinkClick = async (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();

      if (e.target.textContent === "로그아웃") {
        await userUtils.logout();
        customRouterUtils.navigationTo("/login");
        return;
      }

      const href = e.target.getAttribute("href");
      customRouterUtils.navigationTo(href);
    }
  };

  const handleFormSubmit = (e) => {
    if (e.target.id === "login-form") {
      // 로그인
      e.preventDefault();
      userUtils.setUser({
        username: "testuser",
        email: "",
        bio: "",
      });

      customRouterUtils.navigationTo("/profile");
    }

    if (e.target.id === "profile-form") {
      const username = document.getElementById("username")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const bio = document.getElementById("bio")?.value || "";

      userUtils.setUser({
        username,
        email,
        bio,
      });

      alert("프로필이 업데이트되었습니다.");
    }
  };

  const init = () => {
    document.addEventListener("click", handleLinkClick);
    document.addEventListener("submit", handleFormSubmit);
    window.addEventListener("popstate", render);
    window.addEventListener("hashchange", render);
  };

  return {
    init,
  };
})();

export default eventHandler;
