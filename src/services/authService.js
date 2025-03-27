import globalState from "../lib/globalState";

export const authService = {
  login: (username) => {
    if (username === "testuser") {
      const user = {
        username: username,
        email: "",
        bio: "",
      };
      globalState.setUser("user", user);
      return true;
    }
    return false;
  },
  logout: () => {
    globalState.initUser("user");
  },
};
