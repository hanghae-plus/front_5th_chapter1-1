import { PATH } from "@lib/configs/path";

/**
 * 유저 인증 서비스
 * @description 유저 인증 상태를 관리하고 로그인, 로그아웃 기능을 제공
 */
class AuthService {
  constructor(router) {
    if (AuthService.instance) return AuthService.instance;
    AuthService.instance = this;

    this.router = router;
  }

  static get isAuthenticated() {
    const userStr = localStorage.getItem("user");
    return !!userStr;
  }

  login({ username }) {
    localStorage.setItem(
      "user",
      JSON.stringify({ username, email: "", bio: "" }),
    );
    this.router.navigate(PATH.landing);
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(PATH.login);
  }
}
export default AuthService;
