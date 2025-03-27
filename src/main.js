const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <div id="nav"></div>

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
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

        <div id="nav"></div>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
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
                  value="홍길동"
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
                  value="hong@example.com"
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
안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.</textarea
                >
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

const loginNav = `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
      <li><a href="/profile" class="text-gray-600">프로필</a></li>
      <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
    </ul>
  </nav>
`;

const logoutNav = `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="text-blue-600 font-bold">홈</a></li>
      <li><a href="/login" class="text-gray-600">로그인</a></li>
    </ul>
  </nav>
`;

// 초기 설정
let loginState = "logout";
let user = null;

// nav 설정
function updateNav() {
  const $nav = document.querySelector("#nav");
  if ($nav) {
    if (loginState === "logout") {
      $nav.innerHTML = logoutNav;
    } else {
      $nav.innerHTML = loginNav;
    }
  }
}

let pathState = "history";
let customPathName = location.pathname;

export function setPathName(path, state) {
  pathState = state;
  if (pathState === "hash") {
    customPathName = path.replace("#", "") || "#/";
  } else {
    customPathName = path;
  }
}

function getPathName() {
  return { customPathName, pathState };
}

// 라우트 설정
export function router() {
  const $root = document.querySelector("#root");
  const { customPathName } = getPathName();
  loginCheck();

  if (customPathName === "/") {
    $root.innerHTML = MainPage();
    updateNav();
  } else if (customPathName === "/profile") {
    if (loginState === "login") {
      $root.innerHTML = ProfilePage();
      updateNav();
      navActive("프로필");
      profilePage();
    }
    if (loginState === "logout") {
      $root.innerHTML = LoginPage();
      loginPage();
    }
  } else if (customPathName === "/login") {
    if (loginState === "login") {
      $root.innerHTML = MainPage();
      updateNav();
    }
    if (loginState === "logout") {
      $root.innerHTML = LoginPage();
      loginPage();
    }
  } else {
    $root.innerHTML = ErrorPage();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  router();
});

function navActive(target) {
  const $navLinks = document.querySelectorAll("nav a");

  $navLinks.forEach((item) => {
    item.classList.remove("text-blue-600", "font-bold");
    item.classList.add("text-gray-600");
    if (
      target.textContent === item.textContent ||
      target === item.textContent
    ) {
      item.classList.add("text-blue-600", "font-bold");
      item.classList.remove("text-gray-600");
    }
  });
}

window.addEventListener("popstate", () => {
  setPathName(location.pathname, "history");
  router();
});

window.addEventListener("click", (e) => {
  const target = e.target;

  // nav a태그 클릭
  if (target.tagName === "A") {
    e.preventDefault();
    const path = target.getAttribute("href");

    if (target.textContent === "로그아웃") {
      //로그아웃 버튼 클릭
      localStorage.removeItem("user");
      loginCheck();

      if (pathState === "hash") {
        location.hash = "#/login";
        setPathName("#/login", pathState);
      } else {
        history.pushState(null, null, "/login");
        setPathName("/login", pathState);
      }
    } else {
      if (pathState === "hash") {
        location.hash = path.replace("/", "#/");
      } else {
        history.pushState(null, null, path);
      }
      setPathName(path, pathState);
    }
    router();
    navActive(target);
  }
});

// 링크이동
function goLink(path) {
  if (pathState === "hash") {
    location.hash = path.replace("/", "#/");
  } else {
    history.pushState(null, null, path);
  }
  setPathName(path, pathState);
  router();
}

// 로그인
function loginCheck() {
  const storedUser = localStorage.getItem("user");
  if (storedUser === null) {
    loginState = "logout";
    user = null;
  } else {
    loginState = "login";
    user = JSON.parse(storedUser);
  }
}

// 로그인 페이지 전용
function loginPage() {
  const $loginForm = document.querySelector("#login-form");
  const $username = document.querySelector("#username");

  const login = (username, email = "", bio = "") => {
    user = { username, email, bio };
    localStorage.setItem("user", JSON.stringify(user));
    loginCheck();
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const username = $username.value;
    if (username.trim() === "") {
      alert("사용자 이름을 입력하세요.");
      return;
    }
    if (username === "testuser") {
      login(username, "", "");
      goLink("/profile");
    } else {
      alert("사용자 이름이 틀립니다.");
    }
  };
  $loginForm.addEventListener("submit", (e) => loginSubmit(e));
}

// 프로필 페이지 전용
function profilePage() {
  if (!user) {
    goLink("/login");
    return;
  }

  const $profileForm = document.querySelector("#profile-form");
  const $username = document.querySelector("#username");
  const $email = document.querySelector("#email");
  const $bio = document.querySelector("#bio");

  $username.value = user.username;
  $email.value = user.email;
  $bio.value = user.bio;

  const profileSubmit = (e) => {
    e.preventDefault();
    const username = $username.value;
    const email = $email.value;
    const bio = $bio.value;
    user.username = username;
    user.email = email;
    user.bio = bio;
    localStorage.setItem("user", JSON.stringify(user));
  };
  $profileForm.addEventListener("submit", (e) => profileSubmit(e));
}
