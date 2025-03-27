import { AuthAPI } from "../interfaces/auth.interface";
import { getRouter } from "../router";

export const eventService = {
  handleNavigation(e) {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      getRouter().navigate(e.target.getAttribute("href"));
    }
  },

  handleAuth(e) {
    if (e.target.matches('[data-action="logout"]')) {
      e.preventDefault();
      AuthAPI.logout();
      getRouter().navigate("/login");
    }
  },

  handleFormSubmit(e) {
    const router = getRouter();

    if (e.target.id === "login-form") {
      e.preventDefault();
      const username = document.getElementById("username").value;
      AuthAPI.login(username);
      router.navigate("/profile");
    }

    if (e.target.id === "profile-form") {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      AuthAPI.updateUser({ username, email, bio });
    }
  },
};
