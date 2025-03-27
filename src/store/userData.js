function UserData() {
  let user = JSON.parse(localStorage.getItem("user")) || null;

  return {
    getUser() {
      return user;
    },

    isLoggedIn() {
      return !!user;
    },

    login(userData) {
      user = userData;
      localStorage.setItem("user", JSON.stringify(user));
    },

    updateProfile(newData) {
      // 기존 user 에 업데이트
      user = { ...user, ...newData };
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      user = null;
      localStorage.removeItem("user");
    },
  };
}

export default UserData;
