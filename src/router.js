import { ErrorPage, LoginPage, MainPage, ProfilePage } from './pages/index.js';
import { Footer, Header } from './components/index.js';

export const state = {
  loggedIn: false,
  user: null,
};

export const syncStateFromStorage = () => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    state.loggedIn = true;
    state.user = JSON.parse(savedUser);
  } else {
    state.loggedIn = false;
    state.user = null;
  }
};

syncStateFromStorage();

export const navigate = (pathname) => {
  history.pushState(null, '', pathname);
  render();
};

const getPage = () => {
  const { pathname } = location;
  if (pathname === '/login') return LoginPage({ state, navigate });
  if (pathname === '/profile')
    return state.loggedIn ? ProfilePage(state) : LoginPage({ state, navigate });
  if (pathname === '/') return MainPage(state);
  return ErrorPage();
};

export const render = () => {
  syncStateFromStorage();

  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  const { pathname } = location;
  const page = getPage();

  root.innerHTML = '';

  const shouldShowLayout =
    pathname === '/' || (pathname === '/profile' && state.loggedIn);

  const layoutWrapper = document.createElement('div');
  layoutWrapper.className = 'bg-gray-100 min-h-screen flex justify-center';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'max-w-md w-full';

  if (shouldShowLayout) {
    contentWrapper.appendChild(Header({ loggedIn: state.loggedIn }));
  }

  if (typeof page === 'string') {
    const temp = document.createElement('div');
    temp.innerHTML = page;
    [...temp.childNodes].forEach((node) => contentWrapper.appendChild(node));
  } else {
    [...page.childNodes].forEach((node) => contentWrapper.appendChild(node));
  }

  if (shouldShowLayout) {
    contentWrapper.appendChild(Footer());
  }

  layoutWrapper.appendChild(contentWrapper);
  root.appendChild(layoutWrapper);

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      navigate('/login');
    });
  }

  root.querySelectorAll('a').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const newPathname = el.getAttribute('href');
      navigate(newPathname);
    });
  });
};

window.addEventListener('popstate', render);

render();
