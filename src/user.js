const STORAGE_KEY = "user";

const saveToLocalStorage = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

const getUserFromLocalStorage = () => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const createUser = (username, email = "", bio = "") => {
  const user = { username, email, bio };
  saveToLocalStorage(user);
  return user;
};

const updateUser = (updates) => {
  const user = getUserFromLocalStorage();
  if (!user) return null;

  const updatedUser = { ...user, ...updates };
  saveToLocalStorage(updatedUser);
  return updatedUser;
};

const isLoggedIn = () => {
  return !!getUserFromLocalStorage();
};

export default {
  createUser,
  updateUser,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  isLoggedIn,
};
