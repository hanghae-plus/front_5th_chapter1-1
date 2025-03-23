import { ErrorPage, LoginPage, MainPage, ProfilePage } from './pages/index.js';

const state = {
  loggedIn: true,
};
const App = () => {
  if (location.pathname === '/login') {
    return LoginPage();
  }
  if (location.pathname === '/profile') {
    return ProfilePage(state);
  }
  if (location.pathname === '/') {
    return MainPage(state);
  }
  return ErrorPage();
};

window.addEventListener('popstate', () => {
  render();
});

const render = () => {
  document.body.innerHTML = App();

  document.querySelectorAll('a').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const newPathname = e.target.href.replace(location.origin, '');
      history.pushState(null, '', newPathname);
      render();
    });
  });
};

render();
