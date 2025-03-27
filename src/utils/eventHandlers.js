import { navigate } from "./navigation";
import { renderPage } from "./renderer";
import StorageHelper from "./storageHelper";

document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    if (username) {
      const email = "";
      const bio = "";
      StorageHelper.saveUserInfo({ username, email, bio });
      navigate("/");
    }

    if (!username) {
      alert("이메일 또는 전화번호를 입력해주세요.");
    }
  }

  if (e.target.id === "profile-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;
    StorageHelper.saveUserInfo({ username, email, bio });
    alert("프로필이 업데이트 되었습니다.");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      StorageHelper.logout();
    }
    navigate(e.target.getAttribute("href"));
  }
});

window.addEventListener("popstate", renderPage);
window.addEventListener("hashchange", renderPage);
window.onpopstate = renderPage;
