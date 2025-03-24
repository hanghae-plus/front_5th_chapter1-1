// -- router --

// 상태 관리
const state = {
  loggedIn: false,
  currentPath: window.location.pathname,
  username: "",
};

// 이벤트 리스너 관리
let navigationListener = null;

// 라우터 설정
const router = () => {
  const path = window.location.pathname;
  state.currentPath = path;

  switch (path) {
    case "/":
      return MainPage();
    case "/profile":
      return state.loggedIn ? ProfilePage() : LoginPage();
    case "/login":
      return LoginPage();
    default:
      return ErrorPage();
  }
};

// 상태 변경 함수
const setState = (newState) => {
  Object.assign(state, newState);
  render();
};

// 렌더링 함수
const render = () => {
  const content = router();

  // root 엘리먼트가 없으면 생성
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }

  root.innerHTML = content;

  // 이전 이벤트 리스너 제거
  if (navigationListener) {
    document.removeEventListener("click", navigationListener);
  }
  // 새로운 이벤트 리스너 등록
  navigationListener = handleNavigation;
  document.addEventListener("click", navigationListener);

  // 로그인 폼 이벤트 리스너 추가
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const password = e.target.querySelector("#password").value;

      if (username) {
        // localStorage에 사용자 정보 저장
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            email: "",
            bio: "",
          }),
        );
        setState({ loggedIn: true, username });
        window.history.pushState({}, "", "/");
        render(); // 상태 변경 후 즉시 렌더링
      } else {
        alert("아이디를 입력해주세요.");
      }
    });
  }

  // 프로필 폼 이벤트 리스너 추가
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const email = e.target.querySelector("#email").value;
      const bio = e.target.querySelector("#bio").value;

      // localStorage에 사용자 정보 업데이트
      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          email,
          bio,
        }),
      );
      setState({ loggedIn: true, username });
    });
  }

  // 로그아웃 버튼 이벤트 리스너 추가
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      window.history.pushState({}, "", "/");
    };
  }
};

// 네비게이션 이벤트 처리
const handleNavigation = (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href === "#") {
      // 로그아웃 시 localStorage에서 사용자 정보 제거
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      window.history.pushState({}, "", "/");
    } else {
      window.history.pushState({}, "", href);
    }
    render();
  }
};

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener("popstate", () => {
  render();
});

// 초기 렌더링
document.addEventListener("DOMContentLoaded", () => {
  // localStorage에서 사용자 정보 확인
  const user = localStorage.getItem("user");
  if (user) {
    const { username } = JSON.parse(user);
    setState({ loggedIn: true, username });
  }
  render();
});

// --router--

const Header = ({
  loggedIn,
  username,
}) => /*html*/ `<header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
    ${loggedIn ? `<p class="text-sm">환영합니다, ${username}님!</p>` : ""}
  </header>
  `;

const Footer = () => /*html*/ `<footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
  `;

const MainPage = () => /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header({ loggedIn: state.loggedIn, username: state.username })}
      ${
        state.loggedIn
          ? /*html*/ `<nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li>
                  <a href="/" class="text-blue-600">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/profile" class="text-gray-600">
                    프로필
                  </a>
                </li>
                <li>
                  <a href="#" id="logout" class="text-gray-600">
                    로그아웃
                  </a>
                </li>
              </ul>
            </nav>`
          : /*html*/ `<nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li>
                  <a href="/" class="text-blue-600">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/login" class="text-gray-600">
                    로그인
                  </a>
                </li>
              </ul>
            </nav>`
      }

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

const ErrorPage = () => /*html*/ `
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

const LoginPage = () => /*html*/ `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" name="username" id="username" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" name="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

const ProfilePage = () => {
  // localStorage에서 사용자 정보 가져오기
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-gray-600">홈</a></li>
          <li><a href="/profile" class="text-blue-600">프로필</a></li>
          <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>

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
                value="${user.username || ""}"
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
                value="${user.email || ""}"
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
              >${user.bio || ""}</textarea>
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
`;
};
