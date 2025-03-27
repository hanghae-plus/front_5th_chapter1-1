import homePage from '../page/home.js';
import loginPage from '../page/login.js';
import profilePage from '../page/profile.js';
import notFoundPage from '../page/error.js';
import {
  isHashUrl,
  getPath,
  changeToHashRoute
} from '../service/routerService.js';
import { pageState } from "../store/user.js";

export const baseURL =
  typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";

/*
 *   url route 정보
 */
const routes = {
  [baseURL]: homePage,
  [`${baseURL}login`]: loginPage,
  [`${baseURL}profile`]: profilePage,
};

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
 *   url path를 확인하여 path guard 및 html 렌더링 및 이벤트 바인딩
 */
export function renderPage() {
  // 내부적으로 hash route를 일반 route 형태로 변경
  let path = getPath();
  if (path === `${baseURL}profile` && !localStorage.getItem('user')) {
    return navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}login`);
  }
  if (path === `${baseURL}login` && localStorage.getItem('user')) {
    return navigate(isHashUrl() ? 'hash' : 'basic', `${baseURL}`);
  }
  const html = routes[path] ? routes[path]() : notFoundPage();
  // innerHTML은 매번 기존 내용을 모두 지우고 새로 파싱해서 DOM을 구성함.
  document.getElementById('root').innerHTML = html;
  bindEvents();
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
