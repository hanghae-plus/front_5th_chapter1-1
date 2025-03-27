import keys from "../_constants/keys";
import observer from "./observer";

/** 애플리케이션 상태 */
const state = {
  // ====================== 라우트 타입 ======================
  /** @type { "history" | "hash" } 라우트 타입 */
  routeType: "history",

  // ====================== 유저 정보 ======================
  /**
   * @type {{ username: string, email: string, bio: string }}
   */
  _user: JSON.parse(localStorage.getItem(keys.user)),

  /**
   * 유저 정보 설정
   * @param {{ username: string, email: string, bio: string }} user
   */
  set user(user) {
    if (user === null) {
      localStorage.removeItem(keys.user);
      this._user = null;
      return;
    }

    localStorage.setItem(keys.user, JSON.stringify(user));
    this._user = user;

    observer.notify();
  },
  /**
   * 유저 정보 가져오기
   * @returns {{ username: string, email: string, bio: string }}
   */
  get user() {
    return this._user;
  },
  /**
   * 로그인 여부 확인
   * @returns {boolean}
   */
  get isLoggedIn() {
    return this.user !== null;
  },

  // ====================== 페이지 정보 ======================
  /**
   * 라우트 타입에 따른 현재 페이지 경로
   * @returns {string}
   */
  get pathname() {
    if (this.routeType === "history") return location.pathname;

    return location.hash.slice(1);
  },
};

export default state;
