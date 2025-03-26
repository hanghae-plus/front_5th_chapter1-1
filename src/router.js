import { ErrorPage, LoginPage, MainPage, ProfilePage } from './pages/index.js';

export const state = {
  loggedIn: false,
};

export const navigate = (pathname) => {
  history.pushState(null, '', pathname);
  render();
};

const getPage = () => {
  const { pathname } = location;

  if (pathname === '/login') {
    return LoginPage({ state, navigate });
  }
  if (pathname === '/profile') {
    return state.loggedIn ? ProfilePage(state) : LoginPage({ state, navigate });
  }
  if (pathname === '/') {
    return MainPage(state);
  }
  return ErrorPage();
};
export const render = () => {
  let root = document.getElementById('root');

  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }

  root.innerHTML = getPage();

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      state.loggedIn = false;
      localStorage.removeItem('user');
    });
  }

  root.querySelectorAll('a').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const newPathname = e.target.href.replace(location.origin, '');
      history.pushState(null, '', newPathname);
      render();
    });
  });
};

render();
