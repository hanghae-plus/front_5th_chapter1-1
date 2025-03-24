// 로그인 여부
export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user && user.id ? true : false;
};

// 로그인
export const setLogin = (userId, userPw) => {
  localStorage.setItem("user", JSON.stringify({ id: userId, pw: userPw }));
};

// 로그아웃
export const setLogout = () => {
  localStorage.removeItem("user");
};
