import Router from "./Router";

function App($container) {
  this.$container = $container;

  new Router(this.$container);

  // window.addEventListener("click", (e) => {
  //   if (e.target.classList.contains("move-to-home")) {
  //     e.preventDefault();
  //     // changeUrl("/");
  //   } else if (e.target.classList.contains("move-to-profile")) {
  //     e.preventDefault();
  //     // changeUrl("/profile");
  //   }
  // });

  // export const changeUrl = (url) => {
  //   history.pushState(null, null, url);
  // render(url);
}

// window.addEventListener("popstate", render);

export default App;
