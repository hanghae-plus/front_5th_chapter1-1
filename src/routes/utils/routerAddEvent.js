import { userAction } from "../../store/action/userAction";
import { moveToPage } from "./moveToPage";
import { routerState } from "../routerManager";

export const routerAddEvent = (root) => {
  if (!root) return;

  root.addEventListener("click", (event) => {
    const target = event.target.closest("a");
    if (!target) return;

    event.preventDefault();

    if (target.id === "logout") {
      userAction.logout();
      moveToPage("/login");
      return;
    }

    routerState.mode === "history"
      ? moveToPage(target.pathname)
      : moveToPage(target.getAttribute("href"));
  });

  root.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "login-form") {
      const username = event.target.elements.username.value;

      if (!username) {
        return alert("사용자 이름을 입력해주세요.");
      }

      userAction.login(username);
      moveToPage("/profile");
    }

    if (event.target.id === "profile-form") {
      const username = event.target.elements.username.value;
      const email = event.target.elements.email.value;
      const bio = event.target.elements.bio.value;
      userAction.updateUserProfile(username, email, bio);
      alert("프로필이 업데이트되었습니다.");
    }
  });
};
