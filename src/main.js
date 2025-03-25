import { AuthStore } from "./auth";
import { Header, Footer } from "./components";

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${[
            "홍길동|5분 전|오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
            "김철수|15분 전|새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
            "이영희|30분 전|오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
            "박민수|1시간 전|주말에 등산 가실 분 계신가요? 함께 가요!",
            "정수연|2시간 전|새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
          ]
            .map((data) => {
              const [name, time, content] = data.split("|");
              return `
            <div class="bg-white rounded-lg shadow p-4">
              <div class="flex items-center mb-2">
                <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
                <div>
                  <p class="font-bold">${name}</p>
                  <p class="text-sm text-gray-500">${time}</p>
                </div>
              </div>
              <p>${content}</p>
              <div class="mt-2 flex justify-between text-gray-500">
                <button>좋아요</button>
                <button>댓글</button>
                <button>공유</button>
              </div>
            </div>
          `;
            })
            .join("")}
        </div>
      </main>
      ${Footer()}
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
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
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
        ${Header()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" value="${AuthStore.getUser().username}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" value="${AuthStore.getUser().email}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${AuthStore.getUser().bio}</textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  </div>
`;

function createRouter(rootElement) {
  const routes = {};
  let currentPath = window.location.pathname;

  function handleRoute(path) {
    const handler = routes[path];
    if (handler) {
      handler(rootElement);
    } else if (routes["404"]) {
      routes["404"](rootElement);
    } else {
      rootElement.innerHTML = "페이지를 찾을 수 없습니다: " + path;
    }
  }

  function handlePopState() {
    currentPath = window.location.pathname;
    handleRoute(currentPath);
  }

  function navigateTo(path) {
    history.pushState(null, "", path);
    currentPath = path;
    handleRoute(path);
  }

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function start() {
    handleRoute(currentPath);
  }

  window.addEventListener("popstate", handlePopState);

  return {
    addRoute,
    navigateTo,
    start,
  };
}

function bindLoginEvent(container, router) {
  const loginForm = container.querySelector("#login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.querySelector("input[type='text']").value;

    if (!username) return;

    const userData = {
      username,
      email: "",
      bio: "",
    };

    AuthStore.setUser(userData);
    router.navigateTo("/");
  });
}

function bindProfileEvent(container) {
  const profileForm = container.querySelector("#profile-form");
  if (!profileForm) return;

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = profileForm.querySelector("#username").value;
    const email = profileForm.querySelector("#email").value;
    const bio = profileForm.querySelector("#bio").value;

    if (!username) return;

    const userData = {
      username,
      email,
      bio,
    };

    AuthStore.setUser(userData);

    alert("프로필이 업데이트되었습니다.");
  });
}

function handleNavigationClick(router) {
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("/")) {
        e.preventDefault();

        if (e.target.id === "logout") {
          AuthStore.logout();
        }

        router.navigateTo(href);
      }
    }
  });
}

function initializeApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const router = createRouter(rootElement);

  router.addRoute("/", (container) => {
    container.innerHTML = MainPage();
  });

  router.addRoute("/login", (container) => {
    container.innerHTML = LoginPage();
    bindLoginEvent(container, router);
  });

  router.addRoute("/profile", (container) => {
    if (!AuthStore.isLoggedIn()) {
      router.navigateTo("/login");
      return;
    }
    container.innerHTML = ProfilePage();
    bindProfileEvent(container);
  });

  router.addRoute("404", (container) => {
    container.innerHTML = ErrorPage();
  });

  handleNavigationClick(router);
  router.start();
}

initializeApp();
