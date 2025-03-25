const Header = ({ isLoggedIn } /*html*/) =>
  `
  <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

      <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" class="text-blue-600">홈</a></li>
          <li>
            ${isLoggedIn ? `<a href="/profile" class="text-gray-600">프로필</a>` : ``}
          </li>
          <li>
            ${isLoggedIn ? `<a href="/login" class="text-gray-600">로그아웃</a>` : `<a href="/login" class="text-gray-600">로그인</a>`}
          </li>
        </ul>
      </nav>
`;

const Footer = () => /*html*/ `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
`;

const MainPage = () => /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    
      ${Header({ isLoggedIn: isLoggedIn() })}
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

const LoginPage = () => /*html*/ `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input type="text" id="username" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input type="password" id="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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

const ProfilePage = () => /*html*/ `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ isLoggedIn: isLoggedIn() })}
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

// 라우트앱 설정
const routes = {
  "/": MainPage(),
  "/login": LoginPage(),
  "/profile": ProfilePage(),
};
function navigateTo(url) {
  history.pushState("", null, url); // URL 변경(새로고침 없이). ㅇㅣ거만 단독 적용하면 url만 바뀌고 페이지 변경은 안됨
  handleRoute();
  // render();
}

function handleRoute() {
  const path = window.location.pathname;
  console.log(`2. url path: ${path}`);

  let content = routes[path];
  // console.log(`content: ${content}`);

  // routes값에 정의되어 있지 않은 url값이 들어올 때
  if (content === undefined) {
    document.getElementById("root").innerHTML = `${ErrorPage()}`;
  } else {
    // 비로그인 상태에서 /profile 경로
    const userData = JSON.parse(localStorage.getItem("user"));

    // 비로그인 상태에서 Profile경로 이동 시
    if (userData === null && path === "/profile") {
      content = routes["/login"];
      document.getElementById("root").innerHTML = content;
    } else {
      document.getElementById("root").innerHTML = content;
    }
  }
}
// 로그인 체크 함수
function isLoggedIn() {
  // LocalStorage에서 데이터 가져오기
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  console.log(typeof userData);
  return userData !== null;
}

const app = () => {
  handleRoute();
};

window.addEventListener("popstate", () => {
  app();
});

// 화면에 어떻게 표시될지를 정의하는 함수
const render = () => {
  // LocalStorage 모두 비우기
  // localStorage.clear();
  console.log("1. rendering start");
  app();
};

render();

// 이벤트 위임을 해줘서 한번만 등록 시 사라지지 않음
document.body.addEventListener("click", (e) => {
  console.log("click start");

  // submit 버튼인 경우 무시
  // submit 버튼 클릭 시 이벤트 버블링? 때문에 click이벤트가 먼저 실행되어버림
  if (e.target.type === "submit") {
    return;
  }
  e.preventDefault();
  // nav태그 안
  if (e.target.closest("nav")) {
    console.log(`href: ${e.target.href}`);
    if (e.target.href !== undefined) {
      const url = e.target.href.replace("http://localhost:5173", "");
      console.log(`url: ${url}`);
      // alert("addEventListener click");
      navigateTo(url);
    }
  }
});

document.body.addEventListener("submit", (e) => {
  console.log("submit start");
  e.preventDefault(); // 폼 제출 기본 동작 막기
  e.stopPropagation(); // 클릭 이벤트가 버블링되지 않도록 막기
  // 로그인 폼 submit
  if (e.target.id === "login-form") {
    // e.preventDefault();
    const formData = new FormData(e.target); // 폼 데이터 가져오기

    const user = {};
    // form데이터 추출
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
      user[key] = value;
    });

    // LocalStorage에 유저 데이터 저장
    localStorage.setItem("user", JSON.stringify(user));

    navigateTo("/profile");
  }
});

document.body.add;

/*
document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
*/
