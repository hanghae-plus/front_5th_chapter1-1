import { authService } from "../services/auth.service";

const AuthAPI = {
  getUser: () => authService.getUser(),
  login: (username) =>
    authService.login({
      username,
      email: "",
      bio: "",
    }),
  logout: () => authService.logout(),
  isLoggedIn: () => authService.isLoggedIn(),
  updateUser: (user) => authService.updateUser(user),
};

export default AuthAPI;
