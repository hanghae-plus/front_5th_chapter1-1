const Header = () => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`;

const Nav = (now) => `
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" class="${now === "/" ? "text-blue-600" : "text-gray-600"}">홈</a></li>
      <li><a href="/profile" class="${now === "/profile" ? "text-blue-600" : "text-gray-600"}">프로필</a></li>
      ${
        isLoggedIn()
          ? `<li><a href="#" class="text-gray-600">로그아웃</a></li>`
          : `<li><a href="/login" class="text-gray-600">로그인</a></li>`
      }
    </ul>
  </nav>
`;

const postData = [
  {
    id: 0,
    username: "홍길동",
    content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    createdAt: "5분전",
  },
  {
    id: 1,
    username: "김철수",
    content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
    createdAt: "15분전",
  },
  {
    id: 2,
    username: "이영희",
    content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
    createdAt: "30분전",
  },
  {
    id: 3,
    username: "박민수",
    content: "주말에 등산 가실 분 계신가요? 함께 가요!",
    createdAt: "1시간전",
  },
  {
    id: 4,
    username: "정수연",
    content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
    createdAt: "2시간전",
  },
];

const Post = (post) => `
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-2">
      <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
      <div>
        <p class="font-bold">${post.username}</p>
        <p class="text-sm text-gray-500">${post.createdAt}</p>
      </div>
    </div>
    <p>${post.content}</p>
    <div class="mt-2 flex justify-between text-gray-500">
      <button>좋아요</button>
      <button>댓글</button>
      <button>공유</button>
    </div>
  </div>
`;

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Nav("/")}

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${postData.map(Post).join("")}
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
          <input id="username" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
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
        ${Nav("/profile")}

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

const root = document.getElementById("root");

const routes = {
  "/": MainPage,
  "/profile": ProfilePage,
  "/login": LoginPage,
  "*": ErrorPage,
};

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

const Render = () => {
  const path = window.location.pathname;
  const Component = routes[path] || routes["*"];
  if (Component.name === "ProfilePage" && !isLoggedIn()) {
    window.history.replaceState({}, "", "/login");
    Render();
    return;
  }
  root.innerHTML = Component();
};

Render();

// 클릭 이벤트 리스너
document.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    if (e.target.textContent === "로그아웃") {
      localStorage.removeItem("user");
      window.history.replaceState({}, "", "/");
      Render();
      return;
    }

    const path = e.target.href.split("/").pop();
    window.history.pushState({}, "", path ? path : "/");
    Render();
  }
});

// 라우터 이벤트 리스너
window.addEventListener("popstate", () => {
  Render();
});

// 로그인 폼 submit 이벤트 리스너
document.addEventListener("submit", (e) => {
  if (e.target.id === "login-form") {
    e.preventDefault();
    const username = document.getElementById("username").value;
    if (username) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "testuser", email: "", bio: "" }),
      );
      window.history.pushState({}, "", "/");
      Render();
    } else {
      alert("이메일 또는 전화번호를 입력해주세요.");
    }
  }
});
