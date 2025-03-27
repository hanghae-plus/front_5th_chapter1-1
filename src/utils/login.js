/**
 * 로그인한 경우 true 반환
 * @returns {boolean} 로그인 여부
 */
export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

/**
 * 로그인하지 않은 경우 true 반환
 * @returns {boolean} 로그인 여부
 */
export const isNotLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? false : true;
};
