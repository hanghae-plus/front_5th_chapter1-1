const CONST = {
  userDB: "user-db",
  loginForm: {
    formId: "login-form",
    field: {
      email: "email",
      password: "password",
    },
  },
  profileForm: {
    formId: "profile-form",
    field: {
      username: "username",
      email: "email",
      bio: "bio",
    },
  },
  pathname: {
    main: "/",
    login: "/login",
    profile: "/profile",
  },
};

const savedUserDB = localStorage.getItem(CONST.userDB) || "{}";
const userDB = JSON.parse(savedUserDB);

const state = {
  users: userDB.users || [],
  loggedInUser: userDB.loggedInUser || null,
};

console.log(state);

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/profile" class="text-gray-600">프로필</a></li>
          <li><a href="#" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">홍길동</p>
                <p class="text-sm text-gray-500">5분 전</p>
              </div>
            </div>
            <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">김철수</p>
                <p class="text-sm text-gray-500">15분 전</p>
              </div>
            </div>
            <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">이영희</p>
                <p class="text-sm text-gray-500">30분 전</p>
              </div>
            </div>
            <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">박민수</p>
                <p class="text-sm text-gray-500">1시간 전</p>
              </div>
            </div>
            <p>주말에 등산 가실 분 계신가요? 함께 가요!</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">정수연</p>
                <p class="text-sm text-gray-500">2시간 전</p>
              </div>
            </div>
            <p>새로 나온 영화 재미있대요. 같이 보러 갈 사람?</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;

const ErrorPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="${CONST.loginForm.formId}">
        <div class="mb-4">
          <input type="text"  name="${CONST.loginForm.field.email}" id="${CONST.loginForm.field.email}" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" name="${CONST.loginForm.field.password}" id="${CONST.loginForm.field.password}"  placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;

const ProfilePage = () => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
        </header>

        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600">홈</a></li>
            <li><a href="/profile" class="text-blue-600">프로필</a></li>
            <li><a href="#" class="text-gray-600">로그아웃</a></li>
          </ul>
        </nav>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="${CONST.profileForm.formId}">
              <div class="mb-4">
                <label
                  for="${CONST.profileForm.field.username}"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="${CONST.profileForm.field.username}"
                  name="${CONST.profileForm.field.username}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="${CONST.profileForm.field.email}"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="${CONST.profileForm.field.email}"
                  name="${CONST.profileForm.field.email}"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="${CONST.profileForm.field.bio}"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="${CONST.profileForm.field.bio}"
                  name="${CONST.profileForm.field.bio}"
                  rows="4"
                  class="w-full p-2 border rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        <footer class="bg-gray-200 p-4 text-center">
          <p>&copy; 2024 항해플러스. All rights reserved.</p>
        </footer>
      </div>
    </div>
  </div>
`;

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
window.addEventListener("popstate", render);
