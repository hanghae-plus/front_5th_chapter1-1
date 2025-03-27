import { getLocalStorageItem } from "../utils/stroage";

const auth = {
  user: getLocalStorageItem("user"),
  isLoggedIn: getLocalStorageItem("user") ? true : false,
};

export { auth };
