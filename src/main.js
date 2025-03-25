import { MainPage } from "./pages/homepage";
import { ErrorPage } from "./pages/notFoundPage";
import { ProfilePage } from "./pages/profilePage";
import { LoginPage } from "./pages/loginPage";

document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
