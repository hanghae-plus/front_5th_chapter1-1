import user from "./user";
import router from "./route";
import routeConfig from "../config/routerConfig";

// 로그인, 유저 정보 관리
const login = (function () {
  // 인증 상태 변경 이벤트
  const changeAuth = () => {
    window.dispatchEvent(new Event("authchange"));
  };

  // 유저 정보 삭제 - 로그아웃
  const logout = () => {
    localStorage.removeItem("user");
    changeAuth();

    if (routeConfig.getMode() === "hash") {
      window.location.hash = "/login";
    } else {
      router.navigateTo("/login");
    }
  };

  const loginHandler = () => {
    const username = document.getElementById("username").value;

    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    const { saveUser } = user();

    saveUser({ username, email: "", bio: "" });
    router.navigateTo("/profile");
    changeAuth();
  };

  return {
    logout,
    loginHandler,
  };
})();

export default login;
