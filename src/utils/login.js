// 로그인 여부 확인
const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

export { isLoggedIn };
