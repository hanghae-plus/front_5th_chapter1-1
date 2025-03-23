import { CONST } from "./constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./pages";

const savedUserList = localStorage.getItem(CONST.lsKey.users) || "[]";
const users = JSON.parse(savedUserList);

const savedUser = localStorage.getItem(CONST.lsKey.user) || "null";
const user = JSON.parse(savedUser);

const state = {
  users,
  loggedInUser: user,
};

const initUser = ({ username }) => ({
  username,
  email: "",
  bio: "",
});

const routes = {
  [CONST.pathname.main]: { render: MainPage },
  [CONST.pathname.login]: {
    render: LoginPage,
    onRender: () => {
      if (state.loggedInUser) {
        return render(CONST.pathname.main);
      }

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
          // 가입한 적 있는 유저
          state.loggedInUser = userInfo;
        } else {
          const newUserInfo = initUser({ username });
          state.loggedInUser = newUserInfo;
          state.users.push(newUserInfo);
          localStorage.setItem(CONST.lsKey.users, JSON.stringify(state.users));
        }
        localStorage.setItem(
          CONST.lsKey.user,
          JSON.stringify(state.loggedInUser),
        );
        render(CONST.pathname.main);
      });
    },
  },
  [CONST.pathname.profile]: {
    render: ProfilePage,
    onRender: () => {
      if (!state.loggedInUser) {
        return render(CONST.pathname.login);
      }
      const profileForm = document.getElementById(CONST.profileForm.formId);
      if (!profileForm) return;

      // 전역 객체에 저장된 user profile 데이터를 form에 초기화
      if (state.loggedInUser) {
        const fieldIdList = [
          CONST.profileForm.field.username,
          CONST.profileForm.field.bio,
          CONST.profileForm.field.email,
        ];
        for (const fieldId of fieldIdList) {
          const field = profileForm.querySelector(`#${fieldId}`);
          field.value = state.loggedInUser[fieldId];
        }
      }

      // 제출시 form의 data를 localstorage에 저장
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(profileForm);
        const newData = Object.fromEntries(formData);
        const oldData = state.loggedInUser;

        const isProfileChanged =
          newData.username !== oldData.username ||
          newData.email !== oldData.email ||
          newData.bio !== oldData.bio;

        if (isProfileChanged) {
          const newUserInfo = { ...state.loggedInUser, ...newData };
          const userIndex = state.users.findIndex(
            (user) => user.id === state.loggedInUser.id,
          );
          state.users.splice(userIndex, 1, newUserInfo);
          localStorage.setItem(CONST.lsKey.users, JSON.stringify(state.users));

          state.loggedInUser = newUserInfo;
          localStorage.setItem(CONST.lsKey.user, JSON.stringify(newUserInfo));

          alert("profile 변경 완료");
        }
      });
    },
  },
  default: { render: ErrorPage },
};

const hydrateLinkIntoRouter = () => {
  const anchorList = document.getElementsByTagName("a");
  for (const anchor of anchorList) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.href;
      const newPathname = new URL(href).pathname;
      render(newPathname);
    });
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      state.loggedInUser = null;
      localStorage.removeItem(CONST.lsKey.user);
    });
  }
};

const render = (pathname = window.location.pathname) => {
  const isNewPath = pathname !== window.location.pathname;
  if (isNewPath) {
    history.pushState({}, "", pathname);
  }
  const page = routes[pathname] || routes["default"];
  document.body.innerHTML = page.render();
  page.onRender?.();
  hydrateLinkIntoRouter();
};

render();
window.addEventListener("popstate", () => render());
