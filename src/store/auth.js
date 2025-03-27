export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  console.log("getUser", getUser());

  return Object.keys(getUser()).length > 0;
};

export const updateUser = (user) => {
  const currentUser = getUser();
  localStorage.setItem("user", JSON.stringify({ ...currentUser, ...user }));
};
