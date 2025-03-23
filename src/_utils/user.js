import keys from "../_constants/keys";

/**
 * 로그인한 유저 정보 가져오기
 *
 * @returns {username: string, email: string, bio: string} | null} 유저 정보 또는 null
 */
const getUserInfo = () => {
  const userInfo = localStorage.getItem(keys.user);
  return userInfo ? JSON.parse(userInfo) : null;
};

/**
 * 유저 정보 저장하기
 *
 * @param {{username: string, email: string, bio: string}} userInfo
 */
const setUserInfo = (userInfo) => {
  localStorage.setItem(keys.user, JSON.stringify(userInfo));
};

const removeUserInfo = () => {
  localStorage.removeItem(keys.user);
};

export { getUserInfo, setUserInfo, removeUserInfo };
