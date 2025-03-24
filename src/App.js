import { Router } from "./Router";

function App($container) {
  this.$container = $container;

  new Router(this.$container);
}

export default App;
