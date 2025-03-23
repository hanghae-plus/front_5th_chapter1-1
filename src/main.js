import { MainPage, LoginPage, ErrorPage, ProfilePage } from "./page";

const App = () => {
  if (location.pathname === "/") {
    return MainPage();
  }
  if (location.pathname === "/profile") {
    return ProfilePage();
  }
  if (location.pathname === "/login") {
    return LoginPage();
  }
  return ErrorPage();
};

const root = document.getElementById("root");

const render = () => {
  root.innerHTML = App();
  route();
};

const route = () => {
  root.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const nextPathName = e.target.href.replace(location.origin, "");
      history.pushState(null, "", nextPathName);
      render();
    });
  });
};

window.addEventListener("popstate", () => {
  render();
});

//login
root.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target && event.target.id === "loginBtn") {
    let inputValue = root.querySelector("#username")?.value;
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: inputValue,
        introduce: "",
      }),
    );
    localStorage.setItem("loggedIn", true);
    history.pushState(null, "", "profile");
    render();
  }
});

root.addEventListener("click", function (evnet) {
  if (evnet.target && evnet.target.innerText === "로그아웃") {
    console.log("로그아웃");
    localStorage.clear("user");
    localStorage.setItem("loggedIn", false);
    history.pushState(null, "", "login");
    render();
  }
});

render();
