import { CONST } from "./constants";

const savedUserList = localStorage.getItem(CONST.lsKey.users) || "[]";
const users = JSON.parse(savedUserList);

const savedUser = localStorage.getItem(CONST.lsKey.user) || "null";
const user = JSON.parse(savedUser);

export const state = {
  users,
  loggedInUser: user,
};

export const initUser = ({ username }) => ({
  username,
  email: "",
  bio: "",
});
