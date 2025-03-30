import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import userStore from "../store/userStore";
import Router from "./router";

// 라우트 설정
Router.addRoute("/", Home);
Router.addRoute("/login", () => {
  if (userStore.isLoggedIn()) {
    Router.navigate("/");
    return Home();
  }
  return Login();
});

Router.addRoute("/profile", () => {
  if (!userStore.isLoggedIn()) {
    Router.navigate("/login");
    return Login();
  }
  return Profile();
});

Router.addRoute("404", NotFound);
