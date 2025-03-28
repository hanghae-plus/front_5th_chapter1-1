class User {
  constructor(store) {
    this.store = store;
  }

  get userInfo() {
    const userInfo = this.store.load();

    return {
      username: userInfo?.username ?? "",
      email: userInfo?.email ?? "",
      bio: userInfo?.bio ?? "",
    };
  }

  login(username) {
    if (!username || username.trim().length === 0) {
      return {
        status: "error",
        error: "이름을 입력해주세요.",
      };
    }

    const updatedUserInfo = {
      username: username.trim(),
      email: "",
      bio: "",
    };

    this.store.save(updatedUserInfo);

    return {
      status: "success",
      data: updatedUserInfo,
    };
  }

  logout() {
    this.store.clear();

    return {
      status: "success",
      data: null,
    };
  }

  update(userInfo) {
    this.store.save(userInfo);

    return {
      status: "success",
      data: userInfo,
    };
  }
}

export default User;
