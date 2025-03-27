import { MOCK_POSTS } from "./mockPosts";

export const getUser = () => JSON.parse(localStorage.getItem("user"));

export const setUser = ({ username }) => {
  const user = {
    username: username,
    bio: "",
    email: "",
  };
  JSON.parse(localStorage.setUser("user", user));
};

const user = getUser();

export const state = {
  loginState: !!user,
  posts: MOCK_POSTS,
};
