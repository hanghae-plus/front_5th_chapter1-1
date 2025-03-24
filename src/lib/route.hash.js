import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../page";
const ROOTURL = "/index.hash.html";
export const route = () => {
  console.log(location.pathname);
  if (location.pathname === `${ROOTURL}`) return MainPage();
  if (location.pathname === `${ROOTURL}/profile`) return ProfilePage();
  if (location.pathname === `${ROOTURL}/login`) return LoginPage();
  return ErrorPage();
};
