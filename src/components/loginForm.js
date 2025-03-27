import { CONST } from "../data/constants";
import { state } from "../data/state";

export const LoginForm = {
  template: () => `
    <form id="${CONST.loginForm.formId}">
      <div class="mb-4">
        <input type="text" name="${CONST.loginForm.field.username}" id="${CONST.loginForm.field.username}" placeholder="사용자 이름" class="w-full p-2 border rounded">
      </div>
      <div class="mb-6">
        <input type="password" name="${CONST.loginForm.field.password}" id="${CONST.loginForm.field.password}" placeholder="비밀번호" class="w-full p-2 border rounded">
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
    </form>
  `,
  onMount: () => {
    const loginForm = document.getElementById(CONST.loginForm.formId);
    if (!loginForm) return;

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const { username } = Object.fromEntries(formData);

      if (!username) {
        return alert("이름을 입력해주세요");
      }

      const userInfo = state.users.find((user) => user.username === username);

      if (userInfo) {
        state.loggedInUser = userInfo;
      } else {
        const newUserInfo = state.initUser({ username });
        state.loggedInUser = newUserInfo;
        state.users.push(newUserInfo);
        localStorage.setItem(CONST.lsKey.users, JSON.stringify(state.users));
      }

      localStorage.setItem(
        CONST.lsKey.user,
        JSON.stringify(state.loggedInUser),
      );
      window.router.navigate(CONST.pathname.main);
    });
  },
};
