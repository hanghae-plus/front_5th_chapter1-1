//전역객체
const globalState = {
  //상태 가져오기
  getUser(key) {
    //type 확인
    return JSON.parse(localStorage.getItem(key));
  },

  //상태 설정
  setUser(key, user) {
    // this.user = user;
    localStorage.setItem(key, JSON.stringify(user));
  },

  //상태 초기화
  initUser(key) {
    localStorage.removeItem(key);
  },
};

//헤더 컴포넌트
const Header = () => `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
`;

const Nav = () => {
  // localStorage에서 user 값을 가져옵니다.
  const user = localStorage.getItem("user");

  // user 값이 없으면 홈과 로그인 링크를 반환
  if (!user) {
    return `
      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li><a href="/login" class="text-gray-600">로그인</a></li>
        </ul>
      </nav>
    `;
  }

  // user 값이 있으면 홈과 프로필, 로그아웃 링크를 반환
  return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600">홈</a></li>
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li><a id="logout" href="/logout" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;
};

const Footer = () => `
  <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
`;

const MainPage = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Nav()}
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

const LoginPage = () => {
  return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input id="userPw" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button id="loginBtn" type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
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
};

const ProfilePage = () => {
  // user 정보를 가져옵니다
  const user = globalState.getUser("user") || {
    username: "",
    email: "",
    bio: "",
  };

  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Nav()}
      <main class="p-4">
        <div class="bg-white p-8 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
             내 프로필
          </h2>
          <form id="profile-form">
            <div class="mb-4">
              <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
              <input type="text" id="username" name="username" value="${user.username || ""}" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" id="email" name="email" value="${user.email || ""}" class="w-full p-2 border rounded" />
            </div>
            <div class="mb-6">
              <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
              <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio || ""}</textarea>
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

//routing 연결
const routePath = {
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/": MainPage,
  "/error": ErrorPage,
};

//페이지 렌더링
const renderPage = (path) => {
  // 경로가 routePath에 존재하는지 확인
  const routeHandler = routePath[path];

  // 경로가 유효하고 함수인 경우
  if (typeof routeHandler === "function") {
    return routeHandler();
  }

  // 경로가 유효하지 않거나 함수가 아닌 경우 ErrorPage 반환
  return ErrorPage();
};

//로그아웃 처리
const logoutUser = () => {
  // 로그아웃 처리 로직
  // localStorage의 데이터 제거
  console.log("logoutUser 실행");
  // localStorage.removeItem("user");
  globalState.initUser("user");
};

//헤더 링크 클릭
const handleLinkClick = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const href = event.target.getAttribute("href");
    if (href === "/logout") {
      console.log("logout 실행");
      // 로그아웃 처리 로직
      logoutUser(); // 로그아웃 함수 호출
      navigateTo("/login");
      return;
    }
    navigateTo(href);
  }
};
//이메일 유효성 검사 (utils);
// function validateEmail(email) {
//   const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   return regex.test(email);
// }

//로그인 처리
const handleLogin = (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("userPw").value;

  console.log("email", username);
  console.log("password", password);

  // if (!validateEmail(email)) {
  //   alert("이메일 형식이 올바르지 않습니다.");
  //   return;
  // }

  if (username === "testuser") {
    const user = {
      username: username,
      email: "",
      bio: "",
    };
    globalState.setUser("user", user);
    // localStorage.setItem("user", JSON.stringify(user));
    navigateTo("/profile");
  } else if (!username || !password) {
    alert("이름 또는 비밀번호를 입력해주세요.");
  } else {
    alert("이름 또는 비밀번호가 일치하지 않습니다.");
  }
};

//profile update 처리
const handleUpdateProfile = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const bioText = document.getElementById("bio").value.trim();
  const bio = bioText + (bioText ? ` ${bioText}` : "");

  if (username) {
    const user = {
      username: username,
      email: email,
      bio: bio,
    };

    globalState.setUser("user", user);
    location.reload();
  }
};

//최초 앱 실행 함수
const App = () => {
  //아 클릭할 때 App()이 새롭게 실행되면서 초기화가 이루어지는구나.
  navigateTo(location.pathname);
};

//페이지 이동함수
const navigateTo = (path) => {
  console.log("navigate to path", path);
  console.log("navigateTo 실행");
  history.pushState(null, "", path);
  //페이지 렌더링
  const rootElement = document.getElementById("root");
  rootElement.innerHTML = renderPage(path);

  // 로그인 페이지일 때 이벤트 리스너 등록
  if (location.pathname === "/login") {
    const userData = globalState.getUser("user");
    if (userData) {
      navigateTo("/profile");
      return;
    }
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
  }

  if (location.pathname === "/profile") {
    const loginInfo = globalState.getUser("user");
    console.log("loginInfo", loginInfo);
    if (!loginInfo) {
      navigateTo("/login");
      return;
    }
    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", handleUpdateProfile);
    }
  }

  if (location.pathname !== "/login" && location.pathname !== "/logout") {
    console.log("login or logout");
    const navElement = document.querySelector("nav");

    if (navElement) {
      navElement.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
          handleLinkClick(event);
        }
      });
    }
  }
};

//첫 Dom이 로드되었을 때.
document.addEventListener("DOMContentLoaded", () => {
  App();
});

// popstate 이벤트 처리 popstate는 언제 발생하는건가?
window.addEventListener("popstate", () => {
  console.log("popstate 이벤트 처리");
  navigateTo(location.pathname);
});
