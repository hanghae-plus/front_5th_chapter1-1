export const state = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const setUser = (user) => {
  if (user) {
    state.user = { ...state.user, ...user };
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    state.user = null;
    localStorage.removeItem("user");
  }
};

export const getUser = () => {
  if (state.user) {
    return state.user;
  } else return null;
};

export const isLoggedIn = () => {
  return state.user ? true : false;
};
