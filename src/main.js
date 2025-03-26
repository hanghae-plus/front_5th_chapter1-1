const baseURL = import.meta.env.BASE_URL;

const styles = {
  active: 'text-blue-600 font-bold',
  inactive: 'text-gray-600',
};

// 전역 상태 관리
// 상태 관리할 변수 프라이빗 형태
function state() {
  let info = {
    username: '',
    email: '',
    bio: '',
  };
  function updateState({ username, email, bio }) {
    info = { username, email, bio };
  }
  function getState() {
    return info;
  }
  return {
    updateState: updateState,
    getState: getState,
  };
}

const pageState = state();

const posts = [
  ['홍길동', '5분 전', '오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!'],
  ['김철수', '15분 전', '새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!'],
  ['이영희', '30분 전', '오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?'],
  ['박민수', '1시간 전', '주말에 등산 가실 분 계신가요? 함께 가요!'],
  ['정수연', '2시간 전', '새로 나온 영화 재미있대요. 같이 보러 갈 사람?'],
];

// 재사용 가능한 element 컴포넌트
const element = {
  footer: () => {
    return `
            <footer class="bg-gray-200 p-4 text-center">
              <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>
    `;
  },
  header: (currentPath = '/') => {
    const user = localStorage.getItem('user');

    const isActive = (path) => {
      return currentPath === path ? styles.active : styles.inactive;
    };

    if (!user) {
      return `
              <header class="bg-blue-600 text-white p-4 sticky top-0">
                  <h1 class="text-2xl font-bold">항해플러스</h1>
              </header>
              <nav class="bg-white shadow-md p-2 sticky top-14">
                  <ul class="flex justify-around">
                      <li><a href="/" class="${isActive('/')}">홈</a></li>
                      <li><a href="/login" class="text-gray-600">로그인</a></li>
                  </ul>
              </nav>
      `;
    } else {
      return `
              <header class="bg-blue-600 text-white p-4 sticky top-0">
                  <h1 class="text-2xl font-bold">항해플러스</h1>
              </header>
              <nav class="bg-white shadow-md p-2 sticky top-14">
                  <ul class="flex justify-around">
                      <li><a href="/" class="${isActive('/')}">홈</a></li>
                      <li><a href="/profile" class="${isActive('/profile')}">프로필</a></li>
                      <li><a href="/login" id="logout" class="text-gray-600">로그아웃</a></li>
                  </ul>
              </nav>
      `;
    }
  },
};

// 페이지별 컴포넌트
const page = {
  homePage: () => {
    return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
                <div class="max-w-md w-full">
                    ${element.header('/')}
                    <main class="p-4">
                        <div class="mb-4 bg-white rounded-lg shadow p-4">
                            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
                            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
                        </div>
                        <div class="space-y-4">
                            ${posts.map(([name, time, comment]) => utill.PostItem(name, time, comment)).join('')}
                        </div>
                    </main>
                    ${element.footer()}
                </div>
            </div>
    `;
  },
  profilePage: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return `
            <div class="bg-gray-100 min-h-screen flex justify-center">
                <div class="max-w-md w-full">
                    ${element.header('/profile')}
                    <main class="p-4">
                        <div class="bg-white p-8 rounded-lg shadow-md">
                            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
                            <form id="profile-form">
                                <div class="mb-4">
                                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                                    <input type="text" id="username" value="${user?.username}" class="w-full p-2 border rounded" />
                                </div>
                                <div class="mb-4">
                                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                                    <input type="email" id="email" value="${user?.email}" class="w-full p-2 border rounded" />
                                </div>
                                <div class="mb-6">
                                    <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                                    <textarea id="bio" rows="4" class="w-full p-2 border rounded">${user?.bio}</textarea>
                                </div>
                                <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
                            </form>
                        </div>
                    </main>
                    ${element.footer()}
                </div>
            </div>
    `;
  },
  loginPage: () => {
    return `
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
  },
  notFoundPage: () => {
    return `
            <main class="bg-gray-100 flex items-center justify-center min-h-screen">
                <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
                    <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
                    <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
                    <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
                    <p class="text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
                    <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">홈으로 돌아가기</a>
                </div>
            </main>
    `;
  },
};

// 페이지 유틸 컴포넌트
const utill = {
  PostItem: (name, time, content) => {
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
  },
};

/*
 *   url route 정보
 */
const routes = {
  [baseURL]: page.homePage,
  [`${baseURL}login`]: page.loginPage,
  [`${baseURL}profile`]: page.profilePage,
};

function isHashUrl() {
  return location.hash ? true : false;
}

function getPath() {
  // 최초 index.hash.html 로드시
  if (!location.hash && location.pathname === `/index.hash.html`) {
    history.pushState({}, '', `/index.hash.html#${baseURL}`);
  }
  return isHashUrl() ? changeToBaseRoute(location.hash) : location.pathname;
}
// 해시라우터를 일반 라우터로 변경
function changeToBaseRoute(route) {
  return route.substr(1, route.length);
}
//  일반 라우터를 해시라우터로 변경
function changeToHashRoute(route) {
  return '#' + route;
}
/*
 *   url path를 확인하여 path guard 및 html 렌더링 및 이벤트 바인딩
 */
function renderPage() {
  // 내부적으로 hash route를 일반 route 형태로 변경
  let path = getPath();
  if (path === `${baseURL}profile` && !localStorage.getItem('user')) {
    return navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}login`);
  }
  if (path === `${baseURL}login` && localStorage.getItem('user')) {
    return navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}`);
  }
  const html = routes[path] ? routes[path]() : page.notFoundPage();
  // innerHTML은 매번 기존 내용을 모두 지우고 새로 파싱해서 DOM을 구성함.
  document.getElementById('root').innerHTML = html;
  bindEvents();
}

/*
 *  화면 전환
 *  url이 기본적으로 바뀌지 않기 때문에 url을 바꾸어지고 렌더링 함수 실행
 */
function navigate(type, path) {
  if (type === 'hash') {
    // 해시 라우터 형테에서는 라우터를 바꿔도 #부터는 브라우저가 인식하지 못하기때문에 새로고침되지않음
    // hashchange 이벤트로 변경사항 확인 가능
    location.hash = changeToHashRoute(path);
  } else {
    // 일반 라우터 형태에서 location.pathname = route ==> 시도시 브라우저가 페이지 이동, 즉 새로고침을 시도..
    // 따라서 직접 수정하지 않고 history.pushState 활용
    history.pushState({}, '', path);
    renderPage();
  }
}

/*
 *   html event binding apply
 */
function bindEvents() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();

      pageState.updateState({ username, email: '', bio: '' });
      localStorage.setItem('user', JSON.stringify({ username, email: '', bio: '' }));
      navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}profile`);
    });
  }

  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      pageState.updateState({ username: '', email: '', bio: '' });
      localStorage.removeItem('user');
      navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}login`);
    });
  }

  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const bio = document.getElementById('bio').value;

      pageState.updateState({ username, email, bio });
      localStorage.setItem('user', JSON.stringify({ username, email, bio }));
      alert('프로필이 업데이트되었습니다.');
      // 상태 변경에 따른 re render
      navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}profile`);
    });
  }

  // 이벤트 버블링을 이용하여 상위 엘리먼트인 nav 에서도 안에 a 요소의 click 이벤트를 받을 수 있다.
  const navEl = document.querySelector('nav');
  if (navEl) {
    navEl.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target && e.target.nodeName === 'A') {
        // closest() 가장 가까운 요소를 반환
        const a = e.target.closest('a');
        const href = a.getAttribute('href').substring(1, a.getAttribute('href').length);
        navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}${href}`);
      }
    });
  }
}

// DOMContentLoaded, popstate의 경우 (popstate가 발생하는 시점에서는 이미 브라우저가 이전상태로 바뀌어있음).  url path가 이미 변경됨.. 따로 pushstate 할 필요없음.
window.addEventListener('popstate', () => {
  renderPage();
});
// hashchange는 hash route가 변경됨을 감지, 브라우저의 뒤로가기, 앞으로가기도 여기서 감지됨.
window.addEventListener('hashchange', () => {
  renderPage();
});
window.addEventListener('DOMContentLoaded', () => {
  renderPage();
});
