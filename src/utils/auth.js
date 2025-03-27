// 사용자 정보 저장
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// 사용자 정보 가져오기
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 로그아웃
export const logout = () => {
  localStorage.removeItem("user");
};

// 로그인 상태 확인
export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};
