/**
 * 접근 권한 레벨
 * @typedef {'public' | 'loggedOut' | 'loggedIn'} AccessLevel
 */

/**
 * 라우트 ID
 * @typedef {'home' | 'login' | 'profile' | 'logout'} RouteId
 */

/**
 * 단일 라우트 정보
 * @typedef {Object} Route
 * @property {RouteId} id - 식별자
 * @property {string} path - 경로
 * @property {string} title - 제목
 * @property {AccessLevel} accessLevel - 접근 권한 레벨
 */

/**
 * 전체 라우트 설정
 * @typedef {Object} Routes
 * @property {Route} home - 메인 페이지
 * @property {Route} login - 로그인 페이지
 * @property {Route} profile - 프로필 페이지
 * @property {Route} logout - 로그아웃 페이지 ( 예외적 )
 */

/** @type {Routes} */
const route = {
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

const routes = Object.values(route).map((v) => v);
const loggedInRoutes = routes.filter((v) => v.accessLevel === "loggedIn");
const loggedOutRoutes = routes.filter((v) => v.accessLevel === "loggedOut");
const loggedInAccessRoutes = routes.filter(
  (v) => v.accessLevel === "public" || v.accessLevel === "loggedIn",
);
const loggedOutAccessRoutes = routes.filter(
  (v) => v.accessLevel === "public" || v.accessLevel === "loggedOut",
);

export default route;
export {
  routes,
  loggedInRoutes,
  loggedOutRoutes,
  loggedInAccessRoutes,
  loggedOutAccessRoutes,
};
