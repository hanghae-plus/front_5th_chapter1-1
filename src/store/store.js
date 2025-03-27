import { USER_STORAGE_KEY } from "../constants";

let instance = null;

const createUserStore = () => {
  if (instance) {
    return instance;
  }

  const userStore = {
    userInfo: JSON.parse(localStorage.getItem(USER_STORAGE_KEY)),

    setUserInfo(userInfo) {
      const originUserInfo = this.userInfo;

      // 로그인 할 경우
      if (!originUserInfo) {
        this.userInfo = userInfo;
        return localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userInfo));
      }

      // 프로필 업데이트 할 경우
      const { username, email, bio } = userInfo;
      const newUserInfo = {
        ...originUserInfo,
        ...(originUserInfo.username !== username && { username }),
        ...(originUserInfo.email !== email && { email }),
        ...(originUserInfo.bio !== bio && { bio }),
      };

      this.userInfo = newUserInfo;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUserInfo));
    },

    getUserInfo() {
      return this.userInfo;
    },

    loggedIn() {
      return !!this.userInfo;
    },

    logout() {
      this.userInfo = null;
      localStorage.removeItem(USER_STORAGE_KEY);
    },
  };

  instance = userStore;
  return userStore;
};

const userStore = createUserStore();
export { userStore };
