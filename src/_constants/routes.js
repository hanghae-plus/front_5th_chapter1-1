/**
 * 전역 라우팅 상수
 */
const routes = {
  home: {
    id: "home",
    path: "/",
    title: "홈",
    accessLevel: "public",
  },
  login: {
    id: "login",
    path: "/login",
    title: "로그인",
    accessLevel: "loggedOut",
  },
  profile: {
    id: "profile",
    path: "/profile",
    title: "프로필",
    accessLevel: "loggedIn",
  },
  logout: {
    id: "logout",
    path: "#",
    title: "로그아웃",
    accessLevel: "loggedIn",
  },
};

export default routes;
