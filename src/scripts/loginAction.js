import user from "../store/user";

const loginAction = () => {
  const loginForm = document.getElementById("login-form");

  const loginSubmitAction = () => {
    const formData = new FormData(loginForm);

    const username = formData.get("username");
    const defaultProfile = { username, email: "", bio: "" };

    const existedProfile = localStorage.getItem("user");
    if (!existedProfile)
      localStorage.setItem("username", JSON.stringify(defaultProfile));
    user.setIsLoggedIn(true);
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginSubmitAction();
  });
};

export default loginAction;
