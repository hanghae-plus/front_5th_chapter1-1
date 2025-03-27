import { Router } from "./Router";

function App($container) {
  this.$container = $container;

  const init = () => {
    new Router(this.$container);
  };

  init();
}

export default App;
