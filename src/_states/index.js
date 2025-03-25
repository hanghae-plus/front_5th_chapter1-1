import keys from "../_constants/keys";

/**
 * 애플리케이션 상태
 *
 * @type {{routeType: "history" | "hash", user: {username: string, email: string, bio: string}}}
 */
const states = {
  // =========== 라우트 타입 ===========
  routeType: "history",

  // =========== 유저 정보 ===========
  set user(user) {
    if (user === null) {
      localStorage.removeItem(keys.user);
    } else {
      localStorage.setItem(keys.user, JSON.stringify(user));
    }
  },
  get user() {
    return JSON.parse(localStorage.getItem(keys.user));
  },
  get isLoggedIn() {
    return this.user !== null;
  },
};

export default states;
