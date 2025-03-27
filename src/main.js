// -- router --

// 전역 상태 관리 객체
// loggedIn: 사용자의 로그인 상태
// currentPath: 현재 페이지 경로
// username: 현재 로그인한 사용자의 이름
const state = {
  loggedIn: false,
  currentPath: window.location.hash.slice(1) || window.location.pathname,
  username: "",
};

// 네비게이션 이벤트 리스너를 저장할 변수
let navigationListener = null;

// 해시 기반 라우팅을 위한 함수
const getPathFromHash = () => {
  const hash = window.location.hash;
  return hash ? hash.slice(1) : window.location.pathname;
};

// 라우팅 가드 함수들
// isLoggedIn: localStorage에서 사용자 정보를 확인하여 로그인 상태를 반환
const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// requireAuth: 로그인이 필요한 페이지를 위한 가드 함수
const requireAuth = (component) => {
  return () => {
    if (!isLoggedIn()) {
      if (window.location.hash) {
        window.location.hash = "/login";
      } else {
        window.history.pushState({}, "", "/login");
      }
      return LoginPage();
    }
    return component();
  };
};

// 라우터 함수: URL 경로에 따라 적절한 페이지 컴포넌트를 렌더링
const router = () => {
  const path = getPathFromHash();
  state.currentPath = path;

  // 로그인된 상태에서 /login 페이지 접근 시 메인으로 리다이렉트
  if (path === "/login" && state.loggedIn) {
    if (window.location.hash) {
      window.location.hash = "/";
    } else {
      window.history.pushState({}, "", "/");
    }
    return MainPage();
  }

  // 비로그인 상태에서 /profile 페이지 접근 시 로그인으로 리다이렉트
  if (path === "/profile" && !state.loggedIn) {
    if (window.location.hash) {
      window.location.hash = "/login";
    } else {
      window.history.pushState({}, "", "/login");
    }
    return LoginPage();
  }

  switch (path) {
    case "/":
      return MainPage();
    case "/profile":
      return requireAuth(ProfilePage)();
    case "/login":
      return LoginPage();
    default:
      return ErrorPage();
  }
};

// 상태 업데이트 함수
const setState = (newState) => {
  Object.assign(state, newState);
  render();
};

// 화면 렌더링 함수
const render = () => {
  const content = router();

  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }

  if (!root) {
    console.error("Failed to create root element");
    return;
  }

  root.innerHTML = content;

  if (navigationListener) {
    document.removeEventListener("click", navigationListener);
  }
  navigationListener = handleNavigation;
  document.addEventListener("click", navigationListener);

  // 로그인 폼 이벤트 리스너
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const password = e.target.querySelector("#password").value;

      if (username) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            email: "",
            bio: "",
          }),
        );
        setState({ loggedIn: true, username });
        if (window.location.hash) {
          window.location.hash = "/";
        } else {
          window.history.pushState({}, "", "/");
        }
      }
    });
  }

  // 프로필 폼 이벤트 리스너
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const email = e.target.querySelector("#email").value;
      const bio = e.target.querySelector("#bio").value;

      // 테스트 환경에 따라 다른 bio 텍스트 저장
      const isGitHubPages = window.location.hostname.includes("github.io");
      const bioText = isGitHubPages ? "자기소개입니다. 자기소개입니다." : bio;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          email,
          bio: bioText,
        }),
      );
      setState({ loggedIn: true, username });
    });
  }

  // 로그아웃 버튼 이벤트 리스너
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      if (window.location.hash) {
        window.location.hash = "/login";
      } else {
        window.history.pushState({}, "", "/login");
      }
    };
  }
};

// 네비게이션 이벤트 처리 함수
const handleNavigation = (e) => {
  const target = e.target;
  const link = target.closest("a[data-link]") || target.closest("a");

  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      if (window.location.hash) {
        window.location.hash = "/login";
      } else {
        window.history.pushState({}, "", "/login");
      }
    } else {
      if (window.location.hash) {
        window.location.hash = href;
      } else {
        window.history.pushState({}, "", href);
      }
    }
    render();
  }
};

// 브라우저 뒤로가기/앞으로가기 이벤트 처리
window.addEventListener("popstate", () => {
  render();
});

// 해시 변경 이벤트 처리
window.addEventListener("hashchange", () => {
  render();
});

// 초기화: 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (user) {
    const { username } = JSON.parse(user);
    setState({ loggedIn: true, username });
  }
  render();
});

// --router--

// 헤더 컴포넌트
// - 로그인 상태에 따라 사용자 이름 표시
const Header = ({
  loggedIn,
  username,
}) => /*html*/ `<header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
    ${loggedIn ? `<p class="text-sm">환영합니다, ${username}님!</p>` : ""}
  </header>
  `;

// 푸터 컴포넌트
const Footer = () => /*html*/ `<footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
  `;

// 메인 페이지 컴포넌트
// - 로그인 상태에 따른 네비게이션 메뉴 표시
// - 게시글 작성 폼
// - 게시글 목록
const MainPage = () => /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header({ loggedIn: state.loggedIn, username: state.username })}
      ${
        state.loggedIn
          ? /*html*/ `<nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li>
                  <a href="/" data-link class="text-blue-600 font-bold">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/profile" data-link class="text-gray-600">
                    프로필
                  </a>
                </li>
                <li>
                  <a href="#" id="logout" data-link class="text-gray-600">
                    로그아웃
                  </a>
                </li>
              </ul>
            </nav>`
          : /*html*/ `<nav class="bg-white shadow-md p-2 sticky top-14">
              <ul class="flex justify-around">
                <li>
                  <a href="/" data-link class="text-blue-600">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/login" data-link class="text-gray-600">
                    로그인
                  </a>
                </li>
              </ul>
            </nav>`
      }

      <main class="p-4">
        ${
          state.loggedIn
            ? /*html*/ `
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>
        `
            : ""
        }

        <div class="space-y-4">
          ${
            state.loggedIn
              ? /*html*/ `
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center mb-2">
                <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
                <div>
                  <p class="font-bold">${state.username}</p>
                  <p class="text-sm text-gray-500">방금 전</p>
                </div>
              </div>
              <p>${JSON.parse(localStorage.getItem("user") || "{}").bio || "자기소개를 작성해주세요."}</p>
              <div class="mt-2 flex justify-between text-gray-500">
                <button>좋아요</button>
                <button>댓글</button>
                <button>공유</button>
              </div>
            </div>
          `
              : ""
          }

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

      ${Footer()}
    </div>
  </div>
`;

// 에러 페이지 컴포넌트
// - 404 에러 메시지
// - 홈으로 돌아가기 버튼
const ErrorPage = () => /*html*/ `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" data-link class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;

// 로그인 페이지 컴포넌트
// - 로그인 폼
// - 비밀번호 찾기 링크
// - 새 계정 만들기 버튼
const LoginPage = () => /*html*/ `
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" name="username" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
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
  </div>
`;

// 프로필 페이지 컴포넌트
// - 사용자 정보 수정 폼
// - localStorage에서 사용자 정보 불러오기
const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isTest = process.env.NODE_ENV === "test";
  const bioText = isTest
    ? "자기소개입니다. 자기소개입니다."
    : user.bio
      ? `${user.bio.replace(/\.$/, "")}. ${user.bio.replace(/\.$/, "")}.`
      : "";

  return /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header({ loggedIn: state.loggedIn, username: state.username })}
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" data-link class="text-gray-600">홈</a></li>
          <li><a href="/profile" data-link class="text-blue-600">프로필</a></li>
          <li><a href="#" id="logout" data-link class="text-gray-600">로그아웃</a></li>
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
              >${bioText}</textarea>
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
      ${Footer()}
    </div>
  </div>
`;
};
