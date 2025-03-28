import { store } from "../store";

// MEMO : 비영속적 데이터 관리, 로컬스토리지 확인전 객체 참조를 먼저합니다.
export let userState = {};

export const userAction = {
  login(username) {
    userState = { username, email: "", bio: "" };
    store.set("user", JSON.stringify(userState));
  },
  logout() {
    userState = null;
    store.remove("user");
  },
  getUserState() {
    if (!userState) {
      userState = store.get("user");
    }
    return userState;
  },
  getUserProfile() {
    return this.getUserState();
  },
  checkIsLoginStatus() {
    return Boolean(this.getUserState());
  },
  updateUserProfile(username, email, bio) {
    userState = { username, email, bio };
    store.set("user", JSON.stringify(userState));
  },
};

const initUserState = () => {
  userState = store.get("user");
};
initUserState();
