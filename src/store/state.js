import { MOCK_POSTS } from "../posts";

export const state = {
  loggedIn: false,
  posts: MOCK_POSTS,
  username: "",
  useremail: "",
  userdetail: "",
};

//로그인 상태 업데이트
export const setLoggedIn = ({ newLoggedIn }) => {
  state.loggedIn = newLoggedIn;
};
