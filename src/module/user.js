// 유저 정보 관리
const user = () => {
  const getUser = (function () {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  })();

  // 유저 정보 저장
  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const isLoggedIn = (function () {
    return getUser !== null;
  })();

  return {
    getUser,
    saveUser,
    isLoggedIn,
  };
};

export default user;
