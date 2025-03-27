import { getItem, removeItem, setItem } from "./storage";

export const USER_STORAGE_KEY = "user";

export const setUserInfo = (data) => setItem(USER_STORAGE_KEY, data);

export const getUserInfo = () => getItem(USER_STORAGE_KEY);

export const removeUserinfo = () => removeItem(USER_STORAGE_KEY);
