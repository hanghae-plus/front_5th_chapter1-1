export const userService = {
  getLoginFormData() {
    return document.getElementById("username").value;
  },

  getProfileFormData() {
    return {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
    };
  },
};
