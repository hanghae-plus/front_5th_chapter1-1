// 로그인

// 로그아웃
export const logout = () => {
  const loginUser = localStorage.getItem("user");
  if (!loginUser) {
    return;
  }
  localStorage.removeItem("user");
};
