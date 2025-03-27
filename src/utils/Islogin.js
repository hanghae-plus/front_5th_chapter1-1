const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export default isLoggedIn;
