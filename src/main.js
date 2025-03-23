import { CONST } from "./constants";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./pages";

const savedUserDB = localStorage.getItem(CONST.userDB) || "{}";
const userDB = JSON.parse(savedUserDB);

const state = {
  users: userDB.users || [],
  loggedInUser: userDB.loggedInUser || null,
};

const initUser = ({ email, password }) => ({
  id: crypto.randomUUID(),
  email,
  password,
  username: "",
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
        const { email, password } = Object.fromEntries(formData);

        if (!email) {
          return alert("이메일을 입력해주세요");
        }

        if (!password) {
          return alert("password를 입력해주세요.");
        }

        const userInfo = state.users.find((user) => user.email === email);

        if (userInfo) {
          // 가입한 적 있는 유저
          const isPasswordCorrect = userInfo.password === password;
          if (isPasswordCorrect) {
            state.loggedInUser = userInfo;
          } else {
            alert("비밀번호가 틀렸습니다.");
            const passwordField = loginForm.getElementById(
              CONST.loginForm.field.password,
            );
            passwordField?.focus();
          }
        } else {
          const newUserInfo = initUser({ email, password });
          state.loggedInUser = newUserInfo;
          state.users.push(newUserInfo);
        }
        localStorage.setItem(CONST.userDB, JSON.stringify(state));
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
          state.loggedInUser = newUserInfo;
          localStorage.setItem(CONST.userDB, JSON.stringify(state));
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
      localStorage.setItem(CONST.userDB, JSON.stringify(state));
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
