export const state = {
  loggedIn: false,
};

export const checkLoginStatus = () => {
  state.loggedIn = JSON.parse(localStorage.getItem("user")) !== null;
};
