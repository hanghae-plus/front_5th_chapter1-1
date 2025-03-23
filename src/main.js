import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
