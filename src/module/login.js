import user from "./user";
import router from "./route";

// 로그인, 유저 정보 관리
const login = (function () {
  // const MOCK = {
  //   username: "bong",
  //   password: "1234",
  // };

  // 인증 상태 변경 이벤트
  const changeAuth = () => {
    window.dispatchEvent(new Event("authchange"));
  };

  // 유저 정보 삭제 - 로그아웃
  const logout = () => {
    localStorage.removeItem("user");
    changeAuth();
    router.navigateTo("/");
  };

  const loginHandler = () => {
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;

    if (!username) {
      alert("아이디를 입력해주세요.");
      return;
    }

    // if (username !== MOCK.username || password !== MOCK.password) {
    //   alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    //   return;
    // }
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
