export const getUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  let username = user?.username;
  let bio = user?.bio;
  let email = user?.email;

  return { username, bio, email };
};

export const setUser = ({ username, bio, email }) => {
  console.log(username, bio, email);
  localStorage.setItem(
    "user",
    JSON.stringify({ username: username, email: email, bio: bio }),
  );
};

export const clearUser = () => {
  localStorage.removeItem("user");
};
