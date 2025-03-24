import { mockFeed } from "./mock/feed.mock";

const Router = () => {
  const path = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && path === "/login") {
    history.pushState({}, "", "/");
    Router();
    return;
  }

  if (path === "/") {
    document.getElementById("root").innerHTML = MainPage(user);
  } else if (path === "/profile") {
    if (user) {
      document.getElementById("root").innerHTML = ProfilePage(user);
    } else {
      alert("로그인이 필요합니다");
    }
  } else if (path === "/login") {
    document.getElementById("root").innerHTML = LoginPage();
  } else {
    document.getElementById("root").innerHTML = ErrorPage();
  }
  goToHome();
  updateProfile();
};

document.addEventListener("click", (e) => {
  const target = e.target.closest("a");
  if (target && target.id === "logout") {
    e.preventDefault();
    goToLogin();
  }

  if (
    target &&
    target.getAttribute("href") &&
    target.getAttribute("href").startsWith("/")
  ) {
    e.preventDefault();
    const href = target.getAttribute("href");
    history.pushState({}, "", href);
    Router();
  }
});

const Header = (user) => `
  <header class="bg-blue-600 text-white p-4 sticky top-0">
          <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>

  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      <li><a href="/" id="home" class="text-blue-600">홈</a></li>
      ${
        user
          ? `<li>
                <a href="/profile" id="profile" class="text-gray-600">
                  프로필
                </a>
             </li>`
          : ""
      }
     <li>
  ${
    user
      ? `<a href="/login" id="logout" class="text-gray-600">로그아웃</a>`
      : `<a href="/login" id="login" class="text-gray-600">로그인</a>`
  }
</li>
    </ul>
  </nav>
`;

const Footer = () => `
 <footer class="bg-gray-200 p-4 text-center">
     <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`;

const MainPage = (user) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    
  ${Header(user)}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
  ${mockFeed
    .map(
      (feed) => `
           <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="${feed.src}" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">${feed.name}</p>
                <p class="text-sm text-gray-500">${feed.time}</p>
              </div>
            </div>
            <p>${feed.detail}</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
    `,
    )
    .join("")}
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

const goToHome = () => {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const username = form.querySelector("#username").value.trim();

      if (username.length) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email: "", bio: "" }),
        );
        history.pushState({}, "", "/");
        Router();
      } else {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
      }
    });
  }
};

const updateProfile = () => {
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = profileForm.querySelector("#username").value.trim();
      const email = profileForm.querySelector("#email").value.trim();
      const bio = profileForm.querySelector("#bio").value.trim();
      const user = JSON.parse(localStorage.getItem("user"));
      const updateUser = { ...user, username, email, bio };

      localStorage.setItem("user", JSON.stringify(updateUser));
      alert("프로필이 수정되었습니다");
      Router();
    });
  }
};

const goToLogin = () => {
  localStorage.removeItem("user");
  history.pushState({}, "", "/");
  Router();
};

const LoginPage = () => `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" name="username" placeholder="username" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" name="password"  placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" id="login" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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

const ProfilePage = (user) => `
  <div>
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header(user)}

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
                  value="${user.username}"
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
                  value="${user.email}"
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
${user.bio}</textarea
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

        ${Footer()}
      </div>
    </div>
  </div>
`;

Router();

window.addEventListener("popstate", () => {
  Router();
});
