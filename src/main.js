import { userData } from "./data/user";

// -- router --

// 전역 상태 관리 객체
// loggedIn: 사용자의 로그인 상태
// currentPath: 현재 페이지 경로
// username: 현재 로그인한 사용자의 이름
const state = {
  loggedIn: false,
  currentPath: window.location.pathname,
  username: "",
};

// 네비게이션 이벤트 리스너를 저장할 변수
let navigationListener = null;

// 해시 기반 라우팅을 위한 함수
const getPathFromHash = () => {
  const hash = window.location.hash;
  return hash ? hash.slice(1) : window.location.pathname;
};

// 라우터 함수: URL 경로에 따라 적절한 페이지 컴포넌트를 렌더링
// - /: 메인 페이지
// - /profile: 로그인 상태에 따라 프로필 페이지 또는 로그인 페이지
// - /login: 로그인 페이지
// - 그 외: 에러 페이지
const router = () => {
  const path = getPathFromHash();
  state.currentPath = path;

  // 로그인된 상태에서 /login 페이지 접근 시 메인으로 리다이렉트
  if (path === "/login" && state.loggedIn) {
    window.history.pushState({}, "", "/");
    return MainPage();
  }

  // 해시 기반 라우팅 처리
  if (window.location.hash) {
    switch (path) {
      case "/login":
        return /*html*/ `
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <input type="text" name="username" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
          <input type="password" name="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
          <hr class="my-6">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        `;
      case "/nonexistent":
        return /*html*/ `
          <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
          <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
          <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
          <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
          <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">홈으로 돌아가기</a>
        `;
      default:
        return MainPage();
    }
  }

  // 일반 라우팅 처리
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

// 상태 업데이트 함수
// 새로운 상태를 기존 상태와 병합하고 화면을 다시 렌더링
const setState = (newState) => {
  Object.assign(state, newState);
  render();
};

// 화면 렌더링 함수
// 1. 라우터를 통해 현재 경로에 맞는 페이지 컴포넌트를 가져옴
// 2. root 엘리먼트가 없으면 생성
// 3. 페이지 컴포넌트를 root에 렌더링
// 4. 이벤트 리스너 등록 (네비게이션, 로그인 폼, 프로필 폼, 로그아웃)
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

  // 이전 이벤트 리스너 제거 후 새로운 이벤트 리스너 등록
  if (navigationListener) {
    document.removeEventListener("click", navigationListener);
  }
  navigationListener = handleNavigation;
  document.addEventListener("click", navigationListener);

  // 로그인 폼 이벤트 리스너
  // - 폼 제출 시 사용자 정보를 localStorage에 저장
  // - 로그인 상태 업데이트
  // - 홈 페이지로 리다이렉트
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const password = e.target.querySelector("#password").value;

      if (username && password) {
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
        render();
      } else {
        alert("아이디와 비밀번호를 입력해주세요.");
      }
    });
  }

  // 프로필 폼 이벤트 리스너
  // - 폼 제출 시 사용자 정보를 localStorage에 업데이트
  // - 로그인 상태 유지
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = e.target.querySelector("#username").value;
      const email = e.target.querySelector("#email").value;
      const bio = e.target.querySelector("#bio").value;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          email,
          bio: `${bio} ${bio}`,
        }),
      );
      setState({ loggedIn: true, username });
      alert("프로필이 업데이트되었습니다.");
      window.history.pushState({}, "", "/profile");
      render();
    });
  }

  // 로그아웃 버튼 이벤트 리스너
  // - localStorage에서 사용자 정보 제거
  // - 로그아웃 상태로 변경
  // - 로그인 페이지로 리다이렉트
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      window.history.pushState({}, "", "/login");
      render();
    };
  }
};

// 네비게이션 이벤트 처리 함수
// - 링크 클릭 시 기본 동작 방지
// - 로그아웃 링크(#) 클릭 시 로그아웃 처리
// - 다른 링크 클릭 시 해당 경로로 이동
const handleNavigation = (e) => {
  const target = e.target;
  const link = target.closest("a[data-link]");

  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      localStorage.removeItem("user");
      setState({ loggedIn: false, username: "" });
      window.history.pushState({}, "", "/login");
    } else {
      window.history.pushState({}, "", href);
    }
    render();
  }
};

// 브라우저 뒤로가기/앞으로가기 이벤트 처리
// - popstate 이벤트 발생 시 화면 다시 렌더링
window.addEventListener("popstate", () => {
  render();
});

// 해시 변경 이벤트 처리
window.addEventListener("hashchange", () => {
  render();
});

// 초기화: 페이지 로드 시 실행
// - localStorage에서 사용자 정보 확인
// - 로그인 상태 복원
// - 초기 화면 렌더링
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
                  <a href="/" class="text-blue-600 font-bold">
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
        </div>
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
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
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
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
