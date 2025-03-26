import { router } from "./controller/route";

const NavComponent = () => `
          <li><div id="home" class="text-blue-600">홈</div></li>
          <li><div id="login" class="text-gray-600">로그인</div></li>
`;

const NavComponentWithLoggedIn = () => `
          <li><div id="home" class="text-blue-600">홈</div></li>
          <li><div id="profile" class="text-gray-600">프로필</div></li>
          <li><div id="logout" class="text-gray-600">로그아웃</div></li>
`;

const HeaderComponent = (userInfo) => `
<header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          ${userInfo ? NavComponentWithLoggedIn() : NavComponent()}
        </ul>
      </nav>
`;

const FooterComponent = () => `
<footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
`;

const MainPage = (userInfo) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${HeaderComponent(userInfo)}

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

      ${FooterComponent()}
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
      <div id="home" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </div>
    </div>
  </main>
`;

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form>
        <div class="mb-4">
          <input id="login-email" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="login-password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button id="submit-login" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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

// {name, email, profileContent}
const ProfilePage = (userInfo) => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${HeaderComponent(userInfo)}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form>
              <div class="mb-4">
                <label
                  for="username"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >사용자 이름</label
                >
                <input
                  type="text"
                  id="username"
                  name="username"
                  value=${userInfo?.name}
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >이메일</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value=${userInfo?.email}
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="mb-6">
                <label
                  for="bio"
                  class="block text-gray-700 text-sm font-bold mb-2"
                  >자기소개</label
                >
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  class="w-full p-2 border rounded"
                >
                  ${userInfo?.bio ? userInfo?.bio : ""}
                </textarea
                >
              </div>
              <button
                id="submit-profile-update"
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${FooterComponent()}
      </div>
    </div>
  </div>
`;

document.body.innerHTML = `
  ${MainPage()}
`;

function route(path, callback) {
  if (window.location.pathname === path) {
    callback();
  }
}

function loadContent(content, addevent) {
  document.body.innerHTML = content;
  if (addevent) {
    addevent();
  }
}

const userInfo = window.localStorage.getItem("userInfo");
const parsedUserInfo = userInfo ? JSON.parse(userInfo) : "";

// 페이지 로드 시 라우팅 실행
window.addEventListener("load", () => {
  route("/", () => loadContent(MainPage(parsedUserInfo)));
  route("/profile", () =>
    loadContent(ProfilePage(parsedUserInfo), addEventProfile),
  );
  route("/login", () => loadContent(LoginPage(), addEventLogin));
  // route("/error", () => loadContent(ErrorPage()));
  if (!router.checkRoute(window.location.pathname)) {
    loadContent(ErrorPage());
  }
});

// router 사용
router.addRoute("/", () => loadContent(MainPage(parsedUserInfo)));
router.addRoute("/profile", () => loadContent(ProfilePage(parsedUserInfo)));
router.addRoute("/login", () => loadContent(LoginPage()));
router.addRoute("/error", () => loadContent(ErrorPage()));

window.addEventListener("click", (e) => {
  const targetId = e.target.id;
  if (targetId === "home") {
    router.navigateTo("/");
  } else if (targetId === "profile") {
    router.navigateTo("/profile");
  } else if (targetId === "login") {
    router.navigateTo("/login");
  } else if (targetId === "logout") {
    router.navigateTo("/login");
  }
});

function addEventLogin() {
  const $loginBtn = document.getElementById("submit-login");
  $loginBtn.addEventListener("click", () => {
    const $email = document.getElementById("login-email");
    const emailvalue = $email.value;
    const userInfo = window.localStorage.getItem("userInfo");

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      const newItem = { ...parsedUserInfo, name: emailvalue };
      window.localStorage.setItem("userInfo", JSON.stringify(newItem));
    } else {
      const item = { name: emailvalue, username: "", bio: "" };
      window.localStorage.setItem("userInfo", JSON.stringify(item));
    }

    router.navigateTo("/profile");
  });
}

function addEventProfile() {
  const $updateProfileBtn = document.getElementById("submit-profile-update");
  $updateProfileBtn.addEventListener("click", () => {
    const $nameInput = document.getElementById("username");
    const $emailInput = document.getElementById("email");
    const $bioTextArea = document.getElementById("bio");

    const item = {
      name: $nameInput.value,
      email: $emailInput.value,
      bio: $bioTextArea.value,
    };
    window.localStorage.setItem("userInfo", JSON.stringify(item));
  });
}
