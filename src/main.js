import { render } from './router.js';

window.addEventListener('popstate', () => {
  render();
});

render();
