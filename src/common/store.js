export const state = {
  loggedIn: false,
};

export const getUser = () => {
  return window.localStorage.getItem("user") || null;
};

export const setUser = (value) => {
  window.localStorage.setItem(
    "user",
    JSON.stringify({ username: value, email: "", bio: "" }),
  );
};

export const updateProfile = (username, email, bio) => {
  window.localStorage.setItem(
    "user",
    JSON.stringify({ username: username, email: email, bio: bio }),
  );
};

export const removeUser = () => {
  window.localStorage.removeItem("user");
};
