export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export const isNotLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? false : true;
};
