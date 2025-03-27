import { AuthAPI } from "../interfaces/auth.interface";
import { getRouter } from "../router";
import { formService } from "./form.service";

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
      try {
        const formData = formService.getFormData("login-form");
        formService.validateLoginForm(formData);

        AuthAPI.login(formData.username);
        router.navigate("/profile");
      } catch (error) {
        alert(error.message);
      }
    }

    if (e.target.id === "profile-form") {
      e.preventDefault();
      try {
        const formData = formService.getFormData("profile-form");
        formService.validateProfileForm(formData);

        AuthAPI.updateUser(formData);
        alert("프로필이 업데이트되었습니다");
      } catch (error) {
        alert(error.message);
      }
    }
  },
};
