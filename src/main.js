const Header = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`;

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const base = import.meta.env.BASE_URL || "/";
  const path = getCurrentPath();

  const isActive = (href) => {
    const current = path === href || path === base + href.slice(1);
    return current ? "text-blue-600 font-bold" : "text-gray-600";
  };

  return `
    <nav class="bg-white shadow-md p-2 sticky top-14" role="navigation">
      <ul class="flex justify-around">
        <li><a href="/" data-link class="${isActive("/")}">홈</a></li>
        ${
          user
            ? `
          <li><a href="/profile" data-link class="${isActive("/profile")}">프로필</a></li>
          <li><a href="#" id="logout" class="text-gray-600">로그아웃</a></li>
        `
            : `
          <li><a href="/login" data-link class="${isActive("/login")}">로그인</a></li>
        `
        }
      </ul>
    </nav>
  `;
};

const Footer = () => `
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`;

const PostList = () => {
  const POSTS = [
    {
      name: "홍길동",
      time: "5분 전",
      text: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    },
    {
      name: "김철수",
      time: "15분 전",
      text: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
    },
    {
      name: "이영희",
      time: "30분 전",
      text: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
    },
    {
      name: "박민수",
      time: "1시간 전",
      text: "주말에 등산 가실 분 계신가요? 함께 가요!",
    },
    {
      name: "정수연",
      time: "2시간 전",
      text: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
    },
  ];
  return `
    <div class="space-y-4">
      ${POSTS.map(
        ({ name, time, text }) => `
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-2">
            <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
            <div>
              <p class="font-bold">${name}</p>
              <p class="text-sm text-gray-500">${time}</p>
            </div>
          </div>
          <p>${text}</p>
          <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
          </div>
        </div>`,
      ).join("")}
    </div>
  `;
};

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navbar()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?" disabled></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded" disabled>게시</button>
        </div>
        ${PostList()}
      </main>
      ${Footer()}
    </div>
  </div>
`;

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-6">
          <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded" />
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
  const {
    username = "",
    email = "",
    bio = "",
  } = JSON.parse(localStorage.getItem("user") || "{}");
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Navbar()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" value="${username}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" value="${email}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${bio}</textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;
};

const ErrorPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <a href="/" data-link class="bg-blue-600 text-white px-4 py-2 rounded font-bold">홈으로 돌아가기</a>
    </div>
  </main>
`;

const ROUTES = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

const getCurrentPath = () => {
  if (window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
};

export const navigateTo = (path) => {
  if (window.location.hash.startsWith("#/")) {
    window.location.hash = path;
  } else {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
};

export const listenToRouteChange = (callback) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("hashchange", callback);
};

function router() {
  const path = getCurrentPath();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (path === "/profile" && !user) return navigateTo("/login");
  if (path === "/login" && user) return navigateTo("/");

  const render = ROUTES[path] || ErrorPage;
  document.getElementById("root").innerHTML = render();
  attachEvents();
}

function navigate(path) {
  window.history.pushState({}, "", import.meta.env.BASE_URL + path.slice(1));
  router();
}

function attachEvents() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(e.target.getAttribute("href"));
    });
  });

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      if (!username) return alert("이름을 입력해주세요");
      const user = { username, email: "", bio: "" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    });
  }

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/profile");
    });
  }

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      navigate("/login");
    });
  }
}

listenToRouteChange(router);
window.addEventListener("DOMContentLoaded", router);
