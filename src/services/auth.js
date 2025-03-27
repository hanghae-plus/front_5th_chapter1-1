import { userStore } from "../store/store";

export const handleLogin = (elements) => {
  const username = elements.username.value;

  if (!username || !username.trim()) {
    return window.alert("이름을 입력해주세요.");
  }

  userStore.setUserInfo({ username, email: "", bio: "" });
};

export const updateProfile = (elements) => {
  const username = elements.username.value;
  const email = elements.email.value;
  const bio = elements.bio.value;

  userStore.setUserInfo({ username, email, bio });
  alert("프로필이 업데이트 되었어요!");
};
