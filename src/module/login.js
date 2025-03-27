import userStore from "./userStore.js";
import router from "./route.js";
import routeConfig from "../config/routerConfig.js";

const createLoginService = () => {
  // 인증 상태 변경 이벤트
  const changeAuth = () => {
    window.dispatchEvent(new Event("authchange"));
  };

  // 로그아웃 처리
  const logout = () => {
    userStore.removeUser();
    changeAuth();

    if (routeConfig.getMode() === "hash") {
      window.location.hash = "/login";
    } else {
      router.navigateTo("/login");
    }
  };

  // 로그인 처리
  const login = (username) => {
    userStore.saveUser({ username, email: "", bio: "" });
    router.navigateTo("/profile");
    changeAuth();
  };

  return {
    login,
    logout,
    changeAuth,
  };
};

// 프록시 함수
const createLoginProxy = () => {
  const loginService = createLoginService();

  const validateUsername = (username) => {
    return username && username.trim().length > 0;
  };

  // 실제 사용하는 이벤트 핸들러
  const loginHandler = () => {
    const username = document.getElementById("username").value;

    if (!validateUsername(username)) {
      alert("아이디를 입력해주세요.");
      return;
    }

    loginService.login(username);
  };

  const logout = () => {
    loginService.logout();
  };

  return {
    loginHandler,
    logout,
  };
};

const login = createLoginProxy();

export default login;
