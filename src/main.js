import { LoginPage, attachLoginHandler } from "./login.js";
import { ProfilePage, profileConfimHandler } from "./pages/profile.js";

export const state = {
  loggedIn: localStorage.getItem("user") ? true : false,
  user: localStorage.getItem("user"),
};

export const Header = ({ loggedIn }) => {
  const nav = loggedIn
    ? `
        <li><a href="/profile" class="${location.pathname === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
        <li><a href="/" id="logout" class="text-gray-600">로그아웃</a></li>
      `
    : `<li><a href="/login" class="text-gray-600">로그인</a></li>`;

  return `
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

        <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="${location.pathname === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
          ${nav}
        </ul>
      </nav>
`;
};

export const Footer = `
   <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
`;

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
     ${Header({ loggedIn: state.loggedIn })}
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
    ${Footer}
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

// 페이지 렌더링
const App = () => {
  if (location.pathname.includes("/login")) {
    return LoginPage();
  }
  if (location.pathname.includes("/profile")) {
    if (state.loggedIn === false) {
      return LoginPage();
    } else {
      return ProfilePage();
    }
  }
  if (location.pathname === "/") {
    return MainPage();
  }
  return ErrorPage();
};

// 뒤로가기, 앞으로가기
window.addEventListener("popstate", () => {
  render();
});

// 페이지 이동
export const render = () => {
  // ✅ 변경
  const root = document.getElementById("root");
  if (!root) return;

  // ✅ localStorage 기반으로 상태 동기화
  const storedUser = localStorage.getItem("user");
  state.loggedIn = !!storedUser;

  root.innerHTML = App();

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const newPathName = e.target.href.replace(location.origin, "");
      console.log("newPathName=>", newPathName);
      history.pushState(null, "", newPathName);
      render();
    });

    // ✅ 로그인 이벤트 핸들러 연결
    if (location.pathname === "/login") {
      attachLoginHandler();
    }

    if (location.pathname === "/profile") {
      profileConfimHandler(); // ✅ 여기서 꼭 실행
    }

    // ✅ 로그아웃 버튼 이벤트 등록
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        // localStorage 및 state 초기화
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");

        state.loggedIn = false;
        history.pushState(null, "", "/");
        render();
      });
    }
  });
};

render();
