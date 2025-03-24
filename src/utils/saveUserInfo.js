export const saveUserInfo = (name, bio) => {
  const userInfo = { name, bio };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  const data = localStorage.getItem("userInfo");
  return data
    ? JSON.parse(data)
    : { name: "홍길동", bio: "자기소개를 입력하세요." };
};
