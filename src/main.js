import MainPage from "./components/MainPage";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
