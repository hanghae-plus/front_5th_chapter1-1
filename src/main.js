import { MainPage, ErrorPage, LoginPage, ProfilePage } from "./pages";

function render() {
  document.body.innerHTML = `<div id="app"></div>`;
  const app = document.getElementById("app");
  app.innerHTML = `
    ${MainPage()}
    ${ProfilePage()}
    ${LoginPage()}
    ${ErrorPage()}
  `;
}

render();
