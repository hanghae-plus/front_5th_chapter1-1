const loginAction = () => {
  const loginForm = document.getElementById("login-form");

  const loginSubmitAction = () => {
    const formData = new FormData(loginForm);

    const username = formData.get("username");
    console.log(username);
  };

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginSubmitAction();
  });
};

export default loginAction;
