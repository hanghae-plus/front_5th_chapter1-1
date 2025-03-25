import { MOCK_POSTS } from "../posts";

export const state = {
  loggedIn: false,
  posts: MOCK_POSTS,
  username: "",
  useremail: "",
  userdetail: "",
};

export const setLoggedIn = () => {
  if (state.loggedIn) {
    state.loggedIn = false;
  } else {
    state.loggedIn = true;
  }
};
