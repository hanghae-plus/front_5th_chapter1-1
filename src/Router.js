import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

function Router($container) {
  this.$container = $container;

  // const router=()=>{
  //   currentPage = null;
  //   const TargetPage =

  switch (location.pathname) {
    case "/":
      console.log("/");
      return MainPage();
    case "/login":
      console.log("/login");
      new LoginPage($container);
      break;
    case "/profile":
      console.log("/profile");
      return ProfilePage();
    default:
      console.log("error");
      return ErrorPage();
  }
}

export default Router;
