export const getUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  let username = user?.username;
  let email = user?.email;
  let bio = user?.bio;

  return { username, email, bio };
};

export const setUser = ({ username, email, bio }) => {
  localStorage.setItem("user", JSON.stringify({ username, email, bio }));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};
