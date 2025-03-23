import keys from "../_constants/keys";

/**
 * 로그인한 유저 정보 가져오기
 *
 * @returns {{email: string, password: string} | null} 유저 정보 또는 null
 */
const getUserInfo = () => {
  const userInfo = localStorage.getItem(keys.userInfo);
  return userInfo ? JSON.parse(userInfo) : null;
};

/**
 * 유저 정보 저장하기
 *
 * @param {{email: string, password: string}} userInfo
 */
const setUserInfo = (userInfo) => {
  localStorage.setItem(keys.userInfo, JSON.stringify(userInfo));
};

export { getUserInfo, setUserInfo };
